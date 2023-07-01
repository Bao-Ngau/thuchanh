package com.example.thuchanh.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;

import java.util.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "authors",uniqueConstraints = {
        @UniqueConstraint(columnNames = "name")
})
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String name;
    @OneToMany(mappedBy = "author",cascade = CascadeType.ALL)
    private Set<Book> books = new HashSet<>();
    @CreatedDate
    private Date createddate;
    @CreatedBy
    private String createdby;
}
