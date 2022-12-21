package com.mygallery.repositories;

import com.mygallery.enities.File;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<File, String> {

   @Query(value="SELECT name FROM Files f WHERE f.id=?",nativeQuery = true)
    String getName(String id);

    File findByName(String fileName);

    File findFileById(String Id);

}
