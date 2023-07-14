package com.example.thuchanh.controller;

import com.example.thuchanh.auth.RegisterRequest;
import com.example.thuchanh.service.impl.ForgotPassword;
import com.example.thuchanh.service.impl.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/email")
public class ForgotPasswordController {
    private final UserService userService;
    private final ForgotPassword forgotPassword;
    @PutMapping("/sendCode/{email}")
    public ResponseEntity<?> updateCode(@PathVariable("email") String email){
        if (userService.checkCountEmail(email)){
            return ResponseEntity.ok(forgotPassword.saveCode(email));
        }
        return ResponseEntity.status(403).body("email này không đúng");
    }
    @PostMapping("/checkCodeEmailAndSave/{emailCode}")
    public ResponseEntity<?> checkCodeAndSave(@Validated @RequestBody RegisterRequest request, BindingResult bindingResult, @PathVariable("emailCode") String emailCode){
        if(userService.checkCountEmail(request.getEmail())){
            if(bindingResult.hasErrors()) {
                return ResponseEntity.badRequest().body(bindingResult.getFieldError().getDefaultMessage());
            }else {
                return ResponseEntity.ok(forgotPassword.isCheckCodeEmailAndSave(request,emailCode));
            }
        }
        else {
            return ResponseEntity.status(403).body("email này không đúng");
        }
    }
    @PostMapping("/renderCode/{email}")
    public void renderCode(@PathVariable("email") String email){
        if(!userService.checkCountEmail(email)){
            forgotPassword.renderCodeEmail(email);
        }
    }
}
