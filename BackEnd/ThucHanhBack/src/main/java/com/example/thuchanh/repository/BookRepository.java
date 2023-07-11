package com.example.thuchanh.repository;

import com.example.thuchanh.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book,Long> {
    Page<Book> findAll(Pageable pageable);
    Integer countByName(String name);
    Integer countByImagefile(String imagefile);
    Optional<Book> searchByName(String name);
    Page<Book> findAllByCategoryId(Pageable pageable,Long id);
    Page<Book> findAllByAuthorId(Pageable pageable,Long id);

}
