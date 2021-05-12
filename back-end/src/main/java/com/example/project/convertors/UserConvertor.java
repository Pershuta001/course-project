package com.example.project.convertors;

import com.example.project.enums.Roles;
import com.example.project.model.UserEntity;
import com.example.project.view.UserViewSignUp;
import com.sun.istack.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserConvertor {

    private final PasswordEncoder bCryptPasswordEncoder;

    public UserEntity convertFrom(@NotNull final UserViewSignUp userViewSignUp){
        return  UserEntity.builder()
                .lastName(userViewSignUp.getLastName())
                .firstName(userViewSignUp.getFirstName())
                .login(userViewSignUp.getLogin())
                .phone1(userViewSignUp.getPhone1())
                .hashedPassword(bCryptPasswordEncoder.encode(userViewSignUp.getPassword()))
                .role(Roles.USER.ordinal())
                .karma(0.)
                .rating(0.)
                .shareMyData(true)
                .build();
    }


}
