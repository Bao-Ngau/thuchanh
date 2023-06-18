package com.example.thuchanh.controller;

import com.example.thuchanh.entity.ERole;
import com.example.thuchanh.service.impl.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/role")
@RequiredArgsConstructor
public class RoleController {
    private final RoleService roleService;
    @GetMapping
    public List<ERole> getAllRole(){
        return roleService.getAllRole();
    }
}
