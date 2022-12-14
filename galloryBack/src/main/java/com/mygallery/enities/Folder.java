package com.mygallery.enities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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

@JsonIdentityInfo(scope = Folder.class, generator = ObjectIdGenerators.PropertyGenerator.class,

        property = "folderId")
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long folderId;

    private String folderName;

    @ManyToMany(mappedBy = "folder", targetEntity = File.class, fetch = FetchType.LAZY)
//@JsonIgnore
    private Collection<File> files;


}
