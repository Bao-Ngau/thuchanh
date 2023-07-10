package com.example.thuchanh.config;

import com.example.thuchanh.entity.ERole;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@EnableWebMvc
@RequiredArgsConstructor
public class SecurityConfiguration implements WebMvcConfigurer {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers("/role/**").permitAll()
                        .requestMatchers("/user/**").hasAnyAuthority(ERole.ADMIN.name(),ERole.SUPER_ADMIN.name())
                        .requestMatchers("/category/get").permitAll()
                        .requestMatchers("/category/add/**","/category/update/**","/category/delete/**","/category/search/**","/category/{page}/{size}").hasAnyAuthority(ERole.ADMIN.name(),ERole.SUPER_ADMIN.name())
                        .requestMatchers("/author/get").permitAll()
                        .requestMatchers("/author/{page}/{size}","/author/add/**","/author/update/**","/author/delete/**","/author/search/**").hasAnyAuthority(ERole.ADMIN.name(),ERole.SUPER_ADMIN.name())
                        .requestMatchers("/book/{page}/{size}","/book/getbyid/{id}").permitAll()
                        .requestMatchers("/book/add/**","/book/update/**","/book/delete/**","/book/search/**","/book/upload","/book/updateimg","/book/deleteimg").hasAnyAuthority(ERole.ADMIN.name(),ERole.SUPER_ADMIN.name())
                        .requestMatchers("/order/**").permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(sess->sess
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
      return http.build();
    }
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
    }

}
