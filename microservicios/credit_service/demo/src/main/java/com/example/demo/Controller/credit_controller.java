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
                credit.getTime(),credit.getDiner()
                , LocalDate.now());
    }

    @PostMapping("/create/type2")
    public Credit_entity credit_type2(@RequestBody Credit_entity credit) {
        return credit_service.create_credit_type_2(credit.getIduser(),credit.getInterest(),credit.getTime(),credit.getDiner(),credit.getDate());
    }

    @PostMapping("/create/type3")
    public Credit_entity credit_type3(@RequestBody Credit_entity credit) {
        return credit_service.create_credit_type_3(credit.getIduser(),credit.getInterest(),credit.getTime(),credit.getDiner(),credit.getDate());
    }

    @PostMapping("/create/type4")
    public Credit_entity credit_type4(@RequestBody Credit_entity credit) {
        return credit_service.create_credit_type_4(credit.getIduser(),credit.getInterest(),credit.getTime(),credit.getDiner(),credit.getDate());
    }

    @GetMapping("/getcredit")
    public List<Credit_entity>get_credit_by_id_user(@RequestParam Long iduser){
        return credit_service.getbyid_user(iduser);

    }

    @GetMapping("/getcreditid")
    public Optional<Credit_entity> get_credit_by_id(@RequestParam Long id){
        return credit_service.getbyid(id);

    }

    @PostMapping("/simulation/{amount}/{interest}/{years}")
    public double simulation_credit(@PathVariable double amount, @PathVariable double interest, @PathVariable int years){
        double result = credit_service.simulation_credit_amount(amount, interest, years);
        return result;
    }
    @GetMapping("/getall")
    public List<Credit_entity>getall(){
        return credit_service.getall();
    }

    @PostMapping("/update/{idcredit}/{state}")
    public int update(@PathVariable Long idcredit,@PathVariable int state){
        return credit_service.updateState(idcredit,state);
    }

    @GetMapping("/costmonth/{requesamount}/{interest}/{years}")
    public double Costmonth(@PathVariable long requesamount,@PathVariable double interest,@PathVariable int years){
        return credit_service.finalCostMonth(requesamount,interest,years);
    }
    @GetMapping("/finalcost/{monthamount}/{years}/{requestedamount}")
    public double finalCost(@PathVariable double monthamount, @PathVariable int years, @PathVariable long requestedamount){
        return credit_service.CostTotal(monthamount,years,requestedamount);
    }


}
