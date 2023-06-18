package com.example.thuchanh.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;
    @PostMapping("/register")
    public void register(@RequestBody RegisterRequest request){
        service.register(request);
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.authenticate(request));
    }
    @PostMapping("/authenticate/recreate")
    public ResponseEntity<AuthenticationResponse> authenticateRecreate(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.authenticateRecreate(request));
    }
}
