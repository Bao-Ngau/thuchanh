package com.example.thuchanh.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

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
    private String title;
    private String imagefile;
    private Integer price;
    private Integer count;
    @Builder.Default
    private Integer countsell = 0;
    private String description;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private String publicationdate;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "authorid")
    private Author author;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoryid")
    private Category category;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "book_order",joinColumns = @JoinColumn(name = "book_id"),inverseJoinColumns = @JoinColumn(name = "order_id"))
    private Set<Order> orders = new HashSet<>();
    @CreatedDate
    private Date createddate;
    @CreatedBy
    private String createdby;
}


