package com.example.project.services;

import com.example.project.convertors.UserConvertor;
import com.example.project.model.UserEntity;
import com.example.project.repositories.UserRepository;
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

}
