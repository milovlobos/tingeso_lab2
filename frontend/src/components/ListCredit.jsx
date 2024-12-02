import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import creditService from "../services/credit.service";
import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";

const PostulacionesList = () => {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const iduserString = localStorage.getItem("userId");
    const iduser = parseInt(iduserString, 10);

    creditService.getCreditsByUser(iduser)
      .then((response) => {
        setCredits(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar las postulaciones.");
        setLoading(false);
      });
  }, []);

  const handleCancelCredit = (creditId) => {
    creditService.updatestate(creditId, 8) // Estado 8 = Cancelado por el cliente
      .then(() => {
        alert("El crédito ha sido cancelado.");
        window.location.reload()
        setCredits((prevCredits) =>
          prevCredits.filter((credit) => credit.id !== creditId)
        );
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
                    <strong>Estado de la Solicitud:</strong> {credit.state === 1 ? 'Revisión inicial': 
                                                              credit.state === 2 ? 'Pendiente de documentos':
                                                              credit.state === 3 ? 'En Evaluación':
                                                              credit.state === 4 ? 'Pre-aprobado':
                                                              credit.state === 5 ? 'Aprobación Final':
                                                              credit.state === 6 ? 'Aprobada':
                                                              credit.state === 7 ? 'Rechazada':
                                                              credit.state === 8 ? 'Cancelada por el cliente':'Desembolso'}
                  </Typography>
                  {credit.state === 4 && (
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      sx={{ marginTop: 2 }}
                      onClick={() => { 
                        if (credit.id) { 
                          localStorage.setItem('creditId', credit.id); 
                          console.log(`Credit ID saved: ${credit.id}`);
                          navigate(`/detailuser`); 
                        } else {
                          console.error("El ID del crédito no está definido.");
                        }
                      }}
                    >
                      Ver Costos Totales
                    </Button>
                  )}
                  
                  {/* Botón para cancelar el crédito */}
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
