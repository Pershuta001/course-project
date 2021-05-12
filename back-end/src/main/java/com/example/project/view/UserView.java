package com.example.project.view;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserView {

    private String userFirstname;
    private String userLastname;
    private Double rating;
    private Double karma;

}
