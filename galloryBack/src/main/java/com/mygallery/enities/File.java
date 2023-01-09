package com.mygallery.enities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Collection;

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

    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;


    @Column(name = "type")
    private String type;


    @Column(name = "size")
    private long size;


    @Column(name = "extension")
    private String extension;

    @Column(name = "url")
    private String url;


    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH},
            targetEntity = Folder.class, fetch = FetchType.LAZY)
    @JoinTable(name = "files_folder",
            joinColumns = @JoinColumn(name = "fileId"),
            inverseJoinColumns = @JoinColumn(name = "folderId")
    )
    @JsonIgnore
    private Collection<Folder> folder;


    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH},
            targetEntity = Tag.class, fetch = FetchType.LAZY)
    @JoinTable(
            name = "file_tag",
            joinColumns = @JoinColumn(name = "file_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))

    @JsonIgnore
    private Collection<Tag> tags;


    public File(String name, String type, long size) {
        this.name = name;
        this.type = type;
        this.size = size;

    }

    public File(String id) {
        this.id = id;
    }


}
