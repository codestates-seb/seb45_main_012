import React, { useState, useEffect } from 'react';
import '../styles/MyPost.css';
import { instance, deletePost } from 'api/api.js';
import jwtDecode from 'jwt-decode';
import NavBar from 'components/NavBar.tsx';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveMenu } from '../store/menuSlice.ts';
import { DecodedToken, UserData, OneOfMyPost } from 'types/types.ts';

const MyPost: React.FC = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<OneOfMyPost>({} as OneOfMyPost); //as Post 질문
  const [userData, setUserData] = useState<UserData>({});

  const accessToken = localStorage.getItem('accessToken');
  const decodedToken: DecodedToken = jwtDecode<DecodedToken>(accessToken);
  const userId = decodedToken.userId;
  const userName = decodedToken.userName;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteButton = () => {
    deletePost(userId, postId)
      .then(() => {
        dispatch(setActiveMenu('내가 쓴 글'));
        navigate('/mypage/main');
      })
      .catch(error => {
        console.error('게시글 삭제 오류:', error);
      });
  };

  useEffect(() => {
    async function getPost() {
      try {
        const res = await instance.get('/post/' + postId);
        setPost(res.data);
      } catch (err) {
        console.error('err: ', err);
      }
    }

    getPost();
  }, [postId]);

  useEffect(() => {
    async function getUserData() {
      try {
        const res = await instance.get('/user/' + userId);
        setUserData(res.data);
      } catch (err) {
        console.error('getUserData err: ', err);
      }
    }

    getUserData();
  }, [userId]);

  const userPicture = userData.imageUrl || require('../assets/user_shadow.png');

  const date = new Date(post.createdAt);
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = daysOfWeek[date.getDay()] + '요일';
  const displayDate = date.toLocaleDateString();

  return (
    <>
      <NavBar />
      <main className="my_post_container">
        <h3 className="my_post">내가 쓴 글</h3>
        <ul>
          <li>
            <div className={`openOrNot ${post.open === 'true' ? 'active' : ''}`}>공개</div>
          </li>
          <li>
            <div className={`openOrNot ${post.open === 'false' ? 'active' : ''}`}>비공개</div>
          </li>
        </ul>
        <article className="each_post">
          <div className="buttons">
            <Link to={`/mypage/posts/${postId}/edit`} aria-label="edit page">
              <button className="edit_button">수정</button>
            </Link>
            <span>|</span>
            <button className="delete_button" onClick={handleDeleteButton}>
              삭제
            </button>
          </div>
          <div className="each_post_info">
            <h2>{post.title}</h2>
            <div className="each_post_date">{`${displayDate} ${dayOfWeek}`}</div>
          </div>
          <div className="user_info">
            <img className="each_profile_image" src={userPicture} alt="profile" />
            <div className="user_name">{userName}</div>
          </div>
          <div className="each_post_content">
            {post.imageUrls && <img className="uploaded" src={post.imageUrls} alt="uploded_image" />}
            <p className={`post_writing ${!post.imageUrls ? 'no_image' : ''})`}>{post.body}</p>
          </div>
        </article>
      </main>
    </>
  );
};

export default MyPost;
