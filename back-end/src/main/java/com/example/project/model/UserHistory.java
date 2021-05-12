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
    @JoinColumn(name = "marker_id", updatable = false, nullable = false)
    private Marker markerId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @Column(name = "date")
    private Date date;

    @Column(name = "confirmedByMaintainer")
    private Boolean confirmedByMaintainer;

    @Column(name = "confirmedByReplier")
    private Boolean confirmedByReplier;

    @Column(name = "answer", nullable = false, length = 512)
    private String answer;



}
