package com.mygallery.controllers;


import com.mygallery.dtos.FileDto;
import com.mygallery.enities.File;
import com.mygallery.repositories.FileRepository;
import com.mygallery.response.ResponseMessage;
import com.mygallery.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("v1/file")
public class FileController {

    private final Path rootPath = Paths.get("uploads");

    @Autowired
    private FileService fileService;

    @Autowired
    private  FileRepository fileRepository;

    public FileController(FileService fileService,FileRepository fileRepository) {
        this.fileRepository= fileRepository;
        this.fileService = fileService;
    }

    @PostMapping("/upload")
    public File uploadFile(@RequestParam("file") MultipartFile file) throws IOException {

        return fileService.Upload(file);


    }


    @GetMapping("/files")
    public ResponseEntity<List<FileDto>> getListFiles() {
        List<FileDto> fileInfos = fileService.getAllFiles().map(path -> {
            String id = path.getId();
            String name = path.getName();
            String type = path.getType();
            long size = path.getSize();
            String extension=path.getExtension();


            String exetention = Optional.ofNullable(name)
                    .filter(f -> f.contains("."))
                    .map(f -> f.substring(name.lastIndexOf(".") + 1))
                    .get()
                    .toLowerCase();
            System.out.println(exetention);


            String url = MvcUriComponentsBuilder.fromMethodName(FileController.class, "getFile", path.getId() + "." + exetention).build().toString();
            return new FileDto(id,name, type, url, size,extension);


        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }


    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {


        Resource file = fileService.getFile(filename);


        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseMessage> deleteFile(@PathVariable String id) {
        String message = "";

        try {
            fileService.delete(id);


            message = "Delete the file successfully: " + id;
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));

        } catch (Exception e) {
            message = "Could not delete the file: " + id + ". Error: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseMessage(message));
        }
    }


}
