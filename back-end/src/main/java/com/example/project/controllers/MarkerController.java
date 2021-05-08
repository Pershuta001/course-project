package com.example.project.controllers;

import com.example.project.services.MarkerService;
import com.example.project.view.Coords;
import com.example.project.view.MarkerView;
import com.example.project.view.SearchMarkersView;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class MarkerController {

    private final MarkerService markerService;

    @ResponseBody
    @PostMapping("/markers/create")
    public ResponseEntity<String> createMarker(
            @RequestBody MarkerView marker
    ) {
        return ResponseEntity
                .ok()
                .body(markerService.createMarker(marker));
    }

    @ResponseBody
    @GetMapping("/markers/search")
    public ResponseEntity<List<MarkerView>> findMarkers(
            @RequestParam List<String> tags,
            @RequestParam String lat,
            @RequestParam String lng,
            @RequestParam String minRange,
            @RequestParam String maxRange
    ) {
        return ResponseEntity
                .ok()
                .body(markerService.findMarkers(SearchMarkersView
                        .builder()
                        .coords(Coords.builder().lat(lat).lng(lng).build())
                        .maxRange(maxRange)
                        .minRange(minRange)
                        .tags(tags)
                        .build()));
    }

    @ResponseBody
    @GetMapping("/markers/my")
    public ResponseEntity<List<MarkerView>> findMarkersForUser() {
        return ResponseEntity
                .ok()
                .body(markerService.findMarkersForCurrentUser());
    }

    @ResponseBody
    @DeleteMapping("/markers/delete/{uuid}")
    public ResponseEntity<String> deleteMarker(
            @PathVariable UUID uuid
            ) {
        return ResponseEntity
                .ok()
                .body(markerService.deleteMarker(uuid));
    }
}
