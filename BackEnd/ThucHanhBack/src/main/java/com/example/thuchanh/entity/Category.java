package com.example.thuchanh.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "categorys",uniqueConstraints = {
        @UniqueConstraint(columnNames = "name")
})
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;
    @OneToMany(mappedBy = "category",cascade = CascadeType.ALL)
    private Set<Book> books = new HashSet<>();
    @CreatedDate
    private Date createddate;
    @CreatedBy
    private String createdby;
}
