package com.mygallery.enities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Collection;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "tags")

@JsonIdentityInfo(scope = Tag.class, generator = ObjectIdGenerators.PropertyGenerator.class,

        property = "id")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;

    @Column(unique = true, nullable = false)
    private String tagName;


    @ManyToMany(mappedBy = "tags", targetEntity = File.class, fetch = FetchType.LAZY)

  //  @JsonIgnore

    private Collection<File> files;


}
