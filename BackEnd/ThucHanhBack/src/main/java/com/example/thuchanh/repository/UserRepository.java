package com.example.thuchanh.repository;

import com.example.thuchanh.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Page<User> findAll(Pageable pageable);
    Optional<User> findByUsername(String username);
    @Modifying
    @Transactional
    @Query("update User tb set  tb.rftoken = :rftoken where tb.id = :id")
    void updateRfToken(@Param("id") Long id,@Param("rftoken") String rfToken);
    @Modifying
    @Transactional
    @Query("update User tb set tb.status = 0 where tb.username = :username")
    void updateStatus(@Param("username") String username);
}
