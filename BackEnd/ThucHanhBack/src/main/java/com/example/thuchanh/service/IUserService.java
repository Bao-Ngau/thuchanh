package com.example.thuchanh.service;

import com.example.thuchanh.auth.RegisterRequest;
import com.example.thuchanh.entity.User;
import org.springframework.data.domain.Page;

public interface IUserService {
    User getUserByUserName(String username);
    Page<User> findAllUser(int page, int size);
    User saveUser(RegisterRequest request);
    User updateUser(Long id, RegisterRequest request);
    void deleteUser(String username);
}
