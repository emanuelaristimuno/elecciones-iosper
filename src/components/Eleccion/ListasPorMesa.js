import React, {Fragment, useState} from 'react';
import { dondeVoto2, listasPorMesa } from '../../services/Eleccion/Eleccion';
import TableListas from './TableListas';

const ListasPorMesa = () => {

  const [mesa, setMesa] = useState("");
  const [listas, setListas] = useState([]);
  
    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setMesa( event.target.value )
    }

    const enviarDatos = (event) => {
        event.preventDefault()
        const numeroMesa = mesa;
        console.log('enviando mesa...' + numeroMesa )
        listasPorMesa(numeroMesa)
            .then((response) => {
              if (response?.data?.status === 'error') {
                console.error(response.data.message)
              }                         
              console.log(response);  
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
               <TableListas listas={listas}></TableListas> 
                 </div>
          )

        
    const cargarVotos = (event) => {
      event.preventDefault()
      const numeroMesa = mesa;
      console.log('CARGANDO VOTOS DE MESA...' + numeroMesa )
      console.log(listas )
     /* listasPorMesa(numeroMesa)
          .then((response) => {
            if (response?.data?.status === 'error') {
              console.error(response.data.message)
            }                         
            console.log(response);  
            setListas(response)
          })
          .catch((e) => {
            if (e?.response?.status === 'error') {
              console.log(e.response.data.message);
            }
          });
  */
        };

    return (
        <Fragment>
            <h1>Busca Listas:</h1>
            <form className="row" onSubmit={enviarDatos}>
                <div className="col-md-4">
                    <input type="text" placeholder="Ingrese n° de mesa" className="form-control" 
                    onChange={handleInputChange} name="mesa"></input>
                </div>
              
                <br/><br/>   

          <div className="col-md-4" >          
            <button onClick={handleClick} className="btn btn-secondary"
                 style={ {marginRight: '20px'} } >Limpiar</button>
             <button type="submit" className="btn btn-primary">Buscar</button>
          </div>

            </form>
            
            <br/><h4>Resultado:</h4>
           {listas?<Results />:"-"  }

           <form className="row" onSubmit={cargarVotos}>
           <div className="col-md-4" >        

              <button type="submit" className="btn btn-success">Guardar Votos</button>
           </div>

             </form>
        </Fragment>
    );
}
 
export default ListasPorMesa;