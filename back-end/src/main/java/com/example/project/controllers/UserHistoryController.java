package com.example.project.controllers;

import com.example.project.convertors.UserHistoryConverter;
import com.example.project.services.UserHistoryService;
import com.example.project.view.ConfirmReplyView;
import com.example.project.view.ReplyOnMarkerView;
import com.example.project.view.ReplyResponseView;
import com.example.project.view.SharedDataView;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class UserHistoryController {

    private final UserHistoryService userHistoryService;
    private final UserHistoryConverter userHistoryConverter;

    @ResponseBody
    @PostMapping("/reply")
    public ResponseEntity<String> replyOnMarker(
            @RequestBody ReplyOnMarkerView replyOnMarkerView
    ) {
        return ResponseEntity
                .ok()
                .body(userHistoryService.replyOnMarker(replyOnMarkerView));
    }

    @ResponseBody
    @GetMapping("/my/replies/active")
    public ResponseEntity<List<ReplyResponseView>> getActiveRepliesForCurrentUser() {
        return ResponseEntity
                .ok()
                .body(userHistoryConverter.convert(
                        userHistoryService.getActiveRepliesForCurrentUser()
                ));
    }

    @ResponseBody
    @GetMapping("/my/replies/all")
    public ResponseEntity<List<ReplyResponseView>> getRepliesForCurrentUser() {
        return ResponseEntity
                .ok()
                .body(userHistoryConverter.convert(
                        userHistoryService.getAllRepliesForCurrentUser()
                ));
    }

    @ResponseBody
    @GetMapping("/replies/data")
    public ResponseEntity<List<SharedDataView>> getSharedData() {
        return ResponseEntity
                .ok()
                .body(userHistoryConverter.convertData(
                        userHistoryService.getSharedData()
                ));
    }

    @ResponseBody
    @PostMapping("/reply/confirm")
    public ResponseEntity<String> confirmReply(
            @RequestBody ConfirmReplyView confirmReplyView
    ) {
        return ResponseEntity
                .ok()
                .body(
                        userHistoryService.confirmReply(confirmReplyView)
                );
    }

    @ResponseBody
    @DeleteMapping("/reply/delete/{uuid}")
    public ResponseEntity<String> confirmReply(
            @PathVariable UUID uuid
    ) {
        return ResponseEntity
                .ok()
                .body(
                        userHistoryService.deleteReply(uuid)
                );
    }

}
