package com.example.thuchanh.service;

import com.example.thuchanh.entity.Book;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface IBookService {
    Page<Book> getAll(int page, int size);
    boolean addBook(Book book, String username);
    boolean updateBook(Book book, String username);
    void deleteBook(Long id);
    Boolean isCheckName(String name);
    Optional<Book> searchByBook(String name);
    Boolean isCheckImageFile(String imagefile);
}
