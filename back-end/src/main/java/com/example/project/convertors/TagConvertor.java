package com.example.project.convertors;

import com.example.project.model.Tag;
import com.example.project.repositories.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TagConvertor {

    private final TagRepository tagRepository;

    public List<String> convert(List<Tag> tags) {
        return tags.stream().map(Tag::getName).collect(Collectors.toList());
    }

    public List<Tag> convertToTags(List<String> tags) {
        List<Tag> res = new ArrayList<>();
        for (String tag : tags ) {
            res.add(tagRepository.findByName(tag));
        }
        return res ;
    }
}
