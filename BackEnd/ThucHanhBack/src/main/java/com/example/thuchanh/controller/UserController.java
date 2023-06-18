package com.example.thuchanh.controller;

import com.example.thuchanh.auth.RegisterRequest;
import com.example.thuchanh.entity.User;
import com.example.thuchanh.service.impl.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/{page}/{size}")
    public Page<User> getUser(@PathVariable("page") int page, @PathVariable("size") int size){
        return userService.findAllUser(page,size);
    }
    @GetMapping("/{username}")
    public User getUserByUserName(@PathVariable("username") String username){
        return userService.getUserByUserName(username);
    }
    @PostMapping("/create")
    public User createUser(@RequestBody RegisterRequest request){
        return userService.saveUser(request);
    }
    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable("id") Long id,@RequestBody RegisterRequest request){
        return userService.updateUser(id,request);
    }
    @DeleteMapping("/{username}")
    public void deleteUser(@PathVariable("username") String username){
        userService.deleteUser(username);
    }
}
