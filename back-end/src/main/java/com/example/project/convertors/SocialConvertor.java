package com.example.project.convertors;

import com.example.project.model.Social;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SocialConvertor {

    public List<String> convert(List<Social> tags) {
        return tags.stream().map(Social::getName).collect(Collectors.toList());
    }
}
