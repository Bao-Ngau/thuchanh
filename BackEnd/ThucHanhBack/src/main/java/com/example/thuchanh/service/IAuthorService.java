package com.example.thuchanh.service;

import com.example.thuchanh.entity.Author;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface IAuthorService {
    Page<Author> getAllCategory(int page, int size);
    Author addAuthor(Author author,String username);
    Author updateAuthor(Author author,String username);
    void deleteAuthor(Long id);
    Author searchAuthor(String name);
    Boolean isCheckName(String name);
    List<Author> findAll();
}
