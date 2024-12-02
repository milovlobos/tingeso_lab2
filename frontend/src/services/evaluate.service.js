
import httpCredit from "../http-common";


// Evaluar capacidad de ahorro
const evaluateSavingCapacity = (userId, creditAmount, consistentSaving, periodicDeposit, maxMonthlyOut) => {
    return httpCredit.get(`/api/evaluate/evaluateSavingCapacity/${userId}/${creditAmount}/${consistentSaving}/${periodicDeposit}/${maxMonthlyOut}`, {
        
    });
};

// Evaluar solicitud de crédito
const evaluateCreditApplication = (userId, monthlyPayment, income, totalDebt, propertyValue, loanAmount, propertyType, loanTerm,credit_history) => {
    return httpCredit.get(`/api/evaluate/evaluateCreditApplication/${userId}/${monthlyPayment}/${income}/${totalDebt}/${propertyValue}/${loanAmount}/${propertyType}/${loanTerm}/${credit_history}`, {
       
    });
};


// Exportar las funciones para usarlas en el componente React
export default {
    
    evaluateSavingCapacity,
    evaluateCreditApplication
};
