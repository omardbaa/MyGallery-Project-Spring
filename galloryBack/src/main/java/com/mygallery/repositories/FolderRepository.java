package com.mygallery.repositories;

import com.mygallery.enities.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository

public interface FolderRepository extends JpaRepository<Folder, Long> {

   Folder  findByFolderId(Long folderId);

    Folder findByFolderName(String folderName);



    @Modifying
    @Transactional
    @Query(value=" DELETE FROM files_folder\n" +
            "    WHERE file_id LIKE %?% AND folder_id=?;\n",nativeQuery = true)
    void deleteFile(String fileId, Long folderId);


}
