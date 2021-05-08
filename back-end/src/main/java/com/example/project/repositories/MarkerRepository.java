package com.example.project.repositories;

import com.example.project.model.Marker;
import com.example.project.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MarkerRepository extends JpaRepository<Marker, UUID> {


    List<Marker> findByUserEntityId(UserEntity userEntity);
    List<Marker> findMarkerByUserEntityIdNot(UserEntity userEntity);

    void deleteById(UUID uuid);
}
