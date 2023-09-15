package com.green.greenEarthForUs.comment.Mapper;



import com.green.greenEarthForUs.comment.DTO.CommentDto;
import com.green.greenEarthForUs.comment.DTO.CommentResponseDto;
import com.green.greenEarthForUs.comment.Entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    CommentResponseDto commentToResponseDto(Comment comment);

}
