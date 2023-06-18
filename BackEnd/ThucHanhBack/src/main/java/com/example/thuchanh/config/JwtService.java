package com.example.thuchanh.config;

import com.example.thuchanh.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {

    @Value("${jwt.secret_key}")
    private String SECRET_KEY;

    @Value("${jwt.expired_time}")
    private Long EXPIRED_TIME;
    @Value("${jwt.expired_time_refresh}")
    private Long EXPIRED_TIME_REFRESH;
    private final HttpServletRequest request;

    public String extractUsername(String token) {
        return extractClaim(token,Claims::getSubject);
    }
    public <T> T extractClaim(String token, Function<Claims,T> claimsTFunction){
        final Claims claims = extractAllClaims(token);
        return claimsTFunction.apply(claims);
    }
    public String getIpAddress(){
        return request.getRemoteAddr();
    }
    public String generateToken(UserDetails userDetails){
        User user = (User) userDetails;
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("fullName",user.getFullname());
        extraClaims.put("role",user.getRole().name());
        extraClaims.put("ip",getIpAddress());
        return generateToken(extraClaims,userDetails);
    }
    public String generateToken(Map<String,Object> extraClaims, UserDetails userDetails){
        Date now = new Date();
        Date ex = new Date(now.getTime() + EXPIRED_TIME*1000);
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(now)
                .setExpiration(ex)
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    public String generateToken(String username, String fullname, String role){
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("fullName",fullname);
        extraClaims.put("role",role);
        extraClaims.put("ip",getIpAddress());
        return generateToken(extraClaims,username);
    }
    public String generateToken(Map<String,Object> extraClaims,String username){
        Date now = new Date();
        Date ex = new Date(now.getTime() + EXPIRED_TIME*1000);
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(ex)
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String refreshToken(UserDetails userDetails){
        User user = (User) userDetails;
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("fullName",user.getFullname());
        extraClaims.put("role",user.getRole().name());
        extraClaims.put("ip",getIpAddress());
        return refreshToken(extraClaims,userDetails);
    }
    public String refreshToken(Map<String,Object> extraClaims, UserDetails userDetails){
        Date now = new Date();
        Date ex = new Date(now.getTime() + EXPIRED_TIME_REFRESH*1000);
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(now)
                .setExpiration(ex)
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }
        public boolean isTokenValid(String token, UserDetails userDetails){
            final String username = extractUsername(token);
            return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
        }
        private boolean isTokenExpired(String token) {
            Date expiration = extractExpiration(token);
            return expiration != null && expiration.before(new Date());
        }

        private Date extractExpiration(String token) {
            Claims claims = extractAllClaims(token);
            return claims.getExpiration();
        }

        public Claims extractAllClaims(String token){
            return Jwts
                    .parserBuilder()
                    .setSigningKey(getSignKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        }
    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
