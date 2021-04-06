package com.example.project.repositories;

import com.example.project.model.Beacon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BeaconRepository extends JpaRepository<Beacon, UUID> {
}
