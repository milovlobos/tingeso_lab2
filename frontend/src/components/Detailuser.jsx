import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"; // Importación de FormControl, InputLabel, Select y MenuItem
import creditService from "../services/credit.service";
import userService from "../services/user.service";
import totalcostService from "../services/totalcost.service";
import stateService from "../services/state.service";


const Detail = () => {
  const [credit, setCredit] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [selectedPhase, setSelectedPhase] = useState(2);
  const [monthlyCost, setMonthlyCost] = useState(null);
  const [finalCost, setFinalCost] = useState(null);
  const [creditState, setCreditState] = useState(null);

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
  
    creditService
      .getCreditbyid(idcredit)
      .then((response) => {
        console.log("Credit data:", response.data);
        setCredit(response.data);
  
        const iduser = Number(response.data.iduser);
  
        // Obtener estado del crédito en paralelo con datos de usuario
        return Promise.all([userService.get(iduser), stateService.getCreditbyid(idcredit)]);
      })
      .then(([userResponse, stateResponse]) => {
        console.log("User data:", userResponse.data);
        setUser(userResponse.data);
  
        console.log("State data:", stateResponse.data);
        setCreditState(stateResponse.data); // Guarda el estado del crédito
      })
      .catch((err) => {
        console.error("Error al cargar los detalles del crédito, usuario o estado:", err);
        setError("Error al cargar los detalles del crédito, usuario o estado.");
      });
  }, []);
  
   // Calcular los costos mensuales y finales al cargar los datos del crédito
   useEffect(() => {
    if (credit) {
      totalcostService.getMonthlyCost(credit.diner, credit.interest, credit.time)
        .then((response) => {
          const monthlyCostValue = response.data;
          setMonthlyCost(monthlyCostValue);
          return totalcostService.getFinalCost(monthlyCostValue, credit.time, credit.diner);
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

    stateService.updatestate(idcredit, 5)
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

    stateService.updatestate(idcredit, 7)
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
              creditState  === 1 ? 'Revisión inicial' :
              creditState  === 2 ? 'Pendiente de documentos' :
              creditState  === 3 ? 'En Evaluación' :
              creditState  === 4 ? 'Pre-aprobado' :
              creditState  === 5 ? 'Aprobación Final' :
              creditState  === 6 ? 'Aprobada' :
              creditState  === 7 ? 'Rechazada' : 
              creditState  === 8 ? 'Cancelada por el cliente' : 'Desembolso'
          }</Typography>

         {/* Mostrar los costos totales antes del botón Aceptar si el estado es Pre-aprobado */}
{creditState=== 4 && (
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
        {creditState !== 4 && (
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
