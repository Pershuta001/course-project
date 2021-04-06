package com.example.project.security.jwt;

import com.example.project.security.ApplicationUserService;
import com.example.project.view.UserViewLogin;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final ApplicationUserService applicationUserService;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {
        try {
            UserViewLogin userViewLogin = new ObjectMapper().readValue(request.getInputStream(), UserViewLogin.class);
            log.info("New attempt to authenticate: " + userViewLogin);
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    userViewLogin.getLogin(),
                    userViewLogin.getPassword()
            );
            return authenticationManager.authenticate(authentication);
        } catch (IOException e) {
            logger.error("User not authenticated");
            throw new RuntimeException("User not authenticated");
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) {
        response.addHeader(
                "Authorization",
                applicationUserService.generateToken(
                        authResult.getName(),
                        authResult.getAuthorities()));
        try {
            response
                    .getWriter()
                    .write(applicationUserService.responseUser());
        } catch (IOException e) {
            e.printStackTrace();
        }
        log.info("Authentication for {} was success",authResult.getName());
    }
}
