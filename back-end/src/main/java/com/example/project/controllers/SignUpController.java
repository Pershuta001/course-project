package com.example.project.controllers;

import com.example.project.model.UserEntity;
import com.example.project.security.ApplicationUserService;
import com.example.project.services.UserService;
import com.example.project.view.UserViewSignUp;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class SignUpController {

    private final UserService userService;
    private final ApplicationUserService applicationUserService;


    @ResponseBody
    @PostMapping("/sign-up")
    public ResponseEntity<String> addNewUser(
            @RequestBody UserViewSignUp userViewSignUp
    ){
        UserEntity userEntity = userService.saveNewUser(userViewSignUp);
        HttpHeaders headers  = new HttpHeaders();
        UserDetails userDetails = applicationUserService.loadUserByUsername(userEntity.getLogin());
        headers.set("Authorization", applicationUserService.generateToken(userDetails.getUsername(), userDetails.getAuthorities()));
        return ResponseEntity
                .ok()
                .headers(headers)
                .body(applicationUserService.responseUser());
    }
}
