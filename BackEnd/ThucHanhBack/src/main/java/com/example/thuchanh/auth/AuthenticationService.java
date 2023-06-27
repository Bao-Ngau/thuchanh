package com.example.thuchanh.auth;

import com.example.thuchanh.config.JwtService;
import com.example.thuchanh.entity.ERole;
import com.example.thuchanh.entity.User;
import com.example.thuchanh.repository.UserRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final HttpServletRequest requestt;
    public void register(RegisterRequest request) {
        var user = User.builder()
                .fullname(request.getFullname())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(ERole.USER)
                .createddate(new Date())
                .build();
        userRepository.save(user);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
         authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        var jwtTokenGenerate = jwtService.generateToken(user);
        var jwtTokenRefresh = jwtService.refreshToken(user);
        userRepository.updateRfToken(user.getId(), jwtTokenRefresh);
        return AuthenticationResponse.builder()
                .token(jwtTokenGenerate)
                .build();
    }

    public AuthenticationResponse authenticateRecreate() {
        String authHeader = requestt.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("Missing or invalid Authorization header: " + authHeader);
            return null;
        }

        String jwt = authHeader.substring(7);
        Claims exTokenHeader = jwtService.extractAllClaims(jwt);
        var tokenData = userRepository.findByUsername(exTokenHeader.getSubject()).orElseThrow();
        Claims exTokenRefreshData = jwtService.extractAllClaims(tokenData.getRftoken());
        String jwtTokenGenerateRecreate = null;
        if (exTokenHeader.get("ip").toString().equals(exTokenRefreshData.get("ip").toString())){
            jwtTokenGenerateRecreate = jwtService.generateToken(
                    exTokenHeader.getSubject(),exTokenHeader.get("fullName").toString(),
                    exTokenHeader.get("role").toString());
        }
        return AuthenticationResponse.builder()
                .token(jwtTokenGenerateRecreate)
                .build();
    }
    public String checkCountUsernameOrEmail(RegisterRequest request){
        String message = null;
        if (checkCountUsername(request.getUsername())){
            message = "1";
        }else if (checkCountEmail(request.getEmail())){
            message = "2";
        }
        return message;
    }
    public boolean checkCountUsername(String username){
        if (userRepository.countByUsername(username)==1){
            return true;
        }
        return false;
    }
    public boolean checkCountEmail(String email){
        if (userRepository.countByEmail(email)==1){
            return true;
        }
        return false;
    }
}
