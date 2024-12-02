package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class capacity_service {

    @Autowired
    private User_repository user_repo;

    // R1. Relación Cuota/Ingreso
    public boolean checkIncomeRatio(long userId, double monthlyPayment, double income) {
        double ratio = monthlyPayment / income;
        return ratio <= 0.35; // Aprobado si es <= 35%
    }

    // R2. Historial Crediticio del Cliente
    public boolean checkCreditHistory(Boolean evaluation) {
        if (evaluation){
            return true;// Simulación simplificada para historial crediticio
        }
        return false;
    }

    // R3. Antigüedad Laboral y Estabilidad
    public boolean checkJobStability(User_entity user) {
        return user.getWork_seniority() >= 1; // Aprobado si tiene al menos 1 año de antigüedad en su empleo actual
    }

    // R4. Relación Deuda/Ingreso
    public boolean checkDebtIncomeRatio(double totalDebt, double income) {
        double ratio = totalDebt / income;
        return ratio <= 0.5; // Aprobado si es <= 50%
    }

    // R5. Monto Máximo de Financiamiento
    public boolean checkFinancingLimit(double propertyValue, double loanAmount, int propertyType) {
        double maxFinancingRatio = (propertyType == 1) ? 0.8 : 0.7; // 80% para primera vivienda, 70% para otras
        return loanAmount <= propertyValue * maxFinancingRatio;
    }

    // R6. Edad del Solicitante
    public boolean checkApplicantAge(User_entity user, int loanTerm) {
        int maxAgeAtEnd = 75;
        int applicantAgeAtEnd = user.getAge() + loanTerm;
        return applicantAgeAtEnd <= maxAgeAtEnd && loanTerm >= 5;
    }


    // R7. Capacidad de Ahorro
    // R71: Saldo Mínimo Requerido
    public boolean checkMinimumBalance(long userId, double creditAmount) {
        // Obtenemos el usuario directamente, asumiendo que findById devuelve User_entity o null
        User_entity user = user_repo.findById(userId);

        // Verificamos el balance del usuario
        return user.getBalance() >= creditAmount * 0.1;
    }


    // R72: Historial de Ahorro Consistente
    public boolean checkConsistentSavingHistory(Boolean option) {
        if (option) {
            return true;
        }
        return false;
    }

    // R73: Depósitos Periódicos
    public boolean checkPeriodicDeposits(Boolean  periodicDeposit) {
        if (periodicDeposit) {
            return true;
        }
        return false;
    }

    // R74: Relación Saldo/Años de Antigüedad
    public boolean checkSavingsBalanceAndSeniority(long userId, double creditAmount) {
        User_entity user = user_repo.findById(userId);
        double requiredBalanceRatio = (user.getAccount_seniority() < 2) ? 0.2 : 0.1;
        return user.getBalance() >= creditAmount * requiredBalanceRatio;
    }

    // R75: Retiros Recientes
    public boolean checkRecentWithdrawals(Double maxMonthlyOut, long iduser) {
        User_entity user = user_repo.findById(iduser);
            if (maxMonthlyOut > user.getBalance() * 0.3) return false;

        return true;
    }

    // Evaluación de capacidad de ahorro en función de R7.x
    public String evaluateSavingCapacity(User_entity user, double creditAmount, Boolean option, Boolean periodic, Double maxMonthlyOut) {
        int score = 0;

        if (checkMinimumBalance(user.getId(), creditAmount)) score++;
        if (checkConsistentSavingHistory(option)) score++;
        if (checkPeriodicDeposits(periodic)) score++;
        if (checkSavingsBalanceAndSeniority(user.getId(), creditAmount)) score++;
        if (checkRecentWithdrawals(maxMonthlyOut, user.getId())) score++;

        if (score == 5) return "Sólida";
        else if (score >= 3) return "Moderada";
        else return "Insuficiente";
    }

    public List<String> evaluateCreditApplication(long userId, double monthlyPayment, double income, double totalDebt, double propertyValue, double loanAmount, int propertyType, int loanTerm,Boolean historial_credit) {
        User_entity user = user_repo.findById(userId);
        List<String> evaluationMessages = new ArrayList<>();

        // Verificación de relación cuota/ingreso
        if (checkIncomeRatio(userId, monthlyPayment, income)) {
            evaluationMessages.add("Relación cuota/ingreso: Aprobado");
        } else {
            evaluationMessages.add("Relación cuota/ingreso: Fallo");
        }

        // Verificación de historial crediticio
        if (checkCreditHistory(historial_credit)) {
            evaluationMessages.add("Historial crediticio: Aprobado");
        } else {
            evaluationMessages.add("Historial crediticio: Fallo");
        }

        // Verificación de estabilidad laboral
        if (checkJobStability(user)) {
            evaluationMessages.add("Estabilidad laboral: Aprobado");
        } else {
            evaluationMessages.add("Estabilidad laboral: Fallo");
        }

        // Verificación de relación deuda/ingreso
        if (checkDebtIncomeRatio(totalDebt, income)) {
            evaluationMessages.add("Relación deuda/ingreso: Aprobado");
        } else {
            evaluationMessages.add("Relación deuda/ingreso: Fallo");
        }

        // Verificación de límite de financiamiento
        if (checkFinancingLimit(propertyValue, loanAmount, propertyType)) {
            evaluationMessages.add("Límite de financiamiento: Aprobado");
        } else {
            evaluationMessages.add("Límite de financiamiento: Fallo");
        }

        // Verificación de edad del solicitante
        if (checkApplicantAge(user, loanTerm)) {
            evaluationMessages.add("Edad del solicitante: Aprobado");
        } else {
            evaluationMessages.add("Edad del solicitante: Fallo");
        }

        return evaluationMessages;
    }

}
