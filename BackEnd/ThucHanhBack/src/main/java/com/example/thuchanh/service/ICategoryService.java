package com.example.thuchanh.service;

import com.example.thuchanh.entity.Category;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ICategoryService {
    Page<Category> getAllCategory(int page, int size);
    Category saveCategory(Category category, String username);
    Category updateCategory(Category category, String username);
    void deleteCategory(Long id);
    Category searchCategory(String name);
    Boolean checkName(String name);
    List<Category> findAll();
}
