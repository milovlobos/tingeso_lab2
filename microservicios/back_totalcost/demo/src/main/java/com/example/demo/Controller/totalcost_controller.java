package com.example.demo.Controller;
import com.example.demo.Service.totalcost_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/api/totalcost")
public class totalcost_controller {
    @Autowired
    private totalcost_service totalcost_service;

    @PostMapping("/simulation/{amount}/{interest}/{years}")
    public double simulation_credit(@PathVariable double amount, @PathVariable double interest, @PathVariable int years){
        double result = totalcost_service.simulation_credit_amount(amount, interest, years);
        return result;
    }


    @GetMapping("/costmonth/{requesamount}/{interest}/{years}")
    public double Costmonth(@PathVariable long requesamount,@PathVariable double interest,@PathVariable int years){
        return totalcost_service.finalCostMonth(requesamount,interest,years);
    }
    @GetMapping("/finalcost/{monthamount}/{years}/{requestedamount}")
    public double finalCost(@PathVariable double monthamount, @PathVariable int years, @PathVariable long requestedamount){
        return totalcost_service.CostTotal(monthamount,years,requestedamount);
    }


}
