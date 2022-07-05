import { Container } from '@mui/material';
import React, { useEffect } from 'react'
import { Chart } from "react-google-charts";
import { getResultadosEleccion } from '../../services/Eleccion/Eleccion';

const GraficoSeguimiento = () => {
    const [data, setData] = React.useState(null);
    
    React.useEffect(() => {
        const getData = async () => {
            const res = await getResultadosEleccion();
            console.log('res.data', res.data)
            setData(res?.data);
               
        };

        getData();

    }, [])
    

    return (
        <Container sx={{ height: '100%' }}>
            {data?.map((item, key) => (
                <div key={key}>
                    {item.agrupamiento}
                    <Chart
                        chartType="ScatterChart"
                        data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
                        width="100%"
                        height="400px"
                        legendToggle
                    />
                </div>
            ))}
        </Container>
    )
}

export default GraficoSeguimiento