package com.example.project.controllers;

import com.example.project.services.MarkerService;
import com.example.project.view.Coords;
import com.example.project.view.MarkerView;
import com.example.project.view.SearchMarkersView;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class MarkerController {

    private final MarkerService markerService;

    @ResponseBody
    @PostMapping("/markers/create")
    @PreAuthorize("hasAuthority('marker:create')")
    public ResponseEntity<String> createMarker(
            @RequestBody MarkerView marker
    ) {
        System.err.println(marker);
        return ResponseEntity
                .ok()
                .body(markerService.createMarker(marker));
    }

    @ResponseBody
    @GetMapping("/markers/search/bounds")
    @PreAuthorize("hasAuthority('marker:reply')")
    public ResponseEntity<List<MarkerView>> findMarkers(
            @RequestParam List<String> tags,
            @RequestParam Double minPrice,
            @RequestParam Double maxPrice,
            @RequestParam Double northWestLat,
            @RequestParam Double northWestLng,
            @RequestParam Double southEastLat,
            @RequestParam Double southEastLng
    ) {
        return ResponseEntity
                .ok()
                .body(markerService.findMarkers(SearchMarkersView
                        .builder()
                        .minPrice(minPrice)
                        .maxPrice(maxPrice)
                        .tags(tags)
                        .build(), northWestLat, northWestLng, southEastLat, southEastLng));
    }

    @ResponseBody
    @GetMapping("/markers/search")
    @PreAuthorize("hasAuthority('marker:reply')")
    public ResponseEntity<List<MarkerView>> findMarkers(
            @RequestParam List<String> tags,
            @RequestParam Double minPrice,
            @RequestParam Double maxPrice
    ) {
        return ResponseEntity
                .ok()
                .body(markerService.findMarkers(SearchMarkersView
                        .builder()
                        .maxPrice(minPrice)
                        .maxPrice(maxPrice)
                        .tags(tags)
                        .build()));
    }

    @ResponseBody
    @GetMapping("/markers/my")
    @PreAuthorize("hasAuthority('marker:reply')")
    public ResponseEntity<List<MarkerView>> findMarkersForUser() {
        return ResponseEntity
                .ok()
                .body(markerService.findMarkersForCurrentUser());
    }

    @ResponseBody
    @GetMapping("/markers/my/{uuid}")
    @PreAuthorize("hasAuthority('marker:reply')")
    public ResponseEntity<List<MarkerView>> findMarkersForUserById(
            @PathVariable UUID uuid
    ) {
        return ResponseEntity
                .ok()
                .body(markerService.findMarkersForUserById(uuid));
    }


    @ResponseBody
    @DeleteMapping("/markers/delete/{uuid}")
    @PreAuthorize("hasAuthority('marker:delete')")
    public ResponseEntity<String> deleteMarker(
            @PathVariable UUID uuid
    ) {
        return ResponseEntity
                .ok()
                .body(markerService.deleteMarker(uuid));
    }
}
