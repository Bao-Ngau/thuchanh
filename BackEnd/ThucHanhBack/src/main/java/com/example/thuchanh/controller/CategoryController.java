package com.example.thuchanh.controller;

import com.example.thuchanh.entity.Category;
import com.example.thuchanh.service.impl.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/{page}/{size}")
    public ResponseEntity<?> getAllCategory(@PathVariable("page") int page, @PathVariable("size") int size){
        return ResponseEntity.ok(categoryService.getAllCategory(page,size));
    }
    @PostMapping("/add/{username}")
    public ResponseEntity<?> addCategory(@RequestBody Category category, @PathVariable("username") String username){
        if (categoryService.checkName(category.getName())){
            return ResponseEntity.status(400).body("Tên thể loại này đã tồn tại");
        }
        return ResponseEntity.ok(categoryService.saveCategory(category,username));
    }
    @PutMapping("/update/{username}")
    public ResponseEntity<?> updateCategory(@RequestBody Category category, @PathVariable("username") String username){
        if (categoryService.checkName(category.getName())){
            return ResponseEntity.status(400).body("Tên thể loại này đã tồn tại");
        }
        return ResponseEntity.ok(categoryService.updateCategory(category,username));
    }
    @DeleteMapping("delete/{id}")
    public void deleteCategory(@PathVariable("id") Long id){
        categoryService.deleteCategory(id);
    }
}
