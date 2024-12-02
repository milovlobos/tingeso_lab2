package com.example.demo.Service;


import com.example.demo.Entity.Credit_entity;
import com.example.demo.Repository.Credit_repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class Credit_service {
@Autowired
Credit_repository credit_repository;


    public List<Credit_entity> getall(){
        return credit_repository.findAll();

    }

    public List<Credit_entity> getbyid_user(Long id){
        return credit_repository.findByIduser(id);
    }
    public Optional<Credit_entity> getbyid(Long id){
        return credit_repository.findById(id);
    }

    public int updateState(long id_credit, int state_new) {
        try {
            // Buscar la entidad de crédito por ID
            Credit_entity credit = credit_repository.getCredit_entityById(id_credit);

            // Si no existe el crédito, arrojar un error 404 (Not Found)
            if (credit == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Crédito no encontrado");

            }

            // Actualizar el estado y guardar
            credit.setState(state_new);
            credit_repository.save(credit);

            return 1; // Devuelve 1 si todo fue bien

        } catch (ResponseStatusException e) {
            throw new RuntimeException(e);
        }

    }





            public Credit_entity create_credit_type_1(Long id_user, float interest, int time, int diner, LocalDate date){
        Credit_entity credit_entity = new Credit_entity();
        credit_entity.setIduser(id_user);
        credit_entity.setInterest(interest);
        credit_entity.setTime(time);
        credit_entity.setDiner(diner);
        credit_entity.setType(1);
        credit_entity.setDate(date);
        credit_entity.setState(1);
        credit_repository.save(credit_entity);
        return credit_entity;
    }
    public Credit_entity create_credit_type_2(Long id_user, float interest, int time, int diner, LocalDate date){
        Credit_entity credit_entity = new Credit_entity();
        credit_entity.setIduser(id_user);
        credit_entity.setInterest(interest);
        credit_entity.setTime(time);
        credit_entity.setDiner(diner);
        credit_entity.setType(2);
        credit_entity.setDate(date);
        credit_entity.setState(1);
        credit_repository.save(credit_entity);
        return credit_entity;
    }


    public Credit_entity create_credit_type_3(Long id_user, float interest, int time, int diner, LocalDate date){
        Credit_entity credit_entity = new Credit_entity();
        credit_entity.setIduser(id_user);
        credit_entity.setInterest(interest);
        credit_entity.setTime(time);
        credit_entity.setDiner(diner);
        credit_entity.setType(3);
        credit_entity.setDate(date);
        credit_entity.setState(1);

        credit_repository.save(credit_entity);
        return credit_entity;
    }
    public Credit_entity create_credit_type_4(Long id_user, float interest, int time, int diner, LocalDate date) {
        Credit_entity credit_entity = new Credit_entity();
        credit_entity.setIduser(id_user);
        credit_entity.setInterest(interest);
        credit_entity.setTime(time);
        credit_entity.setDiner(diner);
        credit_entity.setType(4);
        credit_entity.setDate(date);
        credit_entity.setState(1);
        credit_repository.save(credit_entity);
        return credit_entity;


    }



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
        return (month_amount + 20000 + d) * 12;
    }

    public double CostTotal(double month_amount, int years, long requested_amount){

        double a = requested_amount * 0.01;
        int months = years * 12;
        double m=month_amount*months;
        return (m*months) + a;
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
