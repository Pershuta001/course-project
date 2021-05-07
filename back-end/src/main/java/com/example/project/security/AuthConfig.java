package com.example.project.security;

import com.example.project.enums.Roles;
import com.example.project.security.jwt.JwtAuthenticationFilter;
import com.example.project.security.jwt.JwtConfig;
import com.example.project.security.jwt.JwtTokenVerifier;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static java.util.Arrays.asList;

@Configuration
@RequiredArgsConstructor
public class AuthConfig extends WebSecurityConfigurerAdapter {

    private final ApplicationUserService applicationUserService;
    private final JwtConfig jwtConfig;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().authorizeRequests();
        http

                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), applicationUserService))
                .addFilterAfter(new JwtTokenVerifier(jwtConfig), JwtAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers("/user/**").hasRole(Roles.USER.name())
                // .antMatchers("/secured-api-admin").hasRole(Roles.ADMIN.name())
                .antMatchers("/sign-up")
                .permitAll()
                .anyRequest()
                .authenticated();
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Bean
    public PasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder());
        provider.setUserDetailsService(applicationUserService);
        return provider;
    }
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        //configuration.setAllowedOrigins(Arrays.asList("/login","/sign-in"));
        configuration.addAllowedOrigin("*");
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE"));
        configuration.addAllowedHeader("*");
        // This allow us to expose the headers
        configuration.setExposedHeaders(Arrays.asList("Access-Control-Allow-Headers", "Authorization, x-xsrf-token, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, " +
                "Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}