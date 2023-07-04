package com.example.thuchanh.controller;

import com.example.thuchanh.entity.Author;
import com.example.thuchanh.service.impl.AuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/author")
@RequiredArgsConstructor
public class AuthorController {
    private final AuthorService authorService;
    @GetMapping("/{page}/{size}")
    public ResponseEntity<?> getAllAuthor(@PathVariable("page") int page, @PathVariable("size") int size){
        return ResponseEntity.ok(authorService.getAllCategory(page,size));
    }
    @PostMapping("/add/{username}")
    public ResponseEntity<?> addAuthor(@RequestBody Author author, @PathVariable("username") String username){
        if (authorService.isCheckName(author.getName())){
            return ResponseEntity.status(400).body("Tên tác giả này đã tồn tại");
        }
        return ResponseEntity.ok(authorService.addAuthor(author, username));
    }
    @PutMapping("/update/{username}")
    public ResponseEntity<?> updateAuthor(@RequestBody Author author, @PathVariable("username") String username){
        if (authorService.isCheckName(author.getName())){
            return ResponseEntity.status(400).body("Tên tác giả này đã tồn tại");
        }
        return ResponseEntity.ok(authorService.updateAuthor(author, username));
    }
    @DeleteMapping("/delete/{id}")
    public void deleteAuthor(@PathVariable("id") Long id){
        authorService.deleteAuthor(id);
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<?> search(@PathVariable("name") String name){
        if (authorService.isCheckName(name) == false){
            return ResponseEntity.status(400).body("Tên tác giả này không tồn tại");
        }
        return ResponseEntity.ok(authorService.searchAuthor(name));
    }
    @GetMapping("/get")
    private ResponseEntity<?> getAllNoPage(){
        return ResponseEntity.ok(authorService.findAll());
    }
}
