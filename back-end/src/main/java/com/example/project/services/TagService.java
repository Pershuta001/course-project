package com.example.project.services;

import com.example.project.convertors.TagConvertor;
import com.example.project.model.Tag;
import com.example.project.repositories.TagRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;
    private final TagConvertor tagConvertor;

    @Transactional
    public List<String> findAllTags(){
        return tagConvertor.convert(tagRepository.findAll());
    }

    @SneakyThrows
    @Transactional
    public Tag saveNewTag(String tagName){
        if(tagRepository.existsByName(tagName))
            throw new Exception("Tag with such name already exists");
        return tagRepository.save(Tag.builder().name(tagName).build());
    }

    @SneakyThrows
    @Transactional
    public Tag deleteTagByName(String tagName){
        if(!tagRepository.existsByName(tagName))
            throw new Exception("No tag with such name");
        return tagRepository.deleteByName(tagName);
    }


}
