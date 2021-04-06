package com.example.project.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "beacons")
public class Beacon {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "x_coordinate",
            updatable = false,
            nullable = false)
    private Double xCoordinate;

    @Column(name = "y_coordinate",
            updatable = false,
            nullable = false)
    private Double yCoordinate;

    @Column(name = "description",
            updatable = false,
            nullable = false,
            length = 200
    )
    private String description;

    @Column(name = "range",
            updatable = false,
            nullable = false)
    private Float range;

    @ManyToOne
    @JoinColumn(name = "user_id",
            updatable = false,
            nullable = false)
    private UserEntity userEntityId;

    @ManyToMany
    private List<Tag> tags;

}
