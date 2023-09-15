package com.green.greenEarthForUs.comment.Service;


import com.green.greenEarthForUs.Exception.BusinessLogicException;
import com.green.greenEarthForUs.Exception.ExceptionCode;
import com.green.greenEarthForUs.comment.DTO.CommentDto;
import com.green.greenEarthForUs.comment.DTO.CommentResponseDto;
import com.green.greenEarthForUs.comment.Entity.Comment;
import com.green.greenEarthForUs.comment.Mapper.CommentMapper;
import com.green.greenEarthForUs.comment.Repository.CommentRepository;
import com.green.greenEarthForUs.post.Entity.Post;
import com.green.greenEarthForUs.post.Repository.PostRepository;
import com.green.greenEarthForUs.user.Entity.User;
import com.green.greenEarthForUs.user.Repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    private final UserRepository userRepository;

    private final PostRepository postRepository;

    private final CommentMapper mapper;

    public CommentService(CommentRepository commentRepository, UserRepository userRepository, PostRepository postRepository, CommentMapper mapper) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.mapper = mapper;
    }

    // 댓글 생성
    public CommentResponseDto createComment(Long postId, Long userId, CommentDto commentDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found " + userId));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found " + postId)); // user , post

        Comment comment = new Comment(); // 초기화
        comment.setUser(user);
        comment.setPost(post);
        comment.setBody(commentDto.getBody());
        comment.setCreatedAt(LocalDateTime.now());

        Comment save = commentRepository.save(comment);

        CommentResponseDto responseDto = mapper.commentToResponseDto(save);

        return responseDto;
    }

//    // 게시글 별 댓글 리스트 조회
//    @Transactional
//    public List<Comment> getComments(Long postId, Long userId) {
//        Post post = postRepository.findById(postId)
//                .orElseThrow(() -> new EntityNotFoundException("Post not found" + postId));
//
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new EntityNotFoundException("User not found " + userId));
//
//        Optional<Comment> optionalComment = commentRepository.findById(postId);
//
//        if (!optionalComment.isPresent()) {
//            throw new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND);
//        }
//
//        return commentRepository.findByPost_PostIdAndUser_UserId(post.getPostId(), user.getUserId());
//    }

    // 게시글 별 댓글 조회
    public List<CommentResponseDto> getCommentsByPostIdAndVerify(Long postId) {
        List<Comment> commentList = commentRepository.findByPostId(postId);

        return commentList.stream()
                .map(comment -> {
                    verifyComment(comment.getCommentId());
                    return new CommentResponseDto(comment);
                })
                .collect(Collectors.toList());
    }

    // 댓글 수정
    @Transactional
    public Comment updateComment(Long postId, Long userId, Long commentId, CommentDto commentDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found " + userId));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found " + postId));

        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new EntityNotFoundException("Comment not found" + commentId));

        if (!comment.getUser().getUserId().equals(userId)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_COMMENT_ACCESS); //
        }

        comment.setBody(commentDto.getBody());
        comment.setCreatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
       
    }

    // 댓글 삭제
    @Transactional
    public void deleteComment(Long postId, Long userId, Long commentId) {

        Comment comment = verifyComment(commentId); // 해당 댓글을 DB에서 조회하고 comment 변수에 저장함
        if (!comment.getPost().getPostId().equals(postId) || !comment.getUser().getUserId().equals(userId)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_COMMENT_ACCESS); // 댓글이 속한 게시글의 사용자와 user를 비교해서 같지 게시글 사용자에 속하지 않으면 엑세스 권한 없음
        }

        commentRepository.deleteById(commentId);
    }

    private Comment verifyComment(Long commentId) { // 댓글 조회, 없으면 예외던지기
        Optional<Comment> commentOptional = commentRepository.findById(commentId);
        return commentOptional.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }
}

