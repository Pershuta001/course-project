package com.example.project.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "login",updatable = false, nullable = false, unique = true)
    private String login;

    @Column(name = "hashedPassword", nullable = false)
    private String hashedPassword;

    @Column(name = "firstName", nullable = false)
    private String firstName;

    @Column(name = "lastName", nullable = false)
    private String lastName;

    @Column(name = "phone1", nullable = false)
    private String phone1;

    @Column(name = "phone2", nullable = false)
    private String phone2;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "role", nullable = false)
    private Integer role;

}
