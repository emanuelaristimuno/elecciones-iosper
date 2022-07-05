

import React , { useState,useEffect, Fragment } from "react";
import { registrarVoto } from "../../services/Eleccion/Eleccion";
import ListaEditable from "./ListaEditable";
import ListaSoloLectura from "./ListaSoloLectura";

const TableListas = ({listas}) => {
  
  const [Listas, setListas] = useState(listas);
  /*
  useEffect(() => {
    if (Listas) {
     console.log("listas:", Listas);
    }
   }, [Listas]);
*/

  const [editFormData, setEditFormData] = useState({
    lista: "",
    mesa: "",
    agrupamiento: "",
    nombre: "",
    votos: "",    

  });

  const [editListaId, setEditListaId] = useState(null);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

 

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedLista = {
      lista: editListaId,
      mesa: editFormData.mesa,
      idvoto: editFormData.idvoto,
      agrupamiento: editFormData.agrupamiento,
      nombre: editFormData.nombre,
      votos: editFormData.votos
    };

    const newListas = [...Listas];

    const index = Listas.findIndex((Lista) => Lista.lista === editListaId);

    newListas[index] = editedLista;

    setListas(newListas);
    registrarVoto(editedLista)
    .then((response) => {
      if (response?.data?.status === 'error') {
        console.error(response.data.message)
      }                         
      //actualizar listas
      //console.log(response);  
    //  setListas(response)
    })
    .catch((e) => {
      if (e?.response?.status === 'error') {
        console.log(e.response.data.message);
      }
    }); 
    
    console.log(Listas)
    setEditListaId(null);
  };

  const handleEditClick = (event, lista) => {
    event.preventDefault();
    setEditListaId(lista.lista);

    const formValues = {
      lista: lista.lista,
      idvoto:lista.idvoto,
      mesa: lista.mesa,
      agrupamiento: lista.agrupamiento,
      nombre: lista.nombre,
      votos: lista.votos,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditListaId(null);
  };

 

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Lista</th>
              <th>Mesa</th>
              <th>Agrupamiento</th>
              <th>Nombre</th>
              <th>Votos</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Listas.map((lista) => (
              <Fragment key={lista.lista}>
                {editListaId === lista.lista ? (
                  <ListaEditable 
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                    <ListaSoloLectura 
                      lista={lista}
                      handleEditClick={handleEditClick}
                    />
                  )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

    </div>
  );
};

export default TableListas;