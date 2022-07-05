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
import Home from "../components/Screens/Home";
import DondeVoto from "../components/Eleccion/DondeVoto";
import ListasPorMesa from "../components/Eleccion/ListasPorMesa";

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
      <Route path="/donde-voto">
        <div className="container mt-5">
               <DondeVoto></DondeVoto>
        </div>
      </Route>
      <Route path="/buscar-listas-por-mesa">
        <div className="container mt-5">
                <ListasPorMesa></ListasPorMesa>
        </div>
          </Route>
      <Route path="/resultados-eleccion">  </Route>
      
      {/* Private routes */}
      <PrivateRoute path="/signout"><SignOut /></PrivateRoute>
      <PrivateRoute exact path="/carga"> </PrivateRoute>
      
    </Switch>
  </Box>
);

export default Pages;