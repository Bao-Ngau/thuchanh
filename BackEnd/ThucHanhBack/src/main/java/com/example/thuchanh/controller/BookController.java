package com.example.thuchanh.controller;

import com.example.thuchanh.entity.Book;
import com.example.thuchanh.service.impl.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping("/{page}/{size}")
    public ResponseEntity<?> getAllBook(@PathVariable("page") int page, @PathVariable("size") int size){
        return ResponseEntity.ok(bookService.getAll(page, size));
    }
    @PostMapping("/add/{username}")
    public ResponseEntity<?> addBook(@PathVariable("username") String username, @RequestBody Book book){
        if (bookService.isCheckImageFile(book.getImagefile())){
            return ResponseEntity.status(400).body("Tên ảnh này đã tồn tại");
        }else if (bookService.addBook(book,username) == false){
            return ResponseEntity.status(400).body("Tên name đã tồn tại");
        }
        return ResponseEntity.ok().build();
    }
    @PutMapping("/update/{username}")
    public ResponseEntity<?> updateBook(@PathVariable("username") String username, @RequestBody Book book){
        if (bookService.isCheckImageFile(book.getImagefile())){
            return ResponseEntity.status(400).body("Tên ảnh này đã tồn tại");
        }else if (bookService.updateBook(book,username) == false){
            return ResponseEntity.status(400).body("Tên name đã tồn tại");
        }
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("delete/{id}")
    public void deleteBook(@PathVariable("id") Long id){
        bookService.deleteBook(id);
    }
    @GetMapping("/search/{name}")
    public ResponseEntity<?> searchBook(@PathVariable("name") String name){
        if (bookService.isCheckName(name)==false){
            return ResponseEntity.status(400).body("Tên sách này không tồn tại");
        }
        return ResponseEntity.ok(bookService.searchByBook(name));
    }
    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(bookService.saveImage(file));
    }
    @PostMapping("/updateimg")
    public ResponseEntity<?> updateFile(@RequestParam("file") MultipartFile file ,@RequestParam("nameFile") String nameFile) throws IOException {
        return ResponseEntity.ok(bookService.saveImage(file,nameFile));
    }
    @PostMapping("/deleteimg")
    public ResponseEntity<?> deleteFile(@RequestParam("nameFile") String nameFile){
        bookService.deleteImageFile(nameFile);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/getbyid/{id}")
    public ResponseEntity<?> getBookById(@PathVariable("id") Long id){
        return ResponseEntity.ok(bookService.getBookById(id));
    }
}
