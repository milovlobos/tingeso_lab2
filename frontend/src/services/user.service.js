import httpUser from "../http-common";

const getAll = () => {
    return httpUser.get('/api/user');
}

const create = data => {
    return httpUser.post("/api/user/register", data);
}

const get = id => {
    return httpUser.get(`/api/user/get?user_id=${id}`);
}

const update = data => {
    return httpUser.put('/api/user/update', data);

}
// Añadimos la función de login
const login = (data) => {
    return httpUser.post('/api/user/login', data); 
}
// Obtener el nombre del usuario basado en el correo
const getName = (email) => {
    return httpUser.get(`/api/user/getname?email=${email}`);
  };
  
  // Obtener el ID del usuario basado en el correo
  const getId = (email) => {
    return httpUser.get(`/api/user/getid?email=${email}`);
  };
  const getisemployee = (email) => {
    return httpUser.get(`/api/user/getisemployee?email=${email}`);
  };

export default { getAll, create, get, update,login,getName,getId,getisemployee };
