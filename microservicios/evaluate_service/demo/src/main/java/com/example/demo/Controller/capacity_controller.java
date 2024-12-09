package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/evaluate")
public class capacity_controller {
    @Autowired
    private com.example.demo.Service.capacity_service capacity_service;

    // controladores de los datos numericos

    @GetMapping("/evaluateSavingCapacity/{userId}/{creditAmount}/{consistentSaving}/{periodicDeposit}/{maxMonthlyOut}")
    public String evaluateSavingCapacity(
            @PathVariable long userId,
            @PathVariable double creditAmount,
            @PathVariable Boolean consistentSaving,  // Indica si cumple con historial de ahorro consistente
            @PathVariable Boolean periodicDeposit,  // Indica si realiza depósitos periódicos
            @PathVariable Double maxMonthlyOut) {  // Máximo retiro mensual permitido


            return capacity_service.evaluateSavingCapacity(userId, creditAmount, consistentSaving, periodicDeposit, maxMonthlyOut);
    }

    // Endpoint para evaluar la solicitud de crédito
    @GetMapping("/evaluateCreditApplication/{userId}/{monthlyPayment}/{income}/{totalDebt}/{propertyValue}/{loanAmount}/{propertyType}/{loanTerm}/{credit_history}")
    public List<String> evaluateCreditApplication(
            @PathVariable long userId,
            @PathVariable double monthlyPayment,
            @PathVariable double income,
            @PathVariable double totalDebt,
            @PathVariable double propertyValue,
            @PathVariable double loanAmount,
            @PathVariable int propertyType,
            @PathVariable int loanTerm,
            @PathVariable boolean credit_history) {

        return capacity_service.evaluateCreditApplication(
                userId,
                monthlyPayment,
                income,
                totalDebt,
                propertyValue,
                loanAmount,
                propertyType,
                loanTerm,
                credit_history
        );
    }



}
