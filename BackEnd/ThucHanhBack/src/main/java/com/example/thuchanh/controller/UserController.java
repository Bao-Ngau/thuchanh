package com.example.thuchanh.controller;

import com.example.thuchanh.auth.AuthenticationService;
import com.example.thuchanh.auth.RegisterRequest;
import com.example.thuchanh.entity.User;
import com.example.thuchanh.service.impl.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final AuthenticationService service;
    @GetMapping("/{page}/{size}")
    public Page<User> getUser(@PathVariable("page") int page, @PathVariable("size") int size){
        return userService.findAllUser(page,size);
    }
    @GetMapping("/{username}")
    public User getUserByUserName(@PathVariable("username") String username){
        return userService.getUserByUserName(username);
    }
    @PostMapping("/create")
    public ResponseEntity<?> createUser(@Validated @RequestBody RegisterRequest request , BindingResult bindingResult){
        if (service.checkCountUsernameOrEmail(request) == null){
            if (bindingResult.hasErrors()){
                return ResponseEntity.badRequest().body(bindingResult.getFieldError());
            }else {
                userService.saveUser(request);
                return ResponseEntity.ok().build();
            }
        }else {
            return ResponseEntity.badRequest().body(service.checkCountUsernameOrEmail(request));
        }
    }
    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable("id") Long id,@RequestBody RegisterRequest request){
        return userService.updateUser(id,request);
    }
    @DeleteMapping("/{username}")
    public void deleteUser(@PathVariable("username") String username){
        userService.deleteUser(username);
    }
    @GetMapping("/search/{username}")
    public ResponseEntity<?> searchUser(@PathVariable("username") String username){
        if (service.checkCountUsername(username) == false){
            return ResponseEntity.badRequest().body("Username không tồn tại !!");
        }
        return ResponseEntity.ok(userService.searchUserByUsername(username));
    }
}
