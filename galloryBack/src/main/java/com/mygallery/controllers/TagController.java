package com.mygallery.controllers;


import com.mygallery.dtos.FileFolder;
import com.mygallery.dtos.TagFile;
import com.mygallery.enities.File;
import com.mygallery.enities.Folder;
import com.mygallery.enities.Tag;
import com.mygallery.repositories.FileRepository;
import com.mygallery.services.FileService;
import com.mygallery.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("v1/tag")
public class TagController {
    @Autowired
    private final TagService service;
    @Autowired
    private final FileService fileService;
    @Autowired
    private final FileRepository fileRepository;


    public TagController(TagService service, FileService fileService, FileRepository fileRepository) {
        this.service = service;
        this.fileService = fileService;
        this.fileRepository = fileRepository;

    }

    @PostMapping
    public Tag save(@RequestBody Tag tag) {
        service.save(tag);
        return tag;
    }

    // Update Tag
    @PutMapping("/{id}")
    public ResponseEntity<Tag> update(@PathVariable Long id, @RequestBody Tag tag) {

        Tag newTag = service.findById(id);

        newTag.setTagName(tag.getTagName());


        service.save(newTag);
        return new ResponseEntity<>(newTag, HttpStatus.OK);
    }

    //	Get All tags
//	@PostAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public ResponseEntity<List<Tag>> getAll() {
        List<Tag> tags = service.getAll();
        return new ResponseEntity<>(tags, HttpStatus.OK);

    }



    @GetMapping("/{id}/files")
    public List<File> getAllTagsOfFile(@PathVariable("id") Long id) {

        return this.fileService.getAllTagsOfFile(id);

    }

    //	 Get Tag by ID
    @GetMapping("/{id}")
    public ResponseEntity<Tag> findById(@PathVariable("id") Long id) {
        Tag tag = service.findById(id);
        return new ResponseEntity<>(tag, HttpStatus.OK);

    }


    //Delet tag byId
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> delete(@PathVariable Long id) {
        service.delete(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }




    //Link tag with file By Id

    @PostMapping("/tagToFile")
    public Collection<Tag> AddTagToFile(@RequestBody TagFile tagFile) {

        File file =  fileService.FindFileById(tagFile.getFileId());
        Tag tag = service.findById(tagFile.getTagId());

        Collection<Tag> tags = file.getTags();
        tags.add(tag);
        file.setTags(tags);
        fileRepository.save(file);

        return file.getTags();
    }

}
