import React from "react";
import { Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { Box } from "@mui/material";
import { useUser } from "../components/Auth/User";

/* Screens */

/* Components */
import SignIn from '../components/Auth/SignIn';
import SignOut from '../components/Auth/SignOut';
import DondeVoto from "../components/Eleccion/DondeVoto";
import ListasPorMesa from "../components/Eleccion/ListasPorMesa";
import GraficoSeguimiento from "../components/Eleccion/GraficoSeguimiento";

const PrivateRoute = ({ children, ...props }) => {
    const { user } = useUser()
    return (
        <Route {...props}
            render={({ location }) => user ? ( children ) : (
                <Redirect to={{ pathname: "/signin", state: { from: location } }} />
            )
        }/>
    );
}

const Pages = () => (
  <Box>
    <Switch>
      {/* Public routes */}
      <Route path="/signin"> <SignIn /> </Route>
      <Route path="/donde-voto"> <DondeVoto/> </Route>
      <Route path="/resultados-eleccion"> </Route>
      <Route path="/grafico-seguimiento"><GraficoSeguimiento/></Route>
      
      {/* Private routes */}
      <PrivateRoute path="/signout"><SignOut /></PrivateRoute>
      <PrivateRoute exact path="/carga"> </PrivateRoute>
      <PrivateRoute exact path="/buscar-listas-por-mesa"> <ListasPorMesa/></PrivateRoute>
    </Switch>
  </Box>
);

export default Pages;