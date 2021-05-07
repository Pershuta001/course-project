package com.example.project.services;

import com.example.project.convertors.UserConvertor;
import com.example.project.model.Social;
import com.example.project.model.UserEntity;
import com.example.project.repositories.SocialRepository;
import com.example.project.repositories.UserRepository;
import com.example.project.view.ChangePasswordView;
import com.example.project.view.UserViewSignUp;
import com.sun.istack.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor

public class UserService {

    private final UserRepository userRepository;
    private final SocialRepository socialRepository;
    private final UserConvertor userConvertor;
    private final PasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public UserEntity saveNewUser(@NotNull final UserViewSignUp userViewSignUp) {
        return userRepository.save(userConvertor.convertFrom(userViewSignUp));
    }

    @SneakyThrows
    @Transactional
    public String changePassword(ChangePasswordView changePasswordView) {
        UserEntity user = currentUser();
        if (bCryptPasswordEncoder.matches(changePasswordView.getOldPass(), user.getHashedPassword())) {
            user.setHashedPassword(
                    bCryptPasswordEncoder
                            .encode(changePasswordView.getNewPass()));
            userRepository.save(user);
        } else {
            throw new Exception("Wrong password exception");
        }
        return "success";
    }

    @SneakyThrows
    @Transactional
    public String addSocial(String social) {
        UserEntity user = currentUser();
        if (containsSocial(user.getSocials(), social)) {
            throw new Exception("Social already exists");
        }
        Social soc = socialRepository.save(Social.builder().name(social).build());
        user.getSocials().add(soc);
        userRepository.save(user);
        return "success";
    }

    private boolean containsSocial(List<Social> socials, String social) {
        return socials.stream().anyMatch(social1 -> social1.getName().equals(social));
    }

    @SneakyThrows
    @Transactional
    public String deleteSocial(String social) {
        UserEntity user = currentUser();
        Optional<Social> soc = user.getSocials().stream().filter(social1 -> social1.getName().equals(social)).findFirst();
        if (soc.isEmpty()) {
            throw new Exception("No such social");
        }
        user.getSocials().remove(soc.get());
        userRepository.save(user);
        socialRepository.delete(soc.get());
        return "success";
    }

    @Transactional
    public String updateFirstname(String firstname) {
        UserEntity user = currentUser();
        user.setFirstName(firstname);
        userRepository.save(user);
        return "success";
    }

    @Transactional
    public String updateLastname(String lastname) {
        UserEntity user = currentUser();
        user.setLastName(lastname);
        userRepository.save(user);
        return "success";
    }

    private UserEntity currentUser() {
        String login = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findUserByLogin(login).get();
    }
}
