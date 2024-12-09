import httpCredit from "../http-common";
// Crear crédito tipo 1
const createCreditType1 = (data) => {
    return httpCredit.post('/api/credit/create/type1', data);
};

// Crear crédito tipo 2
const createCreditType2 = (data) => {
    return httpCredit.post('/api/credit/create/type2', data);
};

// Crear crédito tipo 3
const createCreditType3 = (data) => {
    return httpCredit.post('/api/credit/create/type3', data);
};

// Crear crédito tipo 4
const createCreditType4 = (data) => {
    return httpCredit.post('/api/credit/create/type4', data);
};
const getCreditsByUser = (iduser) => {
    return httpCredit.get(`/api/credit/getcredit?iduser=${iduser}`);
}
const getAll = () => {
    return httpCredit.get('/api/credit/getall');
}


const simulateCredit = (amount, interest, years) => {
    // Construimos la URL con los valores de amount, interest y years
    return httpCredit.post(`/api/credit/simulation/${amount}/${interest}/${years}`);
};


const getCreditbyid = (idcredit) => {
    return httpCredit.get(`/api/credit/getcreditid?id=${idcredit}`);
}
// Obtener costo mensual del crédito
const getMonthlyCost = (requesamount, interest, years) => {
    return httpCredit.get(`/api/credit/costmonth/${requesamount}/${interest}/${years}`);
};

// Obtener costo total del crédito
const getFinalCost = (monthamount, years, requesamount) => {
    return httpCredit.get(`/api/credit/finalcost/${monthamount}/${years}/${requesamount}`);
};


// Exportar todas las funciones
export default {
    createCreditType1,
    createCreditType2,
    createCreditType3,
    createCreditType4,
    getCreditsByUser,
    simulateCredit,
    getAll,
    getCreditbyid,
    getMonthlyCost,
    getFinalCost
};
