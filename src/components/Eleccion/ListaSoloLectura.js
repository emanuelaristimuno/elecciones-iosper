import React from "react";

const ListaSoloLectura = ({ lista, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{lista.lista}</td>
      <td>{lista.mesa}</td>
      <td>{lista.nombre}</td>
      <td>{lista.agrupamiento}</td>
      <td >{lista.votos?lista.votos:0}</td>
      <td>
        <button
          type="button" className="btn btn-primary"
          onClick={(event) => handleEditClick(event, lista)}
        >
          Editar        </button>
     
      </td>
    </tr>
  );
};

export default ListaSoloLectura;