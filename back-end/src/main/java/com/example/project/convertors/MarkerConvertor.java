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

    public List<MarkerView> convert(List<Marker> markers){
        return markers
                .stream()
                .map(
                        marker ->MarkerView
                                .builder()
                                .uuid(marker.getId())
                                .coords(new Coords(marker.getXCoordinate().toString(), marker.getYCoordinate().toString()))
                                .description(marker.getDescription())
                                .maxRange(marker.getMaxRange().toString())
                                .minRange(marker.getMinRange().toString())
                                .tags(tagConvertor.convert(marker.getTags()))
                                .build())
                .collect(Collectors.toList());
    }
}
