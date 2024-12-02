import axios from "axios";

const payrollBackendServer = import.meta.env.VITE_PAYROLL_BACKEND_SERVER;
const payrollBackendPort = import.meta.env.VITE_PAYROLL_BACKEND_PORT;

console.log(payrollBackendServer)
console.log(payrollBackendPort)

export default axios.create({
    baseURL: `http://${payrollBackendServer}:${payrollBackendPort}`,
    headers: {
        'Content-Type': 'application/json'
    }

});

export const axiosPost = axios.post({
    baseURL: `http://${payrollBackendServer}:${payrollBackendPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const axiosGet = axios.get({
    baseURL: `http://${payrollBackendServer}:${payrollBackendPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
});