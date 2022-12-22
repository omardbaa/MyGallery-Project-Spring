package com.mygallery.dtos;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FileDto {

   private String id;

    private String name;
    private String type;
    private String url;
    private String extension;
    private long size;
    private String description;
    private FolderDto Folder;


    public FileDto(String id, String name, String type, String url, long size,String extension) {
        this.id=id;
        this.name=name;
        this.type=type;
        this.url = url;
        this.size=size;
        this.extension=extension;

    }
}
