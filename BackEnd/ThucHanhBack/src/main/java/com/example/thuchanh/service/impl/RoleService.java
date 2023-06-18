package com.example.thuchanh.service.impl;

import com.example.thuchanh.entity.ERole;
import com.example.thuchanh.service.IRoleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService implements IRoleService {
    @Override
    public List<ERole> getAllRole() {
        List<ERole> role = List.of(ERole.values());
        return role;
    }
}
