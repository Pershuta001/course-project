package com.example.project.services;

import com.example.project.convertors.UserConvertor;
import com.example.project.model.UserEntity;
import com.example.project.repositories.UserRepository;
import com.example.project.view.ChangePasswordView;
import com.example.project.view.UserViewSignUp;
import com.sun.istack.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor

public class UserService {

    private final UserRepository userRepository;
    private final UserConvertor userConvertor;

    @Transactional
    public UserEntity saveNewUser(@NotNull final UserViewSignUp userViewSignUp){
      return userRepository.save(userConvertor.convertFrom(userViewSignUp));
    }

    @Transactional
    public String changePassword(ChangePasswordView changePasswordView){
        System.out.println(changePasswordView);
        return "success";
    }

    @Transactional
    public String addSocial(String social){
        System.out.println(social);
        return "success";
    }
    @Transactional
    public String deleteSocial(String social){
        System.out.println(social);
        return "success";
    }

    public String updateFirstname(String firstname) {
        System.out.println(firstname);
        return "success";
    }

    public String updateLastname(String firstname) {
        System.out.println(firstname);
        return "success";
    }
}
