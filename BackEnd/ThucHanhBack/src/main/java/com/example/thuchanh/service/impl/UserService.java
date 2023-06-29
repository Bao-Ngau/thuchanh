package com.example.thuchanh.service.impl;

import com.example.thuchanh.auth.RegisterRequest;
import com.example.thuchanh.entity.ERole;
import com.example.thuchanh.entity.User;
import com.example.thuchanh.repository.UserRepository;
import com.example.thuchanh.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User getUserByUserName(String username) {
        return userRepository.findByUsername(username).get();
    }

    @Override
    public Page<User> findAllUser(int page, int size) {
        Pageable pageable = PageRequest.of(page,size);
        return userRepository.findAll(pageable);
    }
    @Override
    public User saveUser(RegisterRequest request) {
        var userOne = User.builder()
                .fullname(request.getFullname())
                .email(request.getEmail())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(ERole.valueOf(request.getRole()))
                .createddate(new Date())
                .build();
        return userRepository.save(userOne);
    }

    @Override
    public User updateUser(Long id, RegisterRequest request) {
        Optional<User> userOptional = userRepository.findById(id);
        User user = userOptional.get();
        if(userOptional.isPresent()){
            user.setFullname(request.getFullname());
            user.setUsername(request.getUsername());
            user.setEmail(request.getEmail());
            user.setRole(ERole.valueOf(request.getRole()));
        }else {
            System.out.println("userOptional null");
        }
        return userRepository.save(user);
    }
    @Override
    public void deleteUser(String username) {
        userRepository.updateStatus(username);
    }

    @Override
    public Optional<User> searchUserByUsername(String username) {
        return userRepository.searchByUsername(username);
    }
}
