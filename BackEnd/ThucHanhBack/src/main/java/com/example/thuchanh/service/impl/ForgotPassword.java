package com.example.thuchanh.service.impl;

import com.example.thuchanh.auth.RegisterRequest;
import com.example.thuchanh.entity.User;
import com.example.thuchanh.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ForgotPassword {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender javaMailSender;
    @Value("${send.mail.from}")
    private String setFrom;
    @Transactional
    public User saveCode(String email){
        Optional<User> user = userRepository.findByEmail(email);
        User newUser = user.get();
        if(user.isPresent()) {
                newUser.setCodeemail(passwordEncoder.encode(sendEmail(email)));
        }
        return userRepository.save(newUser);
    }

    private String sendEmail(String emailTo){
        String randomCode = String.valueOf((int)(Math.random()*((999999-100000)+100000)));
        MimeMessage message = javaMailSender.createMimeMessage();
        String text = "<div style='text-align:center'>";
        text += "<h1 style='color:red'> Mã code của bạn là:</h1>";
        text += "<h3 style='letter-spacing: 5px'>"+randomCode+"</h3>";
        text += "</div>";
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message,true);
            helper.setTo(emailTo);
            helper.setFrom(setFrom);
            helper.setSubject("Code để quên mật khẩu");
            helper.setText(text,true);
            javaMailSender.send(helper.getMimeMessage());
        } catch (MessagingException e) {
            System.out.println("Gửi thất bại");
        }
        return randomCode;
    }
    @Transactional
    public void renderCodeEmail(String email){
        Optional<User> user = userRepository.findByEmail(email);
        String randomCode = String.valueOf((int)(Math.random()*((999999-100000)+100000)));
        User newUser = user.get();
        if(user.isPresent()) {
            newUser.setCodeemail(passwordEncoder.encode(randomCode));
            userRepository.save(newUser);
            System.out.println("Render code success");
        }
    }
    @Transactional
    public String isCheckCodeEmailAndSave(RegisterRequest request,String emailCode){
        Optional<User> user = userRepository.findByEmail(request.getEmail());
        User newUser = user.get();
        if(user.isPresent()){
            newUser.setPassword(passwordEncoder.encode(request.getPassword()));
            if (passwordEncoder.matches(emailCode,newUser.getCodeemail())){
                userRepository.save(newUser);
            }else {
                return "Đổi mật khẩu thất bại, mã code nhập không đúng";
            }
        }
        return "Đổi mật khẩu thành công";
    }
}
