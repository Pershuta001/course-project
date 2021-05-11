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

    List<Marker> findMarkerByUserEntityIdNotAndLatBetweenAndLngBetweenAndMinPriceGreaterThanEqualAndMaxPriceLessThanEqual(UserEntity userEntity, double a1, double a2, double a3, double a4, double a5, double a6);

    void deleteById(UUID uuid);
}
