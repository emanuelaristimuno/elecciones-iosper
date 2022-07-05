import React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useUser } from './User'
import { Paper } from '@mui/material';
//import { useInfoAfiliado } from '../Afiliados/InfoAfiliadoProvider'

const UserConnected = (props) => {
  return (
    <div>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Estas conectado como "'} 
        {(props.afiliado && props.afiliado.personaFisica ) ? props.afiliado.personaFisica.apellido + ", "+  props.afiliado.personaFisica.nombre : "-"}
        {'"'}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {(props.afiliado && props.afiliado.relacionTitularAdherente ) ? props.afiliado.relacionTitularAdherente.descripcion  : "-"}
        {' - '}
        {(props.afiliado && props.afiliado.tipoAfiliado ) ? props.afiliado.tipoAfiliado.descripcion  : "-"}
      </Typography>   
    </div>
  );
}

export default function SignOut(props) {

  const { user, identity, signOut } = useUser()
  //const  { infoAfiliado }  = useInfoAfiliado();
  const  { infoAfiliado }  = {};

  const signOutHandler = (e) => {
    e.preventDefault()
    signOut()
    sessionStorage.clear();
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={{ p: 2 }} >
        <form noValidate>
          <Button sx={{ mb: 2 }} component={Link} to="/"
            fullWidth
            variant="text"
            color="primary"
            startIcon={<ArrowBackIcon />}
          >
            Volver
          </Button>
          <Button sx={{ mb: 2 }} component={Link} to="/signin"
            fullWidth
            variant="contained"
            color="secondary"
            startIcon={<ExitToAppIcon />}
            onClick={(e) => signOutHandler(e)}

          >
            Salir
          </Button>
        </form>
      </Paper>
      <Box mt={8}>
        <UserConnected user={user} identity={identity} afiliado={infoAfiliado}/>
      </Box>
    </Container>
  );
}