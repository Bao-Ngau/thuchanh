package com.example.thuchanh.controller;

import com.example.thuchanh.entity.Order;
import com.example.thuchanh.service.impl.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @GetMapping("/getByUserId/{username}")
    public List<Order> getOrdersByUser(@PathVariable("username") String username) {
        return orderService.getOrdersByUserId(username);
    }
    @PostMapping("/add/{username}/{bookid}")
    public ResponseEntity<?> addOrder(@PathVariable("username") String username,@PathVariable("bookid") Long bookid){
       return ResponseEntity.ok(orderService.addOrder(bookid,username));
    }
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") Long id){
        orderService.deleteOrder(id);
    }
    @PutMapping("/update/{orderid}/{downOrUp}")
    public ResponseEntity<?> updateOrderCount(@PathVariable("orderid") Long orderid,@PathVariable("downOrUp") String downOrUp){
        return ResponseEntity.ok(orderService.updateOrderCountById(orderid,downOrUp));
    }
//    @GetMapping("/check/{userid}/{bookid}")
//    public ResponseEntity<?> getCheck(@PathVariable("userid") Long userid, @PathVariable("bookid") Long bookid){
//        return ResponseEntity.ok(orderService.isCheckOrderByUserIdAndBookId(userid,bookid));
//    }
}
