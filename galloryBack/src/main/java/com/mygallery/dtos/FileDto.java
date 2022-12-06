package com.mygallery.dtos;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FileDto {

    private String name;
    private String type;
    private String url;
    private long size;
    private String description;


    public FileDto(String name, String type, String url, long size) {
        this.name=name;
        this.type=type;
        this.url = url;
        this.size=size;

    }
}
