package com.example.project.view;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarkerView {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    private class Coords{
        private String lat;
        private String lng;
    }

    private List<String> tags;
    private String description;
    private String minRange;
    private String maxRange;
    private Coords coords;



}
