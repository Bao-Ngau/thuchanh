package com.example.thuchanh.service;

import com.example.thuchanh.entity.Order;

import java.util.List;

public interface IOrderService {
    Order addOrder(Long bookId,String username);
    List<Order> getOrdersByUserId(String username);
    Order  updateOrderCountById(Long orderid, String downOrUp);
    boolean isCheckOrderByUserIdAndBookId(Long userid,Long bookid);
    void deleteOrder(Long id);
}
