package com.example.project.view;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReplyResponseView {

    private UUID replyId;
    private UUID userId;
    private String userFirstname;
    private String userLastname;
    private String answer;
    private MarkerView marker;
}
