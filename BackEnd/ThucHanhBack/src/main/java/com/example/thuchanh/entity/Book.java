package com.example.thuchanh.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String name;
    private String imagefile;
    private Integer price;
    private Integer count;
    @Builder.Default
    private Integer sale = 0;
    @Builder.Default
    private Integer countsell = 0;
    private Integer priceend = 0;
    private String description;
    private String action;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private String publicationdate;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "authorid")
    private Author author;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoryid")
    private Category category;
    @OneToMany(mappedBy = "books")
    private Set<Order> orders = new HashSet<>();
    @OneToMany(mappedBy = "book")
    private Set<Comment> comments = new HashSet<>();
    @CreatedDate
    private Date createddate;
    @CreatedBy
    private String createdby;
}


