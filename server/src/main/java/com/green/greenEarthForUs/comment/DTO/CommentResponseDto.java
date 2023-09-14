package com.green.greenEarthForUs.comment.DTO;


import com.green.greenEarthForUs.post.Entity.Post;
import com.green.greenEarthForUs.user.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
public class CommentResponseDto {

    private Long id;

    private Long userId;

    private Long postId;

    private String body;

    private LocalDateTime createdAt;

}


