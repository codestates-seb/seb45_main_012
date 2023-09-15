package com.green.greenEarthForUs.comment.DTO;


import com.green.greenEarthForUs.comment.Entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
public class CommentResponseDto {

    private Long commentId;

    private Long userId;

    private Long postId;

    private String body;

    private LocalDateTime createdAt;

    public CommentResponseDto(Comment comment) {
        this.commentId = comment.getCommentId();
        this.userId = comment.getUser().getUserId();
        this.postId = comment.getPost().getPostId();
        this.body = comment.getBody();
        this.createdAt = comment.getCreatedAt();
    }
}


