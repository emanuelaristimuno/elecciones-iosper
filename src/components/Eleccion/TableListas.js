

import React , { useState, Fragment } from "react";
import { registrarVoto } from "../../services/Eleccion/Eleccion";
import CustomizedSnackbars from "../Notifications/SnackBar";
import ListaEditable from "./ListaEditable";
import ListaSoloLectura from "./ListaSoloLectura";

const TableListas = ({listas}) => {
  
  const [Listas, setListas] = useState(listas);
  const [error, setError] = useState("");

  const [editFormData, setEditFormData] = useState({
    lista: "",
    mesa: "",
    agrupamiento: "",
    nombre: "",
    votos: "",    
    electores:""
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
      votos: editFormData.votos,
      electores: editFormData.electores
    };

    /*if(editedLista.votos > editedLista.electores){
      setError("Los votos de " +editedLista.nombre+" no pueden superar la cantidad de electores del agrupamiento "+editedLista.agrupamiento)
      return null
    }*/

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
    setEditListaId(null);
  };

  const handleEditClick = (event, lista) => {
    event.preventDefault();
    setEditListaId(lista.lista);

    const formValues = {
      lista: lista.lista,
      idvoto: lista.idvoto,
      mesa: lista.mesa,
      agrupamiento: lista.agrupamiento,
      nombre: lista.nombre,
      votos: lista.votos,
      electores: lista.electores
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditListaId(null);
  };

 

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
      <table className="table table-striped table-bordered table-hover table-sm">
          <thead>
            <tr>
              <th>Lista</th>
              <th>Nombre</th>
              <th>Agrupamiento</th>
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
      <CustomizedSnackbars open={error} severity="error" message={error} />

    </div>
  );
};

export default TableListas;