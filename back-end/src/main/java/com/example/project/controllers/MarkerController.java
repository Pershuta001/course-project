package com.example.project.controllers;

import com.example.project.services.MarkerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MarkerController {

    private final MarkerService markerService;

    @ResponseBody
    @PostMapping("/markers/create")
    public ResponseEntity<String> createMarker(
            @RequestBody String marker
    ) {
        return ResponseEntity
                .ok()
                .body(markerService.createMarker(marker));
    }

    @ResponseBody
    @PostMapping("/markers/search")
    public ResponseEntity<String> findMarkers(
          @RequestBody String data

    ) {
        return ResponseEntity
                .ok()
                .body(markerService.findMarkers(data));
    }
}
