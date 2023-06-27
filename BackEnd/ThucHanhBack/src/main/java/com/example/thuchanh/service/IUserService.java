package com.example.thuchanh.service;

import com.example.thuchanh.auth.RegisterRequest;
import com.example.thuchanh.entity.User;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface IUserService {
    User getUserByUserName(String username);
    Page<User> findAllUser(int page, int size);
    User saveUser(RegisterRequest request);
    User updateUser(Long id, RegisterRequest request);
    void deleteUser(String username);
    Optional<User> searchUserByUsername(String username);
}
