package com.green.greenearthforus.vote.controller;

import com.green.greenearthforus.post.service.PostService;
import com.green.greenearthforus.user.entity.User;
import com.green.greenearthforus.user.service.UserService;
import com.green.greenearthforus.vote.dto.VoteDto;
import com.green.greenearthforus.vote.entity.Vote;
import com.green.greenearthforus.vote.mapper.VoteMapper;
import com.green.greenearthforus.vote.service.VoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/vote")
public class VoteController {

    private final VoteService voteService;
    private final VoteMapper mapper;
    private final UserService userService;
    private final PostService postService;

    public VoteController(VoteService voteService,
                          VoteMapper mapper,
                          PostService postService,
                          UserService userService){
        this.voteService = voteService;
        this.mapper = mapper;
        this.postService = postService;
        this.userService = userService;
    }

    @PostMapping("/{post_id}")
    public ResponseEntity<VoteDto.Response> postVote(@PathVariable("post_id") long postId){

        return new ResponseEntity<>(voteService.createVote(postId), HttpStatus.CREATED);
    }

    @PatchMapping("/{post_id}/{user_id}/{vote_id}")
    public ResponseEntity<VoteDto.Response> patchVote(@PathVariable("post_id") long postId,
                                    @PathVariable("user_id") long userId,
                                    @PathVariable("vote_id") long voteId,
                                    @Validated @RequestBody VoteDto.Patch patch){
        postService.getPost(postId);   //post가 유효한지 확인하는 로직


        //이전에 좋아요를 투표했는지 확인 후 좋아요가 중복이면 count를 하나 빼는 로직.
        long count = voteService.findVoteCount(voteId).getVoteCount();
        String type = verifiedVoteUserId(userId, voteId);
        if(type.equals("Like")) voteService.findVoteCount(voteId).setVoteCount(count-1);

        patch.addVoteId(voteId);
        Vote updateVote = voteService.updateVote(mapper.votePatchDToToVote(patch));
        VoteDto.Response response = mapper.voteToVoteResponseDto(updateVote);
        response.setPostId(postId);
        response.setUserId(userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{post_id}/{vote_id}")
    public ResponseEntity<VoteDto.Response> getVote(@PathVariable("post_id") long postId,
                                  @PathVariable("vote_id") long voteId){

        postService.getPost(postId);   //post가 유효한지 확인하는 로직
        Vote findVote = voteService.findVoteCount(voteId);
        VoteDto.Response response = mapper.voteToVoteResponseDto(findVote);
        response.setPostId(postId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{post_id}/{user_id}/{vote_id}")
    public ResponseEntity<Void> deleteVote(@PathVariable("post_id") long postId,
                                     @PathVariable("user_id") long userId,
                                     @PathVariable("vote_id") long voteId){

        postService.getPost(postId);   //post가 유효한지 확인하는 로직
        userService.getUser(userId);

        voteService.deleteVote(voteId);
        return ResponseEntity.noContent().build();
    }


//     유저가 이미 좋아요를 눌렀는지 확인하는 로직
    private String verifiedVoteUserId(long userId, long voteId){
        User user =  userService.getUser(userId);
        List<Vote> voteUserList = user.getVotes();
        String voteType = "";
        for(Vote vote : voteUserList){
            if(vote.getVoteId() == voteId){
                voteType = vote.getVoteType();
            }
        }
        return voteType;
    }

}