import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent, Typography, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import creditService from "../services/credit.service";
import { useNavigate } from "react-router-dom";
import stateService from "../services/state.service";

const CreditSearch = () => {
  const [credits, setCredits] = useState([]);
  const [filteredCredits, setFilteredCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creditStates, setCreditStates] = useState({});
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    id: "",
    iduser: "",
    interest: "",
    time: "",
    diner: "",
    date: "",
  });

  useEffect(() => {
    // Redirigir si el usuario no es un empleado
    const isEmployee = JSON.parse(localStorage.getItem("isEmployee"));
    if (!isEmployee) {
      alert("No tienes permiso para acceder a esta página.");
      navigate("/home"); // O la ruta que prefieras para usuarios no autorizados
    }
  }, [navigate]);
  

  useEffect(() => {
    creditService.getAll()
      .then((response) => {
        setCredits(response.data);
        setFilteredCredits(response.data);
        setLoading(false);
  
        // Obtener el estado de cada crédito
        const promises = response.data.map((credit) =>
          stateService.getCreditbyid(credit.id)
            .then((res) => ({ id: credit.id, state: res.data }))
            .catch(() => ({ id: credit.id, state: null })) // Manejo de errores
        );
  
        Promise.all(promises)
          .then((states) => {
            const stateMap = states.reduce((acc, { id, state }) => {
              acc[id] = state;
              return acc;
            }, {});
            setCreditStates(stateMap);
          });
      })
      .catch(() => {
        setError("Error al cargar las postulaciones.");
        setLoading(false);
      });
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSearch = () => {
    const filtered = credits.filter((credit) => {
      return (
        (searchParams.id === "" || credit.id === parseInt(searchParams.id)) &&
        (searchParams.iduser === "" || credit.iduser === parseInt(searchParams.iduser)) &&
        (searchParams.interest === "" || credit.interest === parseFloat(searchParams.interest)) &&
        (searchParams.time === "" || credit.time === parseInt(searchParams.time)) &&
        (searchParams.diner === "" || credit.diner === parseFloat(searchParams.diner)) &&
        (searchParams.date === "" || credit.date === searchParams.date)
      );
    });
    setFilteredCredits(filtered);
  };

  const handleReset = () => {
    setFilteredCredits(credits);
    setSearchParams({
      id: "",
      iduser: "",
      interest: "",
      time: "",
      diner: "",
      date: "",
    });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Postulaciones
      </Typography>

      <Box sx={{ marginBottom: 3 }}>
        <TextField
          name="iduser"
          label="ID Usuario"
          value={searchParams.iduser}
          onChange={handleInputChange}
          type="number"
          margin="normal"
          fullWidth
        />
        <TextField
          name="interest"
          label="Interés"
          value={searchParams.interest}
          onChange={handleInputChange}
          type="number"
          margin="normal"
          fullWidth
        />
        <TextField
          name="time"
          label="Tiempo (años)"
          value={searchParams.time}
          onChange={handleInputChange}
          type="number"
          margin="normal"
          fullWidth
        />
        <TextField
          name="diner"
          label="Monto"
          value={searchParams.diner}
          onChange={handleInputChange}
          type="number"
          margin="normal"
          fullWidth
        />
        <TextField
          name="date"
          label="Fecha"
          value={searchParams.date}
          onChange={handleInputChange}
          type="date"
          InputLabelProps={{ shrink: true }}
          margin="normal"
          fullWidth
        />

        <Button variant="contained" color="primary" onClick={handleSearch} sx={{ marginTop: 2, marginRight: 2 }}>
          Buscar
        </Button>
        <Button variant="contained" color="secondary" onClick={handleReset} sx={{ marginTop: 2 }}>
          Reiniciar
        </Button>
      </Box>

      {loading ? (
        <Typography>Cargando postulaciones...</Typography>
      ) : error ? (
        <Typography>{error}</Typography>
      ) : filteredCredits.length === 0 ? (
        <Typography>No se encontraron resultados.</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredCredits.map((credit) => (
            <Grid item xs={12} sm={6} md={4} key={credit.idcredit}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Tipo de Crédito: {credit.type === 1 ? 'Primera Vivienda' : 
                                      credit.type === 2 ? 'Segunda Vivienda' : 
                                      credit.type === 3 ? 'Propiedad Comercial' : 'Remodelación'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Monto del Crédito:</strong> {credit.diner} Pesos
                  </Typography>
                  <Typography variant="body2">
                    <strong>Interés:</strong> {credit.interest}%
                  </Typography>
                  <Typography variant="body2">
                    <strong>Plazo:</strong> {credit.time} años
                  </Typography>
                  <Typography variant="body2">
                    <strong>Fecha de Solicitud:</strong> {credit.date}
                  </Typography>
                  <Typography variant="body2">
                  <strong>Estado del Crédito:</strong>{" "}
  {creditStates[credit.id] === 1
    ? 'Revisión inicial'
    : creditStates[credit.id] === 2
    ? 'Pendiente de documentos'
    : creditStates[credit.id] === 3
    ? 'En Evaluación'
    : creditStates[credit.id] === 4
    ? 'Pre-aprobado'
    : creditStates[credit.id] === 5
    ? 'Aprobación Final'
    : creditStates[credit.id] === 6
    ? 'Aprobada'
    : creditStates[credit.id] === 7
    ? 'Rechazada'
    : creditStates[credit.id] === 8
    ? 'Cancelada por el cliente'
    : 'Desconocido'}
</Typography>

                  <Button 
                    variant="contained" 
                    color="secondary" 
                    sx={{ marginTop: 2 }} 
                    onClick={() => { 
                      if (credit.id) { 
                        localStorage.setItem('creditId', credit.id); 
                        console.log(`Credit ID saved: ${credit.id}`);
                        navigate(`/detailcredit`); 
                      } else {
                        console.error("El ID del crédito no está definido.");
                      }
                    }}
                  >
                    Evaluar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ marginTop: 3 }}>
        <Button component={Link} to="/home" variant="contained" color="primary">
          Volver a Home
        </Button>
      </Box>
    </Box>
  );
};

export default CreditSearch;
