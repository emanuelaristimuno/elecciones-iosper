import React from "react";

const ListaEditable = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
       {editFormData.lista}
      </td>
      <td>
        {editFormData.mesa}
      </td>
      <td>
        {editFormData.agrupamiento}
      </td>
      <td>
        {editFormData.nombre}
      </td>
      <td>
        <input
          type="text"
          placeholder="Enter votos..."
          name="votos"
          value={editFormData.votos}
          onChange={handleEditFormChange}
        ></input>
      </td>
      
      <td>
        <button type="submit">Guardar</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default ListaEditable;
