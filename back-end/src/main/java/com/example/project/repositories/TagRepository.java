package com.example.project.repositories;

import com.example.project.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TagRepository extends JpaRepository<Tag, UUID> {

    boolean existsByName(String name);

    Tag findByName(String name);

    Tag deleteByName(String name);
}
