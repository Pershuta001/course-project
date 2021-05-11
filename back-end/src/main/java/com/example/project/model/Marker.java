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
@Table(name = "markers")
public class Marker {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "lat",
            updatable = false,
            nullable = false)
    private Double lat;

    @Column(name = "lng",
            updatable = false,
            nullable = false)
    private Double lng;

    @Column(name = "description",
            updatable = false,
            nullable = false,
            length = 200
    )
    private String description;

    @Column(name = "min_price")
    private Double minPrice;

    @Column(name = "max_price")
    private Double maxPrice;

    @ManyToOne
    @JoinColumn(name = "user_id",
            updatable = false,
            nullable = false)
    private UserEntity userEntityId;

    @ManyToMany
    private List<Tag> tags;

}
