package com.example.project.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.UUID;

@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserSocialId implements Serializable {

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "social_id")
    private UUID socialId;

}
