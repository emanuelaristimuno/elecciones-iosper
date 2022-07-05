import { Container } from '@mui/material';
import React, { useEffect } from 'react'
import { Chart } from "react-google-charts";
import { getResultadosEleccion } from '../../services/Eleccion/Eleccion';

const GraficoSeguimiento = () => {
    const [data, setData] = React.useState(null);
    const getResultados = () => 
        getResultadosEleccion()
        .then((response) => {
            if (response?.data) {
                setData(response?.data);
                console.log('data', data)
            }
        });
    

    return (
        <Container>
            {data && (data?.map((item, key) => (
                    <Chart
                    key={key}
                    chartType="ScatterChart"
                    data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
                    width="100%"
                    height="400px"
                    legendToggle
                    />
                ))
            )}
        </Container>
    )
}

export default GraficoSeguimiento