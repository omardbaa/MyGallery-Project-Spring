package com.mygallery.enities;

import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Table(name = "files")

public class File {






    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")

    @Column(name = "_id")
    private String id;
    @Column(name = "_names")
    private String name;
    @Column(name = "_types")
    private String type;
    @Column(name = "_sizes")
    private long size;
    @Column(name = "_descriptions")
    private String description;
    @Column(name = "_extensions")
    private String extension;


    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH},
            targetEntity = Folder.class, fetch = FetchType.LAZY)
    @JoinTable(name = "files_folder",
            joinColumns = @JoinColumn(name ="fileId"),
            inverseJoinColumns = @JoinColumn(name ="folderId")
    )
    @Column(name = "_folders")
    //@JsonIgnore
    private Collection <Folder> folder;



    public File(String name, String type, long size) {
        this.name = name;
        this.type = type;
        this.size=size;

    }

    public File(String id) {
        this.id=id;
    }
}
