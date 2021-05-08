package com.example.project.repositories;

import com.example.project.model.UserEntity;
import com.example.project.model.UserHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserHistoryRepository extends JpaRepository<UserHistory, UUID> {

    List<UserHistory> findByMarkerId_UserEntityIdAndDateIsNull(UserEntity userEntity);
    List<UserHistory> findByMarkerId_UserEntityIdAndDateIsNotNull(UserEntity userEntity);
    List<UserHistory> findByMarkerId_UserEntityId(UserEntity userEntity);
}
