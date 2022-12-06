package com.mygallery.enities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Table(name = "files")

public class File {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    private String type;
    private long size;
    private String description;


    public File(String name, String type, long size) {
        this.name = name;
        this.type = type;
        this.size=size;

    }
}
