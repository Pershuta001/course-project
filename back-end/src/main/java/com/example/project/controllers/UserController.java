package com.example.project.controllers;

import com.example.project.services.UserService;
import com.example.project.view.ChangePasswordView;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @ResponseBody
    @PutMapping("/profile/password/change")
    @PreAuthorize("hasAuthority('profile:update')")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangePasswordView changePasswordView
    ) {
        return ResponseEntity
                .ok()
                .body(userService.changePassword(changePasswordView));
    }

    @ResponseBody
    @PostMapping("/profile/social/add/{social}")
    @PreAuthorize("hasAuthority('profile:update')")
    public ResponseEntity<String> addSocial(
            @PathVariable String social
    ) {
        return ResponseEntity
                .ok()
                .body(userService.addSocial(social));
    }

    @ResponseBody
    @DeleteMapping("/profile/social/delete/{social}")
    @PreAuthorize("hasAuthority('profile:update')")
    public ResponseEntity<String> deleteSocial(
            @PathVariable String social
    ) {
        return ResponseEntity
                .ok()
                .body(userService.deleteSocial(social));
    }

    @ResponseBody
    @PutMapping("/profile/firstname/update/{firstname}")
    @PreAuthorize("hasAuthority('profile:update')")
    public ResponseEntity<String> updateFirstname(
            @PathVariable String firstname
    ) {
        return ResponseEntity
                .ok()
                .body(userService.updateFirstname(firstname));
    }

    @ResponseBody
    @PutMapping("/profile/lastname/update/{lastname}")
    @PreAuthorize("hasAuthority('profile:update')")
    public ResponseEntity<String> updateLastname(
            @PathVariable String lastname
    ) {
        return ResponseEntity
                .ok()
                .body(userService.updateLastname(lastname));
    }
}
