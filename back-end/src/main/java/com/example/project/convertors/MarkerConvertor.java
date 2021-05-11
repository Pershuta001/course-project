package com.example.project.convertors;

import com.example.project.model.Marker;
import com.example.project.view.Coords;
import com.example.project.view.MarkerView;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class MarkerConvertor {

    private final TagConvertor tagConvertor;

    public List<MarkerView> convert(List<Marker> markers) {
        return markers.stream().map(this::convert).collect(Collectors.toList());
    }

    public MarkerView convert(Marker marker) {
        return MarkerView
                .builder()
                .uuid(marker.getId())
                .coords(new Coords(marker.getLat().toString(), marker.getLng().toString()))
                .description(marker.getDescription())
                .maxPrice(marker.getMaxPrice())
                .minPrice(marker.getMinPrice())
                .tags(tagConvertor.convert(marker.getTags()))
                .build();
    }
}
