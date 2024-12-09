import httpCredit from "../http-common";



const updatestate = (idcredit,state) => {
    return httpCredit.post(`/api/state/update/${idcredit}/${state}`);
};

const getCreditbyid = (idcredit) => {
    return httpCredit.get(`/api/state/getstate/${idcredit}`);
}
// Exportar todas las funciones
export default {
    
    updatestate,
    getCreditbyid,
};
