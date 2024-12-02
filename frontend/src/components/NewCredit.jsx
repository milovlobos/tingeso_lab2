import { useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { MenuItem } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

import creditService from "../services/credit.service";
import fileService from "../services/file.service"; 

const NewCredit = () => {
  const [interest, setInterest] = useState("");
  const [time, setTime] = useState("");
  const [diner, setDiner] = useState("");
  const [c_i, setCI] = useState(null);
  const [c_a, setCA] = useState(null);
  const [h_c, setHC] = useState(null);
  const [e_p_v, setEPV] = useState(null);
  const [e_f_n, setEFN] = useState(null);
  const [p_n, setPN] = useState(null);
  const [p_r, setPR] = useState(null);
  const [c_a_a, setCAA] = useState(null);
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState(false);
  
  const navigate = useNavigate();
  const currentDate = new Date().toISOString().split("T")[0];
  
  const interestLimits = {
    "1": { min: 3.5, max: 5.0 },
    "2": { min: 4.0, max: 6.0 },
    "3": { min: 5.0, max: 7.0 },
    "4": { min: 4.5, max: 6.0 },
  };
  
  const handleInterestChange = (e) => {
    const value = parseFloat(e.target.value);
    const limits = interestLimits[type];
    if (value >= limits.min && value <= limits.max) {
      setInterest(value);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleYearChange = (e) => {
    const enteredYear = parseInt(e.target.value);
    const maxYear = getMaxYear();
    if (enteredYear > maxYear) {
      setError(true);
    } else {
      setError(false);
      setTime(e.target.value);
    }
  };

  const getMaxYear = () => {
    switch (type) {
      case "1": return 30;
      case "2": return 20;
      case "3": return 25;
      case "4": return 15;
      default: return 30;
    }
  };

  const uploadFiles = async (creditId) => {
    const files = [
      { file: c_i, type: 1 },
      { file: c_a, type: 2 },
      { file: h_c, type: 3 },
      { file: e_p_v, type: 4 },
      { file: e_f_n, type: 5 },
      { file: p_n, type: 6 },
      { file: p_r, type: 7 },
      { file: c_a_a, type: 8 },
    ];

    for (const { file, type } of files) {
      if (file) {
        await fileService.uploadFile(creditId, type, file);
      }
    }
  };

  const saveCredit = async (e) => {
    e.preventDefault();
    const idUser = localStorage.getItem("userId");

    try {
      let response;
      switch (type) {
        case "1":
          response = await creditService.createCreditType1({ iduser: idUser, interest, time, diner, date: currentDate, c_i, c_a, h_c });
          break;
        case "2":
          response = await creditService.createCreditType2({ iduser: idUser, interest, time, diner, date: currentDate, c_i, c_a, e_p_v, h_c });
          break;
        case "3":
          response = await creditService.createCreditType3({ iduser: idUser, interest, time, diner, date: currentDate, e_f_n, c_i, c_a, p_n });
          break;
        case "4":
          response = await creditService.createCreditType4({ iduser: idUser, interest, time, diner, date: currentDate, c_i, p_r, c_a_a });
          break;
        default:
          console.error("Categoría no válida");
          return;
      }

      await uploadFiles(response.data.id); // Subir archivos después de guardar el crédito
      alert("Crédito y archivos guardados exitosamente");
      navigate("/home");
    } catch (error) {
      console.error("Error al guardar el crédito o los archivos:", error);
    }
  };

  const renderFileFields = () => {
    switch (type) {
      case "1":
        return (
          <>
            {renderFileUpload("Comprobante de ingresos", c_i, setCI)}
            {renderFileUpload("Certificado de avalúo", c_a, setCA)}
            {renderFileUpload("Historial crediticio", h_c, setHC)}
          </>
        );
      case "2":
        return (
          <>
            {renderFileUpload("Comprobante de ingresos", c_i, setCI)}
            {renderFileUpload("Certificado de avalúo", c_a, setCA)}
            {renderFileUpload("Escritura de la primera vivienda", e_p_v, setEPV)}
            {renderFileUpload("Historial crediticio", h_c, setHC)}
          </>
        );
      case "3":
        return (
          <>
            {renderFileUpload("Estado financiero del negocio", e_f_n, setEFN)}
            {renderFileUpload("Comprobante de ingresos", c_i, setCI)}
            {renderFileUpload("Certificado de avalúo", c_a, setCA)}
            {renderFileUpload("Plan de negocios", p_n, setPN)}
          </>
        );
      case "4":
        return (
          <>
            {renderFileUpload("Comprobante de ingresos", c_i, setCI)}
            {renderFileUpload("Presupuesto de la remodelación", p_r, setPR)}
            {renderFileUpload("Certificado de avalúo actualizado", c_a_a, setCAA)}
          </>
        );
      default:
        return null;
    }
  };

  const renderFileUpload = (label, file, setFile) => (
    <FormControl fullWidth>
      <TextField
        id={label}
        type="file"
        inputProps={{ accept: "application/pdf" }}
        variant="outlined"
        label={`Cargar ${label}`}
        onChange={(e) => setFile(e.target.files[0])}
        InputLabelProps={{ shrink: true }}
      />
      {file && (
        <Button
          variant="contained"
          color="error"
          onClick={() => setFile(null)}
          startIcon={<DeleteIcon />}
        >
          Eliminar {label}
        </Button>
      )}
    </FormControl>
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" component="form" onSubmit={saveCredit}>
      <h1>Postular a un crédito</h1>

      <FormControl fullWidth>
        <TextField
          id="type"
          label="Tipo"
          value={type}
          select
          variant="standard"
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value={"1"}>Primera Vivienda</MenuItem>
          <MenuItem value={"2"}>Segunda Vivienda</MenuItem>
          <MenuItem value={"3"}>Propiedades Comerciales</MenuItem>
          <MenuItem value={"4"}>Remodelación</MenuItem>
        </TextField>
      </FormControl>

      <FormControl fullWidth>
        <TextField
          id="interest"
          label="Interest"
          type="number"
          value={interest}
          variant="standard"
          inputProps={{ inputMode: 'decimal' ,min: interestLimits[type]?.min, max: interestLimits[type]?.max ,step: "0.01" }}
          onChange={handleInterestChange}
          helperText={error ? `El interés debe estar entre ${interestLimits[type]?.min}% y ${interestLimits[type]?.max}%` : ""}
          error={error}
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          id="diner"
          label="Diner"
          type="number"
          value={diner}
          variant="standard"
          inputProps={{ min: 0 }}
          onChange={(e) => setDiner(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          id="year"
          label="Year"
          type="number"
          value={time}
          variant="standard"
          inputProps={{ min: 0 }}
          onChange={handleYearChange}
          helperText={error ? `El año no puede exceder ${getMaxYear()}` : "Ingrese solo el año"}
          error={error}
        />
      </FormControl>

      {renderFileFields()}

      <FormControl>
        <Button variant="contained" color="info" type="submit" style={{ marginTop: "1rem" }} startIcon={<SaveIcon />}>
          Postular
        </Button>
      </FormControl>
      <hr />
      <Link to="/home">home</Link>
    </Box>
  );
};

export default NewCredit;
