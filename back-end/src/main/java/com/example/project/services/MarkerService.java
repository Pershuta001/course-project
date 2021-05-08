package com.example.project.services;

import com.example.project.convertors.MarkerConvertor;
import com.example.project.convertors.TagConvertor;
import com.example.project.model.Marker;
import com.example.project.model.Tag;
import com.example.project.model.UserEntity;
import com.example.project.repositories.MarkerRepository;
import com.example.project.repositories.UserRepository;
import com.example.project.view.Coords;
import com.example.project.view.MarkerView;
import com.example.project.view.SearchMarkersView;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MarkerService {

    private final MarkerRepository markerRepository;
    private final UserRepository userRepository;
    private final TagConvertor tagConvertor;
    private final MarkerConvertor markerConvertor;

    @Transactional
    public String createMarker(MarkerView markerView) {
        markerRepository.save(Marker.builder()
                .xCoordinate(Double.parseDouble(markerView.getCoords().getLat()))
                .yCoordinate(Double.parseDouble(markerView.getCoords().getLng()))
                .description(markerView.getDescription())
                .maxRange(Float.parseFloat(markerView.getMaxRange()))
                .minRange(Float.parseFloat(markerView.getMinRange()))
                .userEntityId(currentUser())
                .tags(tagConvertor.convertToTags(markerView.getTags()))
                .build());
        return "success";
    }


    @Transactional
    public List<MarkerView> findMarkers(SearchMarkersView searchMarkersView) {
        return markerConvertor.convert(
                markerRepository.findMarkerByUserEntityIdNot(currentUser())
                        .stream()
                        .filter(marker -> inRange(marker, searchMarkersView))
                        .filter(marker -> matchesByTag(marker.getTags(), searchMarkersView.getTags()))
                        .collect(Collectors.toList()));

    }

    @Transactional
    public List<MarkerView> findMarkersForCurrentUser() {
        return markerConvertor.convert(markerRepository.findByUserEntityId(currentUser()));
    }

    @SneakyThrows
    @Transactional
    public String deleteMarker(UUID uuid) {
        Optional<Marker> marker = markerRepository.findById(uuid);
        if(marker.isEmpty()){
            throw new Exception("Now such marker exists");
        }
        if(!marker.get().getUserEntityId().equals(currentUser()))
            throw new Exception("Can't delete marker with such id");
        markerRepository.delete(marker.get());
        return "success";

    }

    private boolean inRange(Marker marker, SearchMarkersView searchMarkersView) {
        double dist = distance(
                Coords.builder()
                        .lat(marker.getXCoordinate().toString())
                        .lng(marker.getYCoordinate().toString())
                        .build(),
                searchMarkersView.getCoords());

        if (dist > marker.getMaxRange() || dist > Double.parseDouble(searchMarkersView.getMaxRange()))
            return false;

        if (dist < marker.getMinRange() || dist < Double.parseDouble(searchMarkersView.getMinRange()))
            return false;

        return true;

    }

    private boolean matchesByTag(List<Tag> tagsInMarker, List<String> tagsToSearch) {
        return tagsInMarker.stream().anyMatch(tag -> tagsToSearch.contains(tag.getName()));
    }

    private UserEntity currentUser() {
        String login = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findUserByLogin(login).get();
    }

    private Double distance(Coords coords1, Coords coords2) {
        return distance(
                Double.parseDouble(coords1.getLat()),
                Double.parseDouble(coords2.getLat()),
                Double.parseDouble(coords1.getLng()),
                Double.parseDouble(coords1.getLng()));
    }

    private double distance(double lat1, double lat2, double lon1, double lon2) {
        final int R = 6371;

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // in kilometers
    }
}
