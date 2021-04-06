package com.example.project.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "user_history")
public class UserHistory {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user1_id", updatable = false, nullable = false)
    private UserEntity userEntity1;

    @ManyToOne
    @JoinColumn(name = "user2_id")
    private UserEntity userEntity2;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "label_description", nullable = false, length = 512)
    private String labelDescription;



}
