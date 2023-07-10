package com.example.thuchanh.service.impl;


import com.example.thuchanh.entity.Book;
import com.example.thuchanh.entity.Order;
import com.example.thuchanh.entity.User;
import com.example.thuchanh.repository.BookRepository;
import com.example.thuchanh.repository.OrderRepository;
import com.example.thuchanh.repository.UserRepository;
import com.example.thuchanh.service.IOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService {
    private final OrderRepository orderRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    @Transactional
    @Override
    public Order addOrder(Long bookId, String username) {
        Optional<User> user = userRepository.findByUsername(username);
        Book book = bookRepository.findById(bookId).get();
        var newOrder = Order.builder()
                .count(1)
                .user(user.get())
                .addcart(1)
                .pay(0)
                .books(book)
                .createddate(new Date())
                .createdby(username)
                .build();
        if(isCheckOrderByUserIdAndBookId(user.get().getId(),book.getId())){
            Long orderId = orderRepository.getOrderByUserIdAndBooksId(user.get().getId(),book.getId()).getId();
            return updateOrderCountById(orderId,"up");
        }
        return orderRepository.save(newOrder);
    }
    public List<Order> getOrdersByUserId(String username) {
        return orderRepository.findOrderByUserId(userRepository.findByUsername(username).get().getId());
    }

    @Override
    public Order updateOrderCountById(Long orderid, String downOrUp) {
        Optional<Order> order = orderRepository.findById(orderid);
        var newOder = order.get();
        if (order.isPresent()){
            if (downOrUp.equals("down")) {
                newOder.setCount(newOder.getCount() - 1);
            }else if (downOrUp.equals("up")){
                newOder.setCount(newOder.getCount() + 1);
            }
        }
         return orderRepository.save(newOder);
    }

    @Override
    public boolean isCheckOrderByUserIdAndBookId(Long userid, Long bookid) {
        if(orderRepository.countByUserIdAndBooksId(userid,bookid) >= 1){
            return true;
        }
        return false;
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

}
