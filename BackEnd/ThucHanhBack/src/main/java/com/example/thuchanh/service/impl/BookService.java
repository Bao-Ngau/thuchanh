package com.example.thuchanh.service.impl;

import com.example.thuchanh.entity.Book;
import com.example.thuchanh.repository.BookRepository;
import com.example.thuchanh.service.IBookService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookService implements IBookService {
    private final BookRepository bookRepository;
    @Value("${img.folder}")
    private String FOLDER_PATH;
    @Override
    public Page<Book> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return bookRepository.findAll(pageable);
    }

    @Transactional
    @Override
    public boolean addBook(Book book, String username) {
        try {
            var newBook = Book.builder()
                    .name(book.getName())
                    .imagefile(book.getImagefile())
                    .price(book.getPrice())
                    .count(book.getCount())
                    .sale(book.getSale())
                    .priceend(book.getPriceend())
                    .description(book.getDescription())
                    .action(book.getAction())
                    .publicationdate(book.getPublicationdate())
                    .author(book.getAuthor())
                    .category(book.getCategory())
                    .createddate(new Date())
                    .createdby(username)
                    .build();
            bookRepository.save(newBook);
            return true;
        }catch (DataIntegrityViolationException ex) {
            return false;
        }
    }
    @Transactional
    @Override
    public boolean updateBook(Book book, String username) {
        Optional<Book>  optionalBook = bookRepository.findById(book.getId());
        var newBook = optionalBook.get();
        if (optionalBook.isPresent()){
            newBook.setName(book.getName());
            newBook.setImagefile(book.getImagefile());
            newBook.setPrice(book.getPrice());
            newBook.setCount(book.getCount());
            newBook.setPriceend(book.getPriceend());
            newBook.setSale(book.getSale());
            newBook.setDescription(book.getDescription());
            newBook.setAction(book.getAction());
            newBook.setPublicationdate(book.getPublicationdate());
            newBook.setAuthor(book.getAuthor());
            newBook.setCategory(book.getCategory());
            newBook.setCreatedby(username + "(đã sửa)");
        }
        try {
            bookRepository.save(newBook);
            return true;
        }catch (DataIntegrityViolationException ex) {
            return false;
        }
    }

    @Transactional
    @Override
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    @Override
    public Boolean isCheckName(String name) {
        if(bookRepository.countByName(name) >= 1){
            return true;
        }
        return false;
    }

    @Override
    public Optional<Book> searchByBook(String name) {
        return bookRepository.searchByName(name);
    }

    @Override
    public Boolean isCheckImageFile(String imagefile) {
        if (bookRepository.countByImagefile(imagefile) >= 1){
            return true;
        }
        return false;
    }

    public String saveImage(MultipartFile imageFile) throws IOException {
        File folder = new File(FOLDER_PATH);
        if (!folder.exists()) {
            folder.mkdirs();
        }
        String fileName = UUID.randomUUID()+ ".jpeg";
        Path filePath = Paths.get(FOLDER_PATH, fileName);
        Files.copy(imageFile.getInputStream(), filePath);
        return FOLDER_PATH + "/" + fileName;
    }
    public String saveImage(MultipartFile imageFile,String imageFileOld) throws IOException {
        File folder = new File(FOLDER_PATH);
        if (!folder.exists()) {
            folder.mkdirs();
        }
        String fileName = UUID.randomUUID() + ".jpeg";
        Path filePath = Paths.get(FOLDER_PATH, fileName);
        Files.copy(imageFile.getInputStream(), filePath);

        // Xóa file cũ nếu có
        if (imageFileOld != null && !imageFileOld.isEmpty()) {
            File existingFile = new File(imageFileOld);
            if (existingFile.exists()) {
                existingFile.delete();
            }
        }
        return FOLDER_PATH + "/" + fileName;
    }
    public void deleteImageFile(String imageFile) {
        // Xóa file cũ nếu có
        if (imageFile != null && !imageFile.isEmpty()) {
            File existingFile = new File(imageFile);
            if (existingFile.exists()) {
                existingFile.delete();
            }
        }
    }
    public Optional<Book> getBookById(Long id){
        return bookRepository.findById(id);
    }

}
