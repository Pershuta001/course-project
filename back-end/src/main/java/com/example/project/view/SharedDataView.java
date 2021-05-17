package com.example.project.view;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SharedDataView {

    private UserView replier;
    private MarkerView marker;
    private UUID replyId;
    private List<String> ownerSocials;
    private List<String> replierSocials;


}
