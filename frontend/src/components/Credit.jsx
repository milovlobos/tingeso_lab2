import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Credit = () => {
  const navigate = useNavigate(); // Hook para redireccionar

  const handleCreditRequest = () => {
    navigate("/credit/new"); // Redirigir al formulario de NewCredit
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
      <Button
        variant="contained"
        color="success"
        size="large"
        onClick={handleCreditRequest}
      >
        Solicitar Crédito
      </Button>
    </Box>
  );
};

export default Credit;
