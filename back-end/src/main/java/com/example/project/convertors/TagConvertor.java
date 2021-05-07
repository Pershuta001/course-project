package com.example.project.convertors;

import com.example.project.model.Tag;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TagConvertor {

    public List<String> convert(List<Tag> tags){
       return tags.stream().map(Tag::getName).collect(Collectors.toList());
    }
}
