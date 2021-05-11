package com.example.project.view;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarkerView {

    private UUID uuid;
    private List<String> tags;
    private String description;
    private Double minPrice;
    private Double maxPrice;
    private Coords coords;

}
