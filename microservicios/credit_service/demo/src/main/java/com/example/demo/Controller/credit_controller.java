package com.example.demo.Controller;
import com.example.demo.Entity.Credit_entity;
import com.example.demo.Service.Credit_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/credit")
public class credit_controller {
    @Autowired
    private Credit_service credit_service;

    @PostMapping("/create/type1")
    public Credit_entity credit_type1(@RequestBody Credit_entity credit) {

        return credit_service.create_credit_type_1(credit.getIduser(),
                credit.getInterest(),
                credit.getTime(), credit.getDiner()
                , LocalDate.now());
    }

    @PostMapping("/create/type2")
    public Credit_entity credit_type2(@RequestBody Credit_entity credit) {
        return credit_service.create_credit_type_2(credit.getIduser(), credit.getInterest(), credit.getTime(), credit.getDiner(), credit.getDate());
    }

    @PostMapping("/create/type3")
    public Credit_entity credit_type3(@RequestBody Credit_entity credit) {
        return credit_service.create_credit_type_3(credit.getIduser(), credit.getInterest(), credit.getTime(), credit.getDiner(), credit.getDate());
    }

    @PostMapping("/create/type4")
    public Credit_entity credit_type4(@RequestBody Credit_entity credit) {
        return credit_service.create_credit_type_4(credit.getIduser(), credit.getInterest(), credit.getTime(), credit.getDiner(), credit.getDate());
    }

    @GetMapping("/getcredit")
    public List<Credit_entity> get_credit_by_id_user(@RequestParam Long iduser) {
        return credit_service.getbyid_user(iduser);

    }

    @GetMapping("/getcreditid")
    public Optional<Credit_entity> get_credit_by_id(@RequestParam Long id) {
        return credit_service.getbyid(id);

    }


    @GetMapping("/getall")
    public List<Credit_entity> getall() {
        return credit_service.getall();
    }

}


