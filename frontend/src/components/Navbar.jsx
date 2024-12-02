import React, { useState, useEffect } from "react"; // Importación corregida de React
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Sidemenu from "./Sidemenu";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [username, setUsername] = useState(null);
  const [open, setOpen] = useState(false); // Estado para controlar el Sidemenu
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    localStorage.removeItem("isEmployee");
    navigate("/login");
    window.location.reload(); // Forzar recarga de la página al cerrar sesión
  };

  const handleNavigate = (path) => {
    navigate(path);
    window.location.reload(); // Forzar recarga de la página al cambiar de ruta
  };

  // Función para abrir/cerrar el menú
  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen(isOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)} // Abrir el menú cuando se hace clic en el icono
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SisGR: Sistema de Gestion de Creditos
          </Typography>

          {username ? (
            <>
              <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                Bienvenido, {username}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => handleNavigate("/register")}>
                Registrar
              </Button>
              <Button color="inherit" onClick={() => handleNavigate("/login")}>
                Iniciar Sesión
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Menú lateral */}
      <Sidemenu open={open} toggleDrawer={toggleDrawer}></Sidemenu>
    </Box>
  );
}
