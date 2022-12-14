package com.mygallery.enities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "folder")
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "_folderId")
    private Long folderId;
    @Column(name = "_folderName")
    private String folderName;

    @ManyToMany(mappedBy = "folder", targetEntity = File.class, fetch = FetchType.LAZY)

    private Collection<File> files;


}
