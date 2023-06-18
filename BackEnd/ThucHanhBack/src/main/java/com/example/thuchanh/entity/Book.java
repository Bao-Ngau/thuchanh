package com.example.thuchanh.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String title;
    private Integer price;
    private String description;
    private String publicationdate;
    private Integer practice;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "authorid")
    private Author author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoryid")
    private Category category;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "book_order",joinColumns = @JoinColumn(name = "book_id"),inverseJoinColumns = @JoinColumn(name = "order_id"))
    private Set<Order> orders = new HashSet<>();
    private Date createddate;
    private String createdby;
    private Date modifieddate;
    private String modifiedby;
}


