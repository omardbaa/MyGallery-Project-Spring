package com.mygallery.controllers;


import com.mygallery.dtos.FileDto;
import com.mygallery.enities.File;
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
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("v1/file")
public class FileController {

    @Autowired
    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload")
    public File uploadFile(@RequestParam("file") MultipartFile file) throws IOException {

        return fileService.Upload(file);


    }


    @GetMapping("/files")
    public ResponseEntity<List<FileDto>> getListFiles() {
        List<FileDto> fileInfos = fileService.getAllFiles().map(path -> {
            String filename = path.getName();
            String type = path.getType();
            long size = path.getSize();


            String url = MvcUriComponentsBuilder.fromMethodName(FileController.class, "getFile", path.getName()).build().toString();

            return new FileDto(filename, type, url, size);


        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }


    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = fileService.getFile(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
}
