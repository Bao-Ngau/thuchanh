package com.example.thuchanh.repository;

import com.example.thuchanh.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
    Page<Category> findAll(Pageable pageable);
    Integer countByName(String name);
    Category findByName(String name);
}
