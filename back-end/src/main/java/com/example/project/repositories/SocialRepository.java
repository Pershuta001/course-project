package com.example.project.repositories;

import com.example.project.model.Social;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SocialRepository extends JpaRepository<Social, UUID> {
}
