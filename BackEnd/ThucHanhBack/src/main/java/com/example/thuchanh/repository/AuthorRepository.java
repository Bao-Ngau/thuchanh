package com.example.thuchanh.repository;

import com.example.thuchanh.entity.Author;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthorRepository extends JpaRepository<Author,Long> {
    Page<Author> findAll(Pageable pageable);
    Integer countByName(String name);
    Optional<Author> findByName(String name);
}
