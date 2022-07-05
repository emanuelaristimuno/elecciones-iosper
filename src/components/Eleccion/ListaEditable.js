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
        {editFormData.nombre}
      </td>
      <td>
        {editFormData.agrupamiento}
      </td>
      <td>
        <input
          type="text"
          placeholder="Enter votos..."
          name="votos"
          value={editFormData.votos?editFormData.votos:0}
          onChange={handleEditFormChange}
        ></input>
      </td>
      
      <td>
        <button type="submit" className="btn btn-success btn-sm">Registrar</button>
        <button type="button" className="btn btn-secondary btn-sm"onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default ListaEditable;

