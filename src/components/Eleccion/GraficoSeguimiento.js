import { Box, Card, CardContent, Grid, LinearProgress, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react'
import { Chart } from "react-google-charts";
import { getResultadosEleccion } from '../../services/Eleccion/Eleccion';

const options = {
    chartArea: {
        width:'100%',
        height: '80%',
    },
    legend: { 
      position: 'left', 
      alignment: 'center',
      textStyle: { 
        fontSize: '15' 
      } 
    }
};

const getInfo = listas => {
    const dataG = [["Lista", "Votos"],];
    listas?.map((i) => dataG.push([i.nombre , i.cantidadvoto]))

    return dataG;
}

const GraficoSeguimiento = () => {
    const [data, setData] = React.useState(null);
    
    React.useEffect(() => {
        const getDataResultados = async () => {
            const res = await getResultadosEleccion();
            setData(res?.data);     
        };

        const interval = setInterval(() => {
            getDataResultados();
        }, 10000);

        return () => clearInterval(interval);

    }, [])
    
    return (
        <>
            {!data && (
                <Grid container sx={{ display: 'flex', alignItems: 'flex-end', height: '85vh' }}>
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                </Grid>
            )}
            {data && (
                <Grid container spacing={2} sx={{ height: '100%' }}>
                    {data?.mesas_escrutadas && (
                        <Grid item xs={12}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={12} md={4}>
                                            <List>
                                                <ListItem sx={{ py: 0 }}>
                                                    <ListItemText 
                                                        primary="Mesas habilitadas"
                                                        secondary={
                                                            <Typography variant="h5" component="div" sx={{ 
                                                                color: '#6c757d', 
                                                                fontSize: '1.5rem',
                                                                fontWeight: '300'
                                                            }}>
                                                                {data?.mesas_habilitadas}
                                                            </Typography>
                                                        } />
                                                </ListItem>
                                            </List>
                                        </Grid>     
                                        <Grid item xs={12} md={4}>
                                            <List>
                                                <ListItem sx={{ py: 0 }}>
                                                    <ListItemText 
                                                        primary="Mesas escrutadas"
                                                        secondary={
                                                            <Typography variant="h5" component="div" sx={{ 
                                                                color: '#6c757d', 
                                                                fontSize: '1.5rem',
                                                                fontWeight: '300'
                                                            }}>
                                                                {data?.mesas_escrutadas}
                                                            </Typography>
                                                        } />
                                                </ListItem>
                                            </List>
                                        </Grid>     
                                        <Grid item xs={12} md={4}>
                                            <List>
                                                <ListItem sx={{ py: 0 }}>
                                                    <ListItemText 
                                                        primary="Porcentaje"
                                                        secondary={
                                                            <Typography variant="h5" component="div" sx={{ 
                                                                color: '#6c757d', 
                                                                fontSize: '1.5rem',
                                                                fontWeight: '300'
                                                            }}>
                                                                {data?.mesas_habilitadas*(data?.mesas_escrutadas/100)}%
                                                            </Typography>
                                                        } />
                                                </ListItem>
                                            </List>
                                        </Grid>     
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}

                    {data?.resultados?.map((item, key) => (
                        <Grid item xs={12} md={6} key={key}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {item.agrupamiento}
                                    </Typography>
                                    <Chart
                                        chartType="PieChart"
                                        options={options}
                                        data={getInfo(item.listas)}
                                        width="100%"
                                        height="300px"
                                        legendToggle
                                    />
                                    <Grid container>
                                        <List>
                                            {item?.listas?.map((i, k) => (
                                                <ListItem key={k} sx={{ py: 0 }}>
                                                    <ListItemText primary={`${i.nombre}`} 
                                                        secondary={
                                                            <Typography variant="h5" component="div" sx={{ 
                                                                color: '#6c757d', 
                                                                fontSize: '1.5rem',
                                                                fontWeight: '300'
                                                            }}>
                                                                {i.cantidadvoto} votos
                                                            </Typography>
                                                        } />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    )
}

export default GraficoSeguimiento