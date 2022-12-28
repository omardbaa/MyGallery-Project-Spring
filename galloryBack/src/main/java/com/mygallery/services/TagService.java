package com.mygallery.services;


import com.mygallery.enities.Tag;
import com.mygallery.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {
    @Autowired
    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }


    public void save(Tag tag) {

        tagRepository.save(tag);
    }


    public void update(Tag tag) {
        tagRepository.save(tag);
    }


    public void delete(Long id) {
        tagRepository.deleteById(id);
    }


    public Tag findById(Long id) {
        return tagRepository.findById(id).get();
    }


    public List<Tag> getAll() {
        return tagRepository.findAll();
    }

    public Tag findByName(String tagName) {
        return tagRepository.findByTagName(tagName);
    }


}
