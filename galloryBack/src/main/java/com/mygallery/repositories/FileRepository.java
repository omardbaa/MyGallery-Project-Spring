package com.mygallery.repositories;

import com.mygallery.enities.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface FileRepository extends JpaRepository <File,Long> {
}
