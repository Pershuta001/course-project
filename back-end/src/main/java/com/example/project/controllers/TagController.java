package com.example.project.controllers;

import com.example.project.model.Tag;
import com.example.project.services.TagService;
import com.example.project.view.TagView;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TagController {
    private final TagService tagService;

    @ResponseBody
    @GetMapping("tags/all")
    public ResponseEntity<List<String>> getAllTagsName(){
        return ResponseEntity
                .ok()
                .body(tagService.findAllTags());
    }

    @ResponseBody
    @PostMapping("tags/add")
    @PreAuthorize("hasAuthority('tag:create')")
    public ResponseEntity<Tag> saveTag(
            @RequestBody TagView tagView
    ){
        return ResponseEntity
                .ok()
                .body(tagService.saveNewTag(tagView.getName()));
    }

    @ResponseBody
    @PostMapping("tags/delete")
    @PreAuthorize("hasAuthority('tag:delete')")
    public ResponseEntity<Tag> deleteTag(
            @RequestBody TagView tagView
    ){
        return ResponseEntity
                .ok()
                .body(tagService.deleteTagByName(tagView.getName()));
    }

}
