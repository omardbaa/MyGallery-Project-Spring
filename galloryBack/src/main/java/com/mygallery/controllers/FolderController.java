package com.mygallery.controllers;


import com.mygallery.dtos.FileFolder;
import com.mygallery.enities.File;
import com.mygallery.enities.Folder;
import com.mygallery.repositories.FileRepository;
import com.mygallery.services.FileService;
import com.mygallery.services.FolderService;
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
@RequestMapping("v1/folder")
public class FolderController {
    @Autowired
    private FileService fileService;
    @Autowired
    private final FolderService service;



    @Autowired
    private  FileRepository fileRepository;



    public FolderController(FolderService service,FileService fileService,FileRepository fileRepository ) {
        this.service = service;
        this.fileService= fileService;
        this.fileRepository = fileRepository;

    }

    @PostMapping
    public Folder save(@RequestBody Folder Folder) {
        service.save(Folder);
        return Folder;
    }

    // Update Folder
    @PutMapping("/{id}")
    public ResponseEntity<Folder> update(@PathVariable Long id, @RequestBody Folder folder) {

        Folder newFolder = service.findById(id);

        newFolder.setFolderName(folder.getFolderName());


        service.save(newFolder);
        return new ResponseEntity<>(newFolder, HttpStatus.OK);
    }

    //	Get All Folders
//	@PostAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public ResponseEntity<List<Folder>> getAll() {
        List<Folder> folders = service.getAll();
        return new ResponseEntity<>(folders, HttpStatus.OK);

    }
    @GetMapping("/{id}/files")
    public List<File> getAllEmployeeOfProject(@PathVariable("id") Long folderId) {

        return this.fileService.getAllFilesOfFolder(folderId);

    }

    //	 Get Project by ID
    @GetMapping("/{id}")
    public ResponseEntity<Folder> findById(@PathVariable("id") Long id) {
        Folder folder = service.findById(id);
        return new ResponseEntity<>(folder, HttpStatus.OK);

    }

    //Delet folder
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> delete(@PathVariable Long id) {
        service.delete(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    // Assing Folder To file
    @PostMapping("/fileFolder")
    public Collection<Folder> AddFileToFolder(@RequestBody FileFolder fileFolder) {

        File file = (File) fileService.loadFileByName(fileFolder.getFileName());
        Folder folder = service.findByName(fileFolder.getFolderName());

        Collection<Folder> folders = file.getFolder();
        folders.add(folder);
        file.setFolder(folders);
       fileRepository.save(file);

        return file.getFolder();
    }

}
