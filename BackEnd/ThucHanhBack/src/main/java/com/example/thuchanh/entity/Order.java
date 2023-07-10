package com.example.thuchanh.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usreid", nullable = false)
    private User user;
    private Integer count;
    private Integer addcart;
    private Integer pay;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "bookid")
    private Book books;
    @CreatedDate
    private Date createddate;
    @CreatedBy
    private String createdby;
    private Date modifieddate;
    private String modifiedby;
}
