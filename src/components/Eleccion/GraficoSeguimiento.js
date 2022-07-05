import { Container } from '@mui/material';
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
        <Container sx={{ height: '100%' }}>
            {data?.map((item, key) => (
                <div key={key}>
                    {item.agrupamiento}
                    <Chart
                        chartType="PieChart"
                        data={getInfo(item.listas)}
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