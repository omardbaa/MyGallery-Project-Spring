package com.mygallery.controllers;


import com.mygallery.dtos.FileDto;
import com.mygallery.dtos.TagDto;
import com.mygallery.enities.File;
import com.mygallery.enities.FileResponse;
import com.mygallery.enities.PaginationConsts;
import com.mygallery.enities.Tag;
import com.mygallery.repositories.FileRepository;
import com.mygallery.response.ResponseMessage;
import com.mygallery.services.FileService;
import com.mygallery.services.TagService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    private FileRepository fileRepository;

    @Autowired
    TagService tagService;

    public FileController(FileService fileService, FileRepository fileRepository) {
        this.fileRepository = fileRepository;
        this.fileService = fileService;
    }


    //Upload file
    @PostMapping("/upload")
    public File uploadFile(@RequestParam("file") MultipartFile file) throws IOException {

        return fileService.Upload(file);


    }

/*
    @GetMapping("/fileList")
    public ResponseEntity<List<FileDto>> getListFiles() {

        List<FileDto> fileInfos = fileService.getAllFiles().map(path -> {
            String id = path.getId();
            String name = path.getName();
            String type = path.getType();
            long size = path.getSize();
            String extension = path.getExtension();
            TagDto tag = new TagDto();


            String exetention = Optional.ofNullable(name)
                    .filter(f -> f.contains("."))
                    .map(f -> f.substring(name.lastIndexOf(".") + 1))
                    .get()
                    .toLowerCase();
            System.out.println(exetention);


            String url = MvcUriComponentsBuilder.fromMethodName(FileController.class, "getFile", path.getId() + "." + exetention).build().toString();
            return new FileDto(id, name, type, url, size, extension, tag);


        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }*/



    //Display file content

    @GetMapping("/display/{filename:.+}")

    public ResponseEntity<Resource> getFile(@PathVariable String filename) {


        Resource file = fileService.getFile(filename);

       String nameoffile= file.getFilename();
      //  assert nameoffile != null;
        String[] id=nameoffile.split("\\.");



        String[] types=fileRepository.getType(id[0]).split("/");


        MediaType contentType =   new MediaType(types[0],types[1]);

        return ResponseEntity.ok().contentType(contentType)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getFilename()).body(file);
    }


    //Download file

    @GetMapping("/{filename:.+}")

    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {


        Resource file = fileService.getFile(filename);



        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename()).body(file);
    }

    //attachment

    @RequestMapping(value = "/files/{id}", method = RequestMethod.GET)
    public Optional<File> findById(@PathVariable("id") String id) {
        return fileService.getfilebyId(id);



    }

    //Delete file by id

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


    //Get all files
    @GetMapping("/files")
    public FileResponse getAllPosts(
            @RequestParam(value = "pageNo", defaultValue = PaginationConsts.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = PaginationConsts.DEFAULT_PAGE_SIZE, required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = PaginationConsts.DEFAULT_SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = PaginationConsts.DEFAULT_SORT_DIRECTION, required = false) String sortDir,
            @RequestParam(value ="keyword",defaultValue ="",required = false) String keyword
    ) {

        return fileService.getAllFiles(pageNo, pageSize, sortBy, sortDir,keyword);
    }



   /* @GetMapping("/files/")
    public List<File> getPaginatedCountries(@PathParam("keyword") String keyword) {

        return fileService.listAll(keyword);
    }*/



    // get tags of file

    @GetMapping("/{id}/tags")
    public List<Tag> getTags (@PathVariable("id") String id) {

        return this.tagService.getTagsOfFile(id);

    }





//Delete tag from file by id
    @DeleteMapping("/deleteTag/{fileId}/{tagId}")
    public ResponseEntity<Map<String, Boolean>> deleteFile(@PathVariable ("fileId") String fileId, @PathVariable ("tagId")  Long tagId) {
        fileService.deleteTag(fileId, tagId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
