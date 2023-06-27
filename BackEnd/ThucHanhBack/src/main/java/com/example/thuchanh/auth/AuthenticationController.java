package com.example.thuchanh.auth;

import com.example.thuchanh.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;
    @PostMapping("/register")
    public ResponseEntity<?> register(@Validated @RequestBody RegisterRequest request , BindingResult bindingResult){
        if (service.checkCountUsernameOrEmail(request) == null){
            if (bindingResult.hasErrors()){
                return  ResponseEntity.badRequest().body(bindingResult.getFieldError());
            }else {
                service.register(request);
                return ResponseEntity.ok().build();
            }
        }else {
            return ResponseEntity.badRequest().body(service.checkCountUsernameOrEmail(request));
        }
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.authenticate(request));
    }
    @PostMapping("/authenticate/recreate")
    public ResponseEntity<AuthenticationResponse> authenticateRecreate(){
        return ResponseEntity.ok(service.authenticateRecreate());
    }
}
