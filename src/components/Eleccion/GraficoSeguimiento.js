import { Box, Container, Grid, LinearProgress } from '@mui/material';
import React from 'react'
import { Chart } from "react-google-charts";
import { getResultadosEleccion } from '../../services/Eleccion/Eleccion';

const getInfo = listas => {
    const dataG = [
        ["Lista", "Votos"],
    ];

    listas?.map((i) => 
        dataG.push([i.nombre, i.cantidadvoto])
    )

    return dataG;
}

const GraficoSeguimiento = () => {
    const [data, setData] = React.useState(null);
    
    React.useEffect(() => {
        const getData = async () => {
            const res = await getResultadosEleccion();
            setData(res?.data);     
        };

        const interval = setInterval(() => {
            getData();
        }, 10000);

        return () => clearInterval(interval);

    }, [])
    


    return (
        <>
            {!data && (
                <Grid
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    
                        <LinearProgress sx={{ mt: '30px'}}/>
                    
                </Grid>
            )}
            {data && (
                <Grid container spacing={2} sx={{ height: '100%' }}>
                    {data?.map((item, key) => (
                        <Grid item md={6} key={key}>
                            {item.agrupamiento}
                            <Chart
                                chartType="PieChart"
                                data={getInfo(item.listas)}
                                width="100%"
                                height="400px"
                                legendToggle
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    )
}

export default GraficoSeguimiento