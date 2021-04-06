package com.example.project.view;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class UserViewSignUp {
    private String login;
    private String password;
    private String firstName;
    private String lastName;
    private String phone1;
}


