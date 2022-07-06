import React, {Fragment, useState} from 'react';
import { dondeVoto } from '../../services/Eleccion/Eleccion';

const DondeVoto = () => {

  const [dni, setDni] = useState("");
  const [escuela, setEscuela] = useState({});
  
    const handleInputChange = (event) => {
        setDni( event.target.value        )
    }

    const handleOnKeyUp = (e) => {
      let {key, keyCode} = e
      if (key === 'Enter' && keyCode === 13) {
        enviarDatos(e)
      }
    }

    const enviarDatos = (event) => {
        event.preventDefault()
        const idAfiliado = dni;
          dondeVoto(idAfiliado)
            .then((response) => {
              if (response?.data?.status === 'error') {
                console.error(response.data.message)
              }                         
              setEscuela(response)
            })
            .catch((e) => {
              if (e?.response?.status === 'error') {
                console.log(e.response.data.message);
              }
            });
    
          };

          const handleClickLimpiar = (event) =>{
            event.preventDefault();
            setEscuela({});
          }


          const Results = () => (
            <div>              <h4>Resultado:</h4>
            <div style={{
              border: '2px solid #abecf9',
              borderBottomLeftRadius: '30px',
              borderBottomRightRadius: '30px',
              borderTopLeftRadius:'30px',
              borderTopRightRadius: '30px',
              background: '#bdf0fa',
              color: '#0c92ac', fontWeight: 'bold', padding: '15px'
            }}>
          <ul >          
              <li>Afiliado: {escuela['nombre']}</li>
              <li>DNI: {escuela['documento']}</li>
              <li>Agrupamiento: {escuela['agrupamiento']}</li>
              <li>Escuela: {escuela['escuela']}</li>
              <li>Localidad: {escuela['localidad_escuela']}</li>
              <li>Mesa: {escuela['mesa']}</li>
          </ul>

          </div>
          </div>

          )

        

    return (
        <Fragment >
            <h1>Buscar lugar de votación:</h1>
            <form className="row" onSubmit={enviarDatos} onKeyUpCapture={handleOnKeyUp}>
                <div className="col-md-4">
                    <input type="number" placeholder="Ingrese documento" className="form-control" 
                    onChange={handleInputChange} name="dni"></input>
                </div>
              
                <br/><br/>   

          <div className="col-md-4" >          
            <button onClick={handleClickLimpiar} className="btn btn-secondary"     style={ {marginRight: '20px'} }
>Limpiar</button>
             <button type="submit" className="btn btn-primary"
>Buscar</button>
          </div>

            </form>
            
            <br/>
            { escuela['nombre'] ? <Results /> : "" }

            
        </Fragment>
    );
}
 
export default DondeVoto;