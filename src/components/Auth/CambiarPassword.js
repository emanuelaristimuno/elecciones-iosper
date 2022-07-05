import React, { useState } from "react";
import { Button, Card, CardActions, CardContent, FormControl, Grid, Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "../../@iosper/components/LoadingButton";
import Pass from '../Common/PasswordTextInput';
import { getCambiarPassword }  from '../../services/Sau/Usuario';
import CustomizedSnackbars from "../Notifications/SnackBar";
import { useForm } from "react-hook-form";

const CambiarPassword = React.forwardRef((props, ref) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data, e) => {
    setLoading(true);
    setResponse("");
    setError("");
    
    try {
      if(data.nuevopin === data.confirmarnuevopin) {
        let par = {
          rolafiliado: true,
          passwordactual: data.pinactual,
          nuevapassword: data.nuevopin,
          confirmarnuevapassword: data.confirmarnuevopin,
        };

        const res = await getCambiarPassword(par);
        
        if (res) {
          setResponse("El cambio de Contraseña fué exitoso.")
          reset()
          setLoading(false);
        }
        else {
          setError("Credenciales incorrectas. Intente nuevamente.");
          setLoading(false);
        }
      }else{
        setError("Las contraseñas ingresadas no coinciden");
        setLoading(false);
      }

    } catch (e) {
        setLoading(false);
        setError(e);
    }
  }
  
  const handlerLimpiar = () => {
    reset();
  };

  return (    
    <Grid container spacing={2}>
      <Grid item xs={12} >
        <Card sx={{ width: '100%', p: 1 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Cambiar Contraseña - PIN
            </Typography>
          </CardContent>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <FormControl fullWidth={true} variant="outlined" margin="normal">
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="pinactual"
                  label="Contraseña Actual"
                  type="password"
                  id="pinactual"
                  {...register("pinactual", {
                      required: {
                          value:true,
                          message: 'Debe ingresar Contraseña Actual'
                      },
                      pattern: {
                          value: /^[0-9a-zA-Z]+$/,
                          message: 'Contraseña Actual debe contener solo letras y al menos un número'
                        }
                      }
                  )} 
                />
                  {errors["pinactual"] && (
                    <p style={{ color: "red" }}>{errors["pinactual"].message}</p>
                  )} 
              </FormControl>
              <FormControl fullWidth={true} variant="outlined" margin="normal">
                <Pass register={register}
                      errors={setError} 
                      label="Nueva Contraseña" 
                      fieldName="nuevopin">
                </Pass> 
                {errors["nuevopin"] && (
                        <p style={{ color: "red" }}>{errors["nuevopin"].message}</p>
                    )} 
              </FormControl>
              <FormControl fullWidth={true} variant="outlined" margin="normal">
                <Pass register={register}
                      errors={setError} 
                      label="Confirmar Nueva Contraseña" 
                      fieldName="confirmarnuevopin">      
                </Pass> 
                {errors["confirmarnuevopin"] && (
                        <p style={{ color: "red" }}>{errors["confirmarnuevopin"].message}</p>
                    )} 
              </FormControl>
              <Typography variant="body2" color="textSecondary" component="p" align="center">
                La Contraseña debe tener entre 6 y 25 caracteres y al menos un número
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
              <Stack     
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2 }} 
                justifyContent={{ xs: 'center', sm: 'flex-end' }} 
                alignItems={{  xs: "strech" }}>
                <Button
                  variant="contained"
                  size="medium"
                  color="neutral"
                  onClick={handlerLimpiar}
                >
                  Limpiar
                </Button>  
                <LoadingButton
                  variant="contained"
                  size="medium"
                  color="primary"
                  type="submit"
                  loading={loading ? 'show' : 'hide'}
                  content={"Cambiar Contraseña"}        
                />     
              </Stack>
            </CardActions>
          </form>
        </Card>
      </Grid>
      <CustomizedSnackbars open={response} severity="success" message={response} />      
      <CustomizedSnackbars open={error} severity="error" message={error} />
    </Grid>
    );
})
export default CambiarPassword;