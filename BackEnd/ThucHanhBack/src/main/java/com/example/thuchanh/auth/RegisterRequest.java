package com.example.thuchanh.auth;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String fullname;
    private String username;
    @Email(regexp = "^[A-Za-z0-9+_.-]+@gmail.com$", message = "Nhập đúng kiểu email")
    private String email;
    @Size(min = 6,message = "Nhập mật khẩu ít nhất 6 kí tự")
    private String password;
    private String role;
}
