package com.example.project.services;

import com.example.project.repositories.MarkerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MarkerService {

    private final MarkerRepository markerRepository;


    @Transactional
    public String createMarker(String markerView) {
        System.out.println(markerView);
        return "success";
    }


    @Transactional
    public String findMarkers(String data) {
        System.out.println(data);
        return "success";
    }
}
