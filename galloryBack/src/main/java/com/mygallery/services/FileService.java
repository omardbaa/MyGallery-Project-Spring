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
import java.util.Optional;
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

        String exetention= Optional.ofNullable(fileName)
                .filter(f -> f.contains("."))
                .map(f -> f.substring(fileName.lastIndexOf(".") + 1))
                .get()
                .toLowerCase();
        System.out.println(exetention);

      try {
            if (Files.notExists(rootPath, linkOptions)) {

                Files.createDirectory(rootPath);

            }
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
        try {
            fileRepository.save(formFile);
            Files.copy(file.getInputStream(), this.rootPath.resolve(formFile.getId()+"."+exetention));
        } catch (Exception e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
        return fileRepository.save(formFile);


    }


    //Load a file by id

    public Resource getFile(String id) {

        try {
            Path file = rootPath.resolve(id+"."+fileRepository.getType(id).split("/",2)[1]);
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
    public boolean delete(String id) {


        try {
         /*   File file= new File(id);

            String exetention= Optional.ofNullable(file.getName())
                    .filter(f -> f.contains("."))
                    .map(f -> f.substring(file.getName().lastIndexOf(".") + 1))
                    .get()
                    .toLowerCase();
            System.out.println(exetention);*/
//            System.out.println(fileRepository.selectFileName(id));
//            fileRepository.deleteById(id);

//            Path file = rootPath.resolve(fileRepository.selectFileName(id));
            Path filepath = rootPath.resolve(id+"."+fileRepository.getType(id).split("/",2)[1]);
                System.out.println(filepath);
            Files.deleteIfExists(filepath);
            fileRepository.deleteById(id);
            return Files.deleteIfExists(filepath);



        } catch (IOException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }

    }}



