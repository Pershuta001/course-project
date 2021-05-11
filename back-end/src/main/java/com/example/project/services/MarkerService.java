package com.example.project.services;

import com.example.project.convertors.MarkerConvertor;
import com.example.project.convertors.TagConvertor;
import com.example.project.model.Marker;
import com.example.project.model.Tag;
import com.example.project.model.UserEntity;
import com.example.project.repositories.MarkerRepository;
import com.example.project.repositories.UserRepository;
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
                .lat(Double.parseDouble(markerView.getCoords().getLat()))
                .lng(Double.parseDouble(markerView.getCoords().getLng()))
                .description(markerView.getDescription())
                .maxPrice(markerView.getMaxPrice())
                .minPrice(markerView.getMinPrice())
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
                        .filter(marker -> matchesByTag(marker.getTags(), searchMarkersView.getTags()))
                        .collect(Collectors.toList()));

    }

    @Transactional
    public List<MarkerView> findMarkers(SearchMarkersView searchMarkersView,
                                        Double northWestLat,
                                        Double northWestLng,
                                        Double southEastLat,
                                        Double southEastLng) {
        System.out.println(searchMarkersView);
        return markerConvertor.convert(
                markerRepository.findMarkerByUserEntityIdNotAndLatBetweenAndLngBetweenAndMinPriceGreaterThanEqualAndMaxPriceLessThanEqual(
                        currentUser(),
                        northWestLat,
                        southEastLat,
                        northWestLng,
                        southEastLng,
                        searchMarkersView.getMinPrice(),
                        searchMarkersView.getMaxPrice()
                )
                        .stream()
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
        if (marker.isEmpty()) {
            throw new Exception("Now such marker exists");
        }
        if (!marker.get().getUserEntityId().equals(currentUser()))
            throw new Exception("Can't delete marker with such id");
        markerRepository.delete(marker.get());
        return "success";

    }

    private boolean matchesByTag(List<Tag> tagsInMarker, List<String> tagsToSearch) {
        return tagsInMarker.stream().anyMatch(tag -> tagsToSearch.contains(tag.getName()));
    }

    private UserEntity currentUser() {
        String login = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findUserByLogin(login).get();
    }

}
