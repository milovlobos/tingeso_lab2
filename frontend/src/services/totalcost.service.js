import httpCredit from "../http-common";



const simulateCredit = (amount, interest, years) => {
    // Construimos la URL con los valores de amount, interest y years
    return httpCredit.post(`/api/totalcost/simulation/${amount}/${interest}/${years}`);
};


// Obtener costo mensual del crédito
const getMonthlyCost = (requesamount, interest, years) => {
    return httpCredit.get(`/api/totalcost/costmonth/${requesamount}/${interest}/${years}`);
};

// Obtener costo total del crédito
const getFinalCost = (monthamount, years, requesamount) => {
    return httpCredit.get(`/api/totalcost/finalcost/${monthamount}/${years}/${requesamount}`);
};


// Exportar todas las funciones
export default {
    
    simulateCredit,
    getMonthlyCost,
    getFinalCost
};
