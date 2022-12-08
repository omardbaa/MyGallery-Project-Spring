package com.mygallery.services;


import com.mygallery.enities.File;
import com.mygallery.repositories.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.stream.Stream;

@Service
public class FileService {

    //Create path to upload file in local storage
    private final Path rootPath = Paths.get("uploads");
    @Autowired
    private final FileRepository fileRepository;


    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }


    //with this methode we can upload a file using MultipartFile interface

    public File Upload(MultipartFile file) throws IOException {

        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

        File formFile = new File(fileName, file.getContentType(), file.getSize());

        LinkOption[] linkOptions = new LinkOption[]{LinkOption.NOFOLLOW_LINKS};

        try {
            if (Files.notExists(rootPath, linkOptions)) {

                Files.createDirectory(rootPath);

            }
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
        try {
            Files.copy(file.getInputStream(), this.rootPath.resolve(file.getOriginalFilename()));
        } catch (Exception e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
        return fileRepository.save(formFile);


    }


    //Load a file by id

    public Resource getFile(String id) {


        try {
            Path file = rootPath.resolve(id);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
        //return fileRepository.findById(id).get();
    }


    //Load all files
    public Stream<File> getAllFiles() {
        return fileRepository.findAll().stream();
    }


    //Delete file by id
    public boolean delete(String filename) {
        try {
            Path file = rootPath.resolve(filename);
            return Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }
}



