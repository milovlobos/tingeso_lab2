import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import creditService from "../services/credit.service"; 
import totalcostService from "../services/totalcost.service";

const PaycheckList = () => {
    
    const [type, setType] = useState("");
    const [interest, setInterest] = useState("");
    const [time, setTime] = useState("");
    const [diner, setDiner] = useState("");
    const [error, setError] = useState(false); 
    const [simulationResult, setSimulationResult] = useState(null);
    const navigate = useNavigate();

    
    

    const handleSimulation = (e) => {
        e.preventDefault();  
        const amount = diner; 
        const interestValue = interest; 
        const years = time; 

        totalcostService.simulateCredit(amount, interestValue, years)
            .then(response => {
                setSimulationResult(response.data);  
            })
            .catch(error => {
                console.error("Error simulando crédito:", error);
            });
    };
    
    const getMaxYear = () => {
        switch (type) {
            case "1":
                return 30;
            case "2":
                return 20;
            case "3":
                return 25;
            case "4":
                return 15;
            default:
                return 0;
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

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            component="form"
            onSubmit={handleSimulation}
        >
            <hr />
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
                    type="text" 
                    value={interest}
                    variant="standard"
                    inputProps={{ inputMode: 'decimal', min : 0 ,pattern: '[0-9]+([.,][0-9]+)?' }}
                    onChange={(e) => setInterest(e.target.value)}
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

            <FormControl fullWidth>
                <TextField
                    id="diner"
                    label="Money"
                    type="number"
                    value={diner}
                    variant="standard"
                    inputProps={{ min: 0 }}
                    onChange={(e) => setDiner(e.target.value)}
                />
            </FormControl>

            <FormControl>
                <br />
                <Button
                    variant="contained"
                    color="info"
                    onClick={handleSimulation}
                    style={{ marginLeft: "0.5rem" }}
                >
                    Simular
                </Button>
            </FormControl>
            
            <hr />

            {simulationResult !== null && (
                <Box mt={2}>
                    <h3>Resultado de la Simulación:</h3>
                    <p>{simulationResult}</p>
                </Box>
            )}
            
            <Link to="/home">Back home</Link>
        </Box>
    );
};

export default PaycheckList;

