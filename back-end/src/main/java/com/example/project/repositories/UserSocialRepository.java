package com.example.project.repositories;

import com.example.project.model.UserSocial;
import com.example.project.model.UserSocialId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSocialRepository extends JpaRepository<UserSocial, UserSocialId> {
}
