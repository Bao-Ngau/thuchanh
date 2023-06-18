package com.example.thuchanh.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usreid")
    private User user;
    @ManyToMany(mappedBy = "orders")
    private Set<Book> books = new HashSet<>();
    private Date createddate;
    private String createdby;
    private Date modifieddate;
    private String modifiedby;
}
