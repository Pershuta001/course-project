package com.example.project.security;

import com.example.project.enums.Roles;
import com.example.project.model.UserEntity;
import com.example.project.repositories.UserRepository;
import com.example.project.security.jwt.JwtConfig;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Optional;
import java.util.Set;

@Service
@Slf4j
@RequiredArgsConstructor
public class ApplicationUserService implements UserDetailsService {

    private final JwtConfig jwtConfig;
    private final UserRepository userRepository;
    private UserEntity user;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Optional<UserEntity> userEntityOptional = userRepository.findUserByLogin(login);
        if (userEntityOptional.isEmpty()) {
            log.error("User with login: {} not found.", login);
            throw new UsernameNotFoundException("User with login: " + login + " not found.");
        }
        user = userEntityOptional.get();
        Set<SimpleGrantedAuthority> authorities = Roles.values()[user.getRole()].getGrantedAuthorities();
        return new User(user.getLogin(),
                user.getHashedPassword(),
                true,
                true,
                true,
                true,
                authorities
        );
    }

    @SneakyThrows
    public String responseUser() {
        String res = "{";
        res += String.format("\"name\": \"%s\",", user.getFirstName());
        res += String.format("\"email\": \"%s\",", user.getLogin());
        res += String.format("\"phone\": \"%s\"", user.getPhone1());
        res += "}";
        return res;
    }

    public String generateToken(String username, Collection<? extends GrantedAuthority> authorities) {
        return jwtConfig.TOKEN_PREFIX + Jwts.builder()
                .setSubject(username)
                .claim("authorities", authorities)
                .setExpiration(Date.valueOf((LocalDate.now().plusDays(jwtConfig.EXPIRATION_DAY))))
                .signWith(jwtConfig.signingSecretKey())
                .compact();
    }
}
