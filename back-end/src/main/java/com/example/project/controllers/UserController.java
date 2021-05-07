package com.example.project.controllers;

import com.example.project.services.UserService;
import com.example.project.view.ChangePasswordView;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @ResponseBody
    @PutMapping("/profile/password/change")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangePasswordView changePasswordView
    ) {
        return ResponseEntity
                .ok()
                .body(userService.changePassword(changePasswordView));
    }

    @ResponseBody
    @PostMapping("/profile/social/add/{social}")
    public ResponseEntity<String> addSocial(
            @PathVariable String social
    ) {
        return ResponseEntity
                .ok()
                .body(userService.addSocial(social));
    }

    @ResponseBody
    @DeleteMapping("/profile/social/delete/{social}")
    public ResponseEntity<String> deleteSocial(
            @PathVariable String social
    ) {
        return ResponseEntity
                .ok()
                .body(userService.deleteSocial(social));
    }

    @ResponseBody
    @PutMapping("/profile/firstname/update/{firstname}")
    public ResponseEntity<String> updateFirstname(
            @PathVariable String firstname
    ) {
        return ResponseEntity
                .ok()
                .body(userService.updateFirstname(firstname));
    }

    @ResponseBody
    @PutMapping("/profile/lastname/update/{lastname}")
    public ResponseEntity<String> updateLastname(
            @PathVariable String lastname
    ) {
        return ResponseEntity
                .ok()
                .body(userService.updateLastname(lastname));
    }
}
