package com.example.thuchanh.service.impl;

import com.example.thuchanh.entity.Category;
import com.example.thuchanh.repository.CategoryRepository;
import com.example.thuchanh.service.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {
    private final CategoryRepository categoryRepository;
    @Override
    public Page<Category> getAllCategory(int page, int size) {
        Pageable pageable = PageRequest.of(page,size);
        return categoryRepository.findAll(pageable);
    }

    @Transactional
    @Override
    public Category saveCategory(Category category,String username) {
        var newCategory = Category.builder()
                .name(category.getName())
                .createddate(new Date())
                .createdby(username)
                .build();
        return categoryRepository.save(newCategory);
    }

    @Transactional
    @Override
    public Category updateCategory(Category categoryRq, String username) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryRq.getId());
        Category category = optionalCategory.get();
        if (optionalCategory.isPresent()){
            category.setName(categoryRq.getName());
            category.setCreateddate(new Date());
            category.setCreatedby(username+" (sửa lại)");
        }else {
            System.out.println("Update category null");
        }
        return categoryRepository.save(category);
    }


    @Transactional
    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public Category searchCategory(String name) {
        return categoryRepository.findByName(name);
    }

    @Override
    public Boolean checkName(String name) {
        if (categoryRepository.countByName(name)==1){
            return true;
        }
        return false;
    }

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }
}
