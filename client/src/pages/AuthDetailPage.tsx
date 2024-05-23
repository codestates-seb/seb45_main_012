import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import '../styles/Button.css';
import '../styles/BoardDetailPage.css';
import NavBar from '../components/NavBar.tsx';
import { getPost, getUser, getComment, postComment, getVote, patchVote } from '../api/api.js';

const AuthDetailPage: React.FC = () => {
  const { postId, userId, voteId } = useParams<{ postId: string; userId: string; voteId: string }>();

  const [post, setPost] = useState<any>({});
  const [user, setUser] = useState<any>({});

  const [loggedInUserId, setLoggedInUserId] = useState<any>({});

  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true);
      const decodedToken: any = jwtDecode(accessToken);
      setLoggedInUserId(decodedToken.userId);
    } else {
      setIsLoggedIn(false);
    }
  }, [accessToken]);

  const [vote, setVote] = useState<any>({});
  const [alreadyLiked, setAlreadyLiked] = useState<boolean>(false);
  const [liked, setLiked] = useState(alreadyLiked);

  const [commentText, setCommentText] = useState('');

  const [allComments, setAllComments] = useState<any[]>([]);
  const [visibleComments, setVisibleComments] = useState<any[]>([]);

  const intersectionRef = useRef<HTMLDivElement | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(!accessToken);

  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true);
      return;
    }

    setIsLoggedIn(false);
  }, [accessToken]);

  useEffect(() => {
    // 로컬 스토리지에서 사용자의 좋아요 여부를 가져옴
    const savedLikeState = localStorage.getItem(`alreadyLikeState_${postId}_${userId}`);
    // 로컬 스토리지에 저장된 값이 있는 경우 해당 값을 사용하여 already에 상태를 설정
    if (savedLikeState !== null) {
      setAlreadyLiked(JSON.parse(savedLikeState));
    }

    // 페이지 로드 시 서버에서 투표 정보를 가져옴
    getVote(postId, userId)
      .then(response => {
        if (response.status === 200) {
          const voteData = response.data;
          console.log(voteData);

          // 서버에서 가져온 투표 정보를 vote 상태에 저장
          setVote(voteData);
        }
      })
      .catch(error => {
        console.error('투표 정보 가져오기 오류:', error);
      });
  }, [postId, userId]);

  const handleVoteClick = async () => {
    try {
      // API 요청 보내기 (patchVote 함수를 사용하여 요청 보냄)
      const response = await patchVote(postId, userId, voteId);
      console.log('patch한후: ', response.data);

      // API 요청이 성공적으로 완료된 경우에만 UI를 업데이트합니다.
      if (response.status === 200) {
        // const updatedVoteCount = response.data.voteCount;
        const updatedVoteCount = liked ? vote.voteCount - 1 : vote.voteCount + 1;
        setVote({
          ...vote, // 이전 vote 객체 내용을 그대로 유지
          voteCount: updatedVoteCount, // voteCount만 업데이트
        });
        console.log(vote.voteCount);

        // 이미 좋아요를 한 상태였다면 좋아요를 해제하고, 그 반대의 경우에는 좋아요를 활성화합니다.
        if (alreadyLiked) {
          setAlreadyLiked(false);
        } else {
          setAlreadyLiked(true);
        }

        setLiked(!liked);

        // 로컬 스토리지에 좋아요 상태 저장
        localStorage.setItem(`alreadyLikeState_${postId}_${userId}`, JSON.stringify(alreadyLiked));
      } else {
        console.error('좋아요 버튼 기능 오류');
      }
    } catch (error) {
      console.error('좋아요 오류', error);
    }
  };

  const handleCommentTextChange = event => {
    setCommentText(event.target.value);
  };

  const handleSubmitComment = async () => {
    if (commentText.trim() === '') {
      return;
    }
    if (commentText.length > 500) {
      alert('댓글은 500자 이내로 작성해주세요.');
      return;
    }

    try {
      // 댓글 작성 API 호출
      const response = await postComment(postId, loggedInUserId, commentText);
      console.log('댓글 작성 완료:', response.data);
      setCommentText('');

      // 페이지를 새로고침
      window.location.reload();
    } catch (error) {
      console.error('댓글 작성 오류:', error);
    }
  };

  useEffect(() => {
    // 포스트 데이터 가져오기
    getPost(postId)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('포스트 데이터 가져오기 오류:', error);
      });

    // 유저 데이터 가져오기
    getUser(userId)
      .then(response => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch(error => {
        console.error('유저 데이터 가져오기 오류:', error);
      });

    // 댓글 데이터 가져오기
    getComment(postId)
      .then(response => {
        const sortedComments = response.data.sort((a: { createdAt: string }, b: { createdAt: string }) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        const commentsWithUser = sortedComments.map(comment => ({
          ...comment,
          user: null,
        }));

        // 사용자 정보를 가져온 후에 댓글 객체를 갱신하고 상태에 설정
        const updateUserComments = async () => {
          for (let i = 0; i < commentsWithUser.length; i++) {
            const comment = commentsWithUser[i];
            try {
              const userResponse = await getUser(comment.userId);
              const user = userResponse.data;
              const updatedComment = {
                ...comment,
                user,
              };
              commentsWithUser[i] = updatedComment;
            } catch (error) {
              console.error('댓글 사용자 데이터 가져오기 오류:', error);
            }
          }
          setVisibleComments(commentsWithUser.slice(0, 10));
        };

        updateUserComments();
      })
      .catch(error => {
        console.error('댓글 데이터 가져오기 오류:', error);
      });
  }, [postId, userId]);

  useEffect(() => {
    const handleIntersect = entries => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          const endVisibleIndex = visibleComments.length;
          const newVisibleComments = [...visibleComments, ...allComments.slice(endVisibleIndex, endVisibleIndex + 10)];
          setVisibleComments(newVisibleComments);
        });
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    if (intersectionRef.current) {
      observer.observe(intersectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [allComments, visibleComments]);

  return (
    <>
      <NavBar />
      <div className="page_container">
        <button className="custom_board_button cancel_button">인증 게시판</button>
        <div className="auth_detail_container">
          <div className="auth_detail_container_image">
            <img src={post.imageUrl} alt={`${post.postId}`} />
          </div>
          <div className="auth_detail_container_post">
            <div className="post_detail_header">
              <div>
                <h3 className="post_detail_title">{post.title}</h3>
                <p>
                  {user.grade} {user.userName}
                </p>
              </div>
              <p>{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
            <p className="post_detail_content_auth">{post.body}</p>
            {/* <button onClick={handleVoteClick} className='vote_button'>
              {liked ? `❤️ ${vote.voteCount}` : `🤍 ${vote.voteCount}`}
            </button> */}
          </div>
        </div>

        <div className="free_detail_container">
          {isLoggedIn && (
            <div className="detail_comment_container">
              <input
                className="comment_input"
                type="text"
                placeholder="내용을 입력해주세요."
                value={commentText}
                onChange={handleCommentTextChange}
              />
              <button className="comment_button" onClick={handleSubmitComment}>
                작성
              </button>
            </div>
          )}
          {visibleComments.map(comment => (
            <div key={comment.commentId} className="post_detail_header">
              <div>
                <p>
                  {comment.user.grade} {comment.user.userName}
                </p>
                <p>{comment.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AuthDetailPage;
