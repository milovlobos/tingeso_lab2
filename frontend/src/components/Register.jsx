import { useState } from "react";
import { Box, TextField, Button, FormControl, Typography, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserService from '../services/user.service'; // Asegúrate de que la ruta sea correcta

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [balance, setBalance] = useState("");
  const [savingCapacity, setSavingCapacity] = useState("");
  const [age, setAge] = useState("");
  const [accountSeniority, setAccountSeniority] = useState("");
  const [phone, setPhone] = useState("");
  const [rut, setRut] = useState("");
  const [workSeniority, setWorkSeniority] = useState("");
  const [isEmployee, setIsEmployee] = useState("no"); // Estado para el tipo de usuario
  const [isIndependent, setIsIndependent] = useState("no"); // Estado para el tipo de usuario
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coinciden
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Llamar al servicio para registrar el usuario
      const response = await UserService.create({
        username,
        email,
        password,
        balance,
        saving_capacity: savingCapacity,
        age,
        account_seniority: accountSeniority,
        phone,
        rut,
        work_seniority: workSeniority,
        employee: isEmployee === "yes", // Convertir a booleano
        independent: isIndependent === "yes", // Convertir a booleano
      });

      console.log("Registro exitoso:", response.data);

      // Guardar el ID en el front-end y redirigir al usuario a la página /completeuser
      navigate("/home");
    } catch (error) {
      console.error("Error al registrar:", error);
      setError(error.response?.data?.message || "Error al registrar."); // Mostrar mensaje de error
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 5 }}
    >
      <Typography variant="h4" gutterBottom>
        Registrarse
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Nombre de usuario"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          required
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          required
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          required
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Confirmar contraseña"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          variant="outlined"
          required
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Balance"
          type="number"
          inputProps={{ min: 0 }}
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          variant="outlined"
          required
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Capacidad de Ahorro"
          type="number"
          inputProps={{ min: 0 }}
          value={savingCapacity}
          onChange={(e) => setSavingCapacity(e.target.value)}
          variant="outlined"
          required
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Edad"
          type="number"
          inputProps={{ min: 18 }}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          helperText="Debe tener almenos 18 años."
          variant="outlined"
          required
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Antigüedad de Cuenta"
          type="number"
          inputProps={{ min: 18 }}
          value={accountSeniority}
          onChange={(e) => setAccountSeniority(e.target.value)}
          variant="outlined"
          helperText="No ingrese valores negativos."
          required
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Teléfono"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          variant="outlined"
          required
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="RUT"
          type="text"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          variant="outlined"
          required
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Antigüedad Laboral"
          type="number"
          inputProps={{ min: 0}}
          value={workSeniority}
          onChange={(e) => setWorkSeniority(e.target.value)}
          helperText="Ingrese la cantidad de años trabajados, si es independiente ingrese 0. NO ingrese valores negativos."
          variant="outlined"
          required
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <Typography variant="h6">¿Es empleado?</Typography>
        <RadioGroup
          value={isEmployee}
          onChange={(e) => setIsEmployee(e.target.value)}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Sí" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <Typography variant="h6">¿Es independiente?</Typography>
        <RadioGroup
          value={isIndependent}
          onChange={(e) => setIsIndependent(e.target.value)}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Sí" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        sx={{ mb: 2 }}
      >
        Registrarse
      </Button>
    </Box>
  );
};

export default Register;
