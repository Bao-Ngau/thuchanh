package com.example.thuchanh.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.*;

@Entity
@Data
@Table(name = "categorys")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @OneToMany(mappedBy = "category",cascade = CascadeType.ALL)
    private Set<Book> books = new HashSet<>();
    private Date createddate;
    private String createdby;
    private Date modifieddate;
    private String modifiedby;
}
