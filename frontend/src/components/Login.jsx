import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user.service"; // Asegúrate de importar tu servicio
import globalVars from "../services/globalVars"; // Archivo para guardar las variables globales
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar el login
      const loginResponse = await userService.login({ email, password });

      if (loginResponse.data === 1) {
        // Login exitoso, ahora obtenemos el nombre y el ID
        const nameResponse = await userService.getName(email);
        const idResponse = await userService.getId(email);
        const isEmployeeResponse = await userService.getisemployee(email);

        const username = nameResponse.data;
        const userId = idResponse.data;
        const isEmployee = isEmployeeResponse.data;

        // Guarda los valores en variables globales
        globalVars.username = username;
        globalVars.userId = userId;
        globalVars.isEmployee = isEmployee;

        // Opcional: también los puedes guardar en localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("userId", userId);
        localStorage.setItem("isEmployee", isEmployee);


        // Redirigir al usuario
        console.log("Login exitoso:", loginResponse.data);
        navigate("/home");
        window.location.reload()
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error al iniciar sesión. Verifica tu correo y contraseña.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electrónico"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />
      {error && <p>{error}</p>}
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;