import React, {Fragment, useState} from 'react';
import { listasPorMesa } from '../../services/Eleccion/Eleccion';
import TableListas from './TableListas';

const ListasPorMesa = () => {

  const [mesa, setMesa] = useState("");
  const [listas, setListas] = useState([]);
  
    const handleInputChange = (event) => {
        setMesa( event.target.value )
        setListas([]);
    }

    const enviarDatos = (event) => {
        event.preventDefault()
        const numeroMesa = mesa;
        listasPorMesa(numeroMesa)
            .then((response) => {
              if (response?.data?.status === 'error') {
                console.error(response.data.message)
              }                         
              setListas(response)
            })
            .catch((e) => {
              if (e?.response?.status === 'error') {
                console.log(e.response.data.message);
              }
            });
    
          };

          const handleClick = (event) =>{
            event.preventDefault();
            setListas([]);
          }


          const Results = () => (
            <div>   
              <h5 className= "text-success">Listas encontradas para la mesa {mesa} de la escuela {listas[0].escuela}:</h5><br/>
               <TableListas listas={listas}></TableListas> 
                 </div>
          )

        
   
    return (
        <Fragment>
            <h1>Busca listas:</h1>
            <form className="row" onSubmit={enviarDatos}>
                <div className="col-md-4">
                    <input type="text" placeholder="Ingrese n° de mesa" className="form-control" 
                    onChange={handleInputChange}  name="mesa"></input>
                </div>
              
                <br/><br/>   

          <div className="col-md-4" >          
            <button onClick={handleClick} className="btn btn-secondary"
                 style={ {marginRight: '20px'} } >Limpiar</button>
             <button type="submit" className="btn btn-primary">Buscar</button>
          </div>

            </form>
            
            <br/>
           {listas[0]?.lista&&mesa?<Results />:""  }

          
        </Fragment>
    );
}
 
export default ListasPorMesa;