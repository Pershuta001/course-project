package com.example.project.repositories;

import com.example.project.model.UserHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserHistoryRepository extends JpaRepository<UserHistory, UUID> {
}
