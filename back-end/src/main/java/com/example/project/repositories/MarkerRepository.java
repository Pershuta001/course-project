package com.example.project.repositories;

import com.example.project.model.Marker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MarkerRepository extends JpaRepository<Marker, UUID> {
}
