package com.mygallery.repositories;

import com.mygallery.enities.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface FolderRepository extends JpaRepository<Folder, Long> {

   Folder  findByFolderId(Long folderId);
}
