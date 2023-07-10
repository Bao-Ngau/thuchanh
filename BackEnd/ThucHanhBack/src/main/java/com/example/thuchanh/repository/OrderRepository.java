package com.example.thuchanh.repository;

import com.example.thuchanh.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findOrderByUserId(Long userid);
    Integer countByUserIdAndBooksId(Long userid, Long bookid);
    Order getOrderByUserIdAndBooksId(Long userid, Long bookid);
}
