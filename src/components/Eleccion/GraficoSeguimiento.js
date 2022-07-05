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
        <Container>
            {data?.map((item, key) => (
                <>
                    {item.agrupamiento}
                    <Chart
                        key={key}
                        chartType="ScatterChart"
                        data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
                        width="100%"
                        height="400px"
                        legendToggle
                    />
                </>
            ))}
        </Container>
    )
}

export default GraficoSeguimiento