package com.mygallery.repositories;

import com.mygallery.enities.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository

public interface FileRepository extends JpaRepository<File, String> {


   /* @Override
    void deleteById(String aLong);*/
//
    /*@Query(value="SELECT name FROM File f WHERE f.id=?",nativeQuery = true)
    String selectFileName(String id);*/
   @Query(value="SELECT type FROM Files f WHERE f.id=?",nativeQuery = true)
    String getType(String id);
}
