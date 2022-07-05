import React, {  useState } from "react";
import { Redirect } from "react-router-dom";
import TextField from "@mui/material/TextField";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import { useUser } from "./User";
import CustomizedSnackbars from "../Notifications/SnackBar";
import LoadingButton from "../../@iosper/components/LoadingButton";
import Typography from '@mui/material/Typography'
import { Box } from "@mui/material";

const SignIn = () => {
  const { user, signIn } = useUser();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openRecuperarPin, setOpenRecuperarPin] = useState(false);

  const handleChangeInputs = e => {
    e.persist()
    setCredentials(prevState => ({...prevState, [e.target.name]: e.target.value}))
  }

  const openRecuperarPinHandler = () => {
    setOpenRecuperarPin(true);
  }
  
  const signInHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    setResponse("");
    setError("");
    const res = await signIn(credentials.username, credentials.password);
    if (res) {
      setLoading(false);
      setResponse("Ingresando a Mi IOSPER...");
      } else {
        setError("Credenciales incorrectas. Intente nuevamente.");
        setLoading(false);
    }
  };

  const handleOnKeyUp = (e) => {
    let {key, keyCode} = e
    if (key === 'Enter' && keyCode === 13) {
      signInHandler(e)
    }
  }

  return user ? (
    <Redirect
      to={{
        pathname: "/validar-contacto",
        state: { from: "/signin" },
      }}
    />
  ) : ( openRecuperarPin ? (
        <Redirect
          to={{
            pathname: "/olvide-pin",
            state: { from: "/signin" },
          }}
        />       
  ) : (
    <Container component="main" maxWidth="xs" onKeyUpCapture={handleOnKeyUp}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ pb: 3 }}>
          Iniciar sesión
        </Typography>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="CUIL o Nº Afiliado"
            name="username"
            autoComplete="username"
            autoFocus
            value={credentials.username}
            onChange={handleChangeInputs}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña - PIN"
            type="password"
            id="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChangeInputs}
          />

          <Box sx={{ pt: 3 }}>
            <LoadingButton
              fullWidth={true}
              variant="contained"
              color="neutral"
              startIcon={<LockOpenIcon />}
              loading={loading ? 'show' : 'hide'}
              content={"Ingresar"}
              onClick={signInHandler}
            />
          </Box>
                    
          <LoadingButton
              fullWidth={true}
              content={"Olvide Contraseña - PIN"}
              onClick={openRecuperarPinHandler}
            />
        </form>
      </Paper>

      <CustomizedSnackbars open={response} severity="success" message={response} />
      <CustomizedSnackbars open={error} severity="error" message={error} />
    </Container>
    )
  );
};

export default SignIn;

 