import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Card, CardContent } from "@mui/material";
import creditService from "../services/credit.service";
import userService from "../services/user.service";

const Detail = () => {
  const [credit, setCredit] = useState(null);
  const [user, setUser] = useState(null); 
  const [error, setError] = useState(null);
  const [selectedPhase, setSelectedPhase] = useState(2);
  const [monthlyCost, setMonthlyCost] = useState(null);
  const [finalCost, setFinalCost] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("creditId");
    if (!id) {
      setError("ID de crédito no encontrado en localStorage.");
      return;
    }

    const idcredit = parseInt(id, 10);
    if (isNaN(idcredit)) {
      setError("ID de crédito inválido.");
      return;
    }

    creditService.getCreditbyid(idcredit)
      .then((response) => {
        console.log("Credit data:", response.data); 
        setCredit(response.data);

        const iduser = Number(response.data.iduser);
        return userService.get(iduser);
      })
      .then((userResponse) => {
        console.log("User data:", userResponse.data); 
        setUser(userResponse.data);
      })
      .catch((err) => {
        console.error("Error al cargar los detalles del crédito o del usuario:", err);
        setError("Error al cargar los detalles del crédito o del usuario.");
      });
  }, []);
   // Calcular los costos mensuales y finales al cargar los datos del crédito
   useEffect(() => {
    if (credit) {
      creditService.getMonthlyCost(credit.diner, credit.interest, credit.time)
        .then((response) => {
          const monthlyCostValue = response.data;
          setMonthlyCost(monthlyCostValue);
          return creditService.getFinalCost(monthlyCostValue, credit.time, credit.diner);
        })
        .then((response) => setFinalCost(response.data))
        .catch((err) => console.error("Error al calcular los costos:", err));
    }
  }, [credit]);


  const handleAdvancePhase = () => {
    const idcredit = parseInt(localStorage.getItem("creditId"), 10);

    if (!idcredit || isNaN(idcredit)) {
      setError("ID de crédito inválido.");
      return;
    }

    creditService.updatestate(idcredit, 5)
      .then(() => {
        alert("El crédito ha pasado a la siguiente fase.");
        window.location.reload();
      })
      .catch(() => setError("Error al avanzar de fase."));
  };

  const handleReject = () => {
    const idcredit = parseInt(localStorage.getItem("creditId"), 10);

    if (!idcredit || isNaN(idcredit)) {
      setError("ID de crédito inválido.");
      return;
    }

    creditService.updatestate(idcredit, 7)
      .then(() => {
        alert("El crédito ha sido rechazado.");
        window.location.reload();
      })
      .catch(() => setError("Error al rechazar el crédito."));
  };

  if (!credit) {
    return <Typography>{error || "Cargando detalles del crédito..."}</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Evaluar Solicitud de Crédito
      </Typography>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6">
            Tipo de Crédito: {
              credit.type === 1 ? 'Primera Vivienda' : 
              credit.type === 2 ? 'Segunda Vivienda' : 
              credit.type === 3 ? 'Propiedad Comercial' : 'Remodelación'
            }
          </Typography>
          <Typography><strong>Monto del Crédito:</strong> {credit.diner} Pesos</Typography>
          <Typography><strong>Interés:</strong> {credit.interest}%</Typography>
          <Typography><strong>Plazo:</strong> {credit.time} años</Typography>
          <Typography><strong>Fecha de Solicitud:</strong> {credit.date}</Typography>
          <Typography><strong>Estado:</strong> {
              credit.state === 1 ? 'Revisión inicial' :
              credit.state === 2 ? 'Pendiente de documentos' :
              credit.state === 3 ? 'En Evaluación' :
              credit.state === 4 ? 'Pre-aprobado' :
              credit.state === 5 ? 'Aprobación Final' :
              credit.state === 6 ? 'Aprobada' :
              credit.state === 7 ? 'Rechazada' : 
              credit.state === 8 ? 'Cancelada por el cliente' : 'Desembolso'
          }</Typography>

         {/* Mostrar los costos totales antes del botón Aceptar si el estado es Pre-aprobado */}
{credit.state === 4 && (
  <Box sx={{ marginTop: 2 }}>
    <Typography variant="body2">
      <strong>Costos Totales:</strong>
      <ul>
        {monthlyCost !== null && <li>Costo Mensual: {monthlyCost} Pesos</li>}
        {finalCost !== null && <li>Costo Total: {finalCost} Pesos</li>}
      </ul>
    </Typography>
  </Box>
)}

        </CardContent>
      </Card>

      <Box sx={{ marginTop: 3 }}>
        {/* Muestra el selector de fase solo si el estado no es Pre-aprobado */}
        {credit.state !== 4 && (
          <FormControl sx={{ minWidth: 120, marginBottom: 2 }}>
            <InputLabel>Fase</InputLabel>
            <Select
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value)}
              label="Fase"
              sx={{
                backgroundColor: "white",
                color: "black",
                "& .MuiSelect-select": {
                  color: "black",
                },
              }}
            >
              <MenuItem value={2}>Pendiente de documentos</MenuItem>
              <MenuItem value={3}>En Evaluación</MenuItem>
              <MenuItem value={4}>Pre-aprobado</MenuItem>
              <MenuItem value={6}>Aprobada</MenuItem>
            </Select>
          </FormControl>
        )}

        <Button variant="contained" color="primary" onClick={handleAdvancePhase} sx={{ marginRight: 2 }}>
          Aceptar
        </Button>
        
      </Box>
    </Box>
  );
};

export default Detail;
