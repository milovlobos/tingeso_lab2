import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Card, CardContent, Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material";
import creditService from "../services/credit.service";
import userService from "../services/user.service";
import evaluateService from "../services/evaluate.service";
import stateservice from "../services/state.service";
import totalcostService from "../services/totalcost.service";
import fileService from "../services/file.service"; // Importar el servicio de archivos

const EvaluateCredit = () => {
  const [credit, setCredit] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [selectedPhase, setSelectedPhase] = useState(2);
  const [monthlyCost, setMonthlyCost] = useState(null);
  const [finalCost, setFinalCost] = useState(null);
  const [propertyValue, setPropertyValue] = useState(0);
  const [consistentSaving, setConsistentSaving] = useState(false);
  const [periodicDeposit, setPeriodicDeposit] = useState(false);
  const [maxMonthlyOut, setMaxMonthlyOut] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);
  const [savingEvaluation, setSavingEvaluation] = useState("");
  const [creditEvaluationScore, setCreditEvaluationScore] = useState(null);
  const [documents, setDocuments] = useState([]); // Estado para documentos
  const [creditHistory, setCreditHistory] = useState(false); // Estado para credit_history
  const [creditState, setCreditState] = useState(null);
  const navigate = useNavigate();

  // Almacenar idcredit una vez al inicio
  const idcredit = parseInt(localStorage.getItem("creditId"), 10);

  // Validar el ID al inicio
  useEffect(() => {
    if (!idcredit || isNaN(idcredit)) {
      setError("ID de crédito inválido o no encontrado en localStorage.");
    }
  }, [idcredit]);

  // Cargar datos principales del crédito, usuario y estado
  useEffect(() => {
    if (!idcredit || isNaN(idcredit)) return;

    creditService.getCreditbyid(idcredit)
      .then((response) => {
        setCredit(response.data);
        return Promise.all([
          userService.get(response.data.iduser),
          stateservice.getCreditbyid(idcredit),
        ]);
      })
      .then(([userResponse, stateResponse]) => {
        setUser(userResponse.data);
        setCreditState(stateResponse.data);
      })
      .catch((err) => {
        console.error("Error al cargar los detalles del crédito, usuario o estado:", err);
        setError("Error al cargar los detalles del crédito, usuario o estado.");
      });

    // Obtener documentos
    fileService.getFilesByCreditId(idcredit)
      .then((response) => setDocuments(response.data))
      .catch((err) => console.error("Error al cargar los documentos:", err));
  }, [idcredit]);

  // Calcular costos del crédito
  useEffect(() => {
    if (!credit) return;

    totalcostService.getMonthlyCost(credit.diner, credit.interest, credit.time)
      .then((response) => {
        setMonthlyCost(response.data);
        return totalcostService.getFinalCost(response.data, credit.time, credit.diner);
      })
      .then((response) => setFinalCost(response.data))
      .catch((err) => console.error("Error al calcular los costos:", err));
  }, [credit]);

  const handleAdvancePhase = () => {
    if (!idcredit || isNaN(idcredit)) {
      setError("ID de crédito inválido.");
      return;
    }

    stateservice.updatestate(idcredit, selectedPhase)
      .then(() => {
        alert("El crédito ha pasado a la siguiente fase.");
        window.location.reload();
      })
      .catch(() => setError("Error al avanzar de fase."));
  };

  const handleReject = () => {
    if (!idcredit || isNaN(idcredit)) {
      setError("ID de crédito inválido.");
      return;
    }

    stateservice.updatestate(idcredit, 7)
      .then(() => {
        alert("El crédito ha sido rechazado.");
        window.location.reload();
      })
      .catch(() => setError("Error al rechazar el crédito."));
  };

  const handleSavingEvaluation = () => {
    if (user && credit) {
      evaluateService.evaluateSavingCapacity(
        user.id,
        credit.diner,
        consistentSaving,
        periodicDeposit,
        maxMonthlyOut
      )
        .then((response) => setSavingEvaluation(response.data))
        .catch((err) => console.error("Error al evaluar capacidad de ahorro:", err));
    }
  };

  const handleCreditEvaluation = () => {
    if (user && credit) {
      const propertyType = credit.type === 1 ? 1 : 2;
      evaluateService.evaluateCreditApplication(
        user.id,
        monthlyCost,
        user.balance,
        totalDebt,
        propertyValue,
        credit.diner,
        propertyType,
        credit.time,
        creditHistory
      )
        .then((response) => setCreditEvaluationScore(response.data))
        .catch((err) => console.error("Error al evaluar la solicitud de crédito:", err));
    }
  };

  const handleDownload = (id, type) => {
    fileService.downloadFile(id, type)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `document_${type}.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => console.error("Error al descargar el archivo:", err));
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
        </CardContent>
      </Card>

      {/* Documentos para descargar */}
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h5" gutterBottom>
          Documentos para Descargar
        </Typography>
        <ul>
          {documents.map((doc) => (
            <li key={doc.type}>
              <Button variant="contained" onClick={() => handleDownload(credit.id, doc.type)}>
                Descargar {doc.filename || `Documento Tipo ${doc.type}`}
              </Button>
            </li>
          ))}
        </ul>
      </Box>

      {/* Campos del formulario para evaluación de ahorro */}
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h5" gutterBottom>
          Evaluación de Capacidad de Ahorro
        </Typography>
        <TextField
          label="Valor de la Propiedad"
          type="number"
          value={propertyValue}
          onChange={(e) => setPropertyValue(Number(e.target.value))}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Deuda Total"
          type="number"
          value={totalDebt}
          onChange={(e) => setTotalDebt(Number(e.target.value))}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Consistencia en Ahorro</InputLabel>
          <Select
            value={consistentSaving}
            onChange={(e) => setConsistentSaving(e.target.value === 'true')}
            label="Consistencia en Ahorro"
          >
            <MenuItem value="true">Verdadero</MenuItem>
            <MenuItem value="false">Falso</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Depósitos Periódicos</InputLabel>
          <Select
            value={periodicDeposit}
            onChange={(e) => setPeriodicDeposit(e.target.value === 'true')}
            label="Depósitos Periódicos"
          >
            <MenuItem value="true">Verdadero</MenuItem>
            <MenuItem value="false">Falso</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Máximo Retiro Mensual"
          type="number"
          value={maxMonthlyOut}
          onChange={(e) => setMaxMonthlyOut(Number(e.target.value))}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="secondary" onClick={handleSavingEvaluation} sx={{ marginBottom: 2 }}>
          Evaluar Capacidad de Ahorro
        </Button>
        <Typography variant="body1">
          <strong>Resultado de Ahorro:</strong> {savingEvaluation}
        </Typography>
      </Box>

      {/* Campo para Historial Crediticio */}
      <Box sx={{ marginTop: 3 }}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Historial Crediticio</InputLabel>
          <Select
            value={creditHistory}
            onChange={(e) => setCreditHistory(e.target.value === 'true')}
            label="Historial Crediticio"
          >
            <MenuItem value="true">Verdadero</MenuItem>
            <MenuItem value="false">Falso</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Botón para evaluación de crédito */}
      <Box sx={{ marginTop: 3 }}>
        <Button variant="contained" color="secondary" onClick={handleCreditEvaluation}>
          Evaluar Solicitud de Crédito
        </Button>
        {creditEvaluationScore && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h5" gutterBottom>
              Puntuación de Evaluación de Crédito:
            </Typography>
            <ul>
              {creditEvaluationScore.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </Box>
        )}
      </Box>

      {/* Selección de fase y botón para avanzar de fase */}
      <Box sx={{ marginTop: 3 }}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Fase</InputLabel>
          <Select
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value)}
            label="Fase"
          >
            <MenuItem value={2}>Pendiente de documentos</MenuItem>
            <MenuItem value={3}>En Evaluación</MenuItem>
            <MenuItem value={4}>Pre-aprobado</MenuItem>
            <MenuItem value={6}>Aprobada</MenuItem>
            <MenuItem value={7}>Rechazada</MenuItem>
            <MenuItem value={9}>Desembolso</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleAdvancePhase}>
          Avanzar Fase
        </Button>
      </Box>
    </Box>
  );
}



export default EvaluateCredit;
