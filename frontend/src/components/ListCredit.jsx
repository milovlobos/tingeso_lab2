import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import creditService from "../services/credit.service";
import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import stateService from "../services/state.service";

const PostulacionesList = () => {
  const [credits, setCredits] = useState([]);
  const [creditStates, setCreditStates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const iduserString = localStorage.getItem("userId");
        const iduser = parseInt(iduserString, 10);

        if (isNaN(iduser)) {
          setError("Usuario no válido.");
          setLoading(false);
          return;
        }

        // Obtener los créditos por usuario
        const response = await creditService.getCreditsByUser(iduser);
        const credits = response.data;

        setCredits(credits);

        // Crear un mapa para almacenar los estados de los créditos
        const stateMap = {};
        for (const credit of credits) {
          if (credit.id) {
            try {
              const stateResponse = await stateService.getCreditbyid(credit.id);
              stateMap[credit.id] = stateResponse.data;
            } catch (error) {
              console.error(`Error al obtener el estado del crédito ${credit.id}:`, error);
              stateMap[credit.id] = null; // Manejar errores
            }
          } else {
            console.warn("Crédito sin idcredit:", credit);
          }
        }

        setCreditStates(stateMap); // Guardar los estados
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar las postulaciones:", error);
        setError("Error al cargar las postulaciones.");
        setLoading(false);
      }
    };

    fetchCredits();
  }, []);

  const handleCancelCredit = (creditId) => {
    stateService.updatestate(creditId, 8) // Estado 8 = Cancelado por el cliente
      .then(() => {
        alert("El crédito ha sido cancelado.");
        setCredits((prevCredits) => prevCredits.filter((credit) => credit.id !== creditId));
      })
      .catch(() => {
        alert("Error al cancelar el crédito.");
      });
  };

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Mis Postulaciones
      </Typography>

      {credits.length === 0 ? (
        <Typography>No tienes postulaciones aún.</Typography>
      ) : (
        <Grid container spacing={3}>
          {credits.map((credit) => (
            <Grid item xs={12} sm={6} md={4} key={credit.id}>
              <Card variant="outlined">
                <CardContent>
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
                    <strong>Estado de la Solicitud:</strong>{" "}
                    {creditStates[credit.id] === 1
                      ? "Revisión inicial"
                      : creditStates[credit.id] === 2
                      ? "Pendiente de documentos"
                      : creditStates[credit.id] === 3
                      ? "En Evaluación"
                      : creditStates[credit.id] === 4
                      ? "Pre-aprobado"
                      : creditStates[credit.id] === 5
                      ? "Aprobación Final"
                      : creditStates[credit.id] === 6
                      ? "Aprobada"
                      : creditStates[credit.id] === 7
                      ? "Rechazada"
                      : creditStates[credit.id] === 8
                      ? "Cancelada por el cliente"
                      : "Desconocido"}
                  </Typography>

                  {creditStates[credit.id] === 4 && (
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ marginTop: 2 }}
                      onClick={() => {
                        localStorage.setItem("creditId", credit.id);
                        navigate(`/detailuser`);
                      }}
                    >
                      Ver Costos Totales
                    </Button>
                  )}

                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ marginTop: 2 }}
                    onClick={() => handleCancelCredit(credit.id)}
                  >
                    Cancelar Crédito
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

export default PostulacionesList;
