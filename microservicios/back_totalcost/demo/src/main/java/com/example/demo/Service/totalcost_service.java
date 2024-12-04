package com.example.demo.Service;


import com.example.demo.Entity.totalcost_entity;
import com.example.demo.Repository.totalcost_repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class totalcost_service {
@Autowired
totalcost_repository totalcost_repository;

    // calculos

    public double simulation_credit_amount(double Amount,double interest,int years){

        double convertedInterest = (interest/12)/100;
        double powerPeriod = Math.pow((1+convertedInterest),years*12);
        return Amount * ( (convertedInterest*powerPeriod) / (powerPeriod-1) );
    }

    public int relationCI(double monthAmount,double monthEntry){
        double p = monthAmount/monthEntry;
        if(p > 0.35){
            return 0;
        } else {
            return 1;
        }
    }

    public double maxFinancing(int credit_Type,double property_Amount){
        if(credit_Type == 1){
            return property_Amount *0.8;
        } else if (credit_Type == 2) {
            return property_Amount *0.7;
        } else if (credit_Type == 3) {
            return property_Amount *0.6;
        } else {
            return property_Amount *0.5;
        }
    }

    public double finalCostMonth(long requested_amount,double interest,int years){

        double d = requested_amount * 0.0003;

        double month_amount = simulation_credit_amount(requested_amount,interest,years);
        double finalcoshtm= (month_amount + 20000 + d) * 12;
        totalcost_entity totalcostEntity = new totalcost_entity();
        totalcostEntity.setCosthmont(finalcoshtm);
        totalcost_repository.save(totalcostEntity);
        return finalcoshtm;
    }

    public double CostTotal(double month_amount, int years, long requested_amount){

        double a = requested_amount * 0.01;
        int months = years * 12;
        double m=month_amount*months;
        double total = (m*months) + a;
        totalcost_entity totalcostEntity = new totalcost_entity();
        totalcostEntity.setTotalcost(total);
        totalcost_repository.save(totalcostEntity);
        return total;
    }

    //debts_a es aquella que ya tiene integrada la cuota proyectada mensual
    public int relationDI(double mont_amount,double debts_monthly_amount,double credit_mont_amount){
        if((mont_amount*0.5) > (debts_monthly_amount + credit_mont_amount)){
            return 0;
        } else {
            return 1;
        }
    }




}
