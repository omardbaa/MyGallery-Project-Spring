package com.mygallery.repositories;

import com.mygallery.enities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface TagRepository extends JpaRepository<Tag, Long> {

    Tag findByTagName(String tagName);


    Optional<Tag> findById(Long id);


}
