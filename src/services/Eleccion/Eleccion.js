import axios from "axios";

/**
 * Validar capita api call
 * @returns
 */
export const dondeVoto = (data) => {
  return axios
  .get("/v1/elecciones/donde-voto/"+data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};


export const dondeVoto2 = async (idAfiliado) => {
  return axios
    .get("/v1/elecciones/donde-voto/"+idAfiliado, 
      {
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then((result) => {
      if (result !== undefined && result.status !== undefined && result.status === 'error') {
         return Promise.reject(result.message);
      } else {
        return result.data;
      }
    })
    .catch((e) => {
        if ((e.response.status !== undefined) || e.response.data.status === 'error') {
          const error = e.response.data !== '' ? e.response.data.message : e.response.statusText;
          return Promise.reject(error);
        }
    });
};


export const listasPorMesa = async (numeroMesa) => {
  return axios
    .get("/v1/elecciones/buscar-listas-por-mesa/"+numeroMesa, 
      {
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then((result) => {
      if (result !== undefined && result.status !== undefined && result.status === 'error') {
         return Promise.reject(result.message);
      } else {
        return result.data;
      }
    })
    .catch((e) => {
        if ((e.response.status !== undefined) || e.response.data.status === 'error') {
          const error = e.response.data !== '' ? e.response.data.message : e.response.statusText;
          return Promise.reject(error);
        }
    });
};



export const registrarVoto = async (data) => {
  return axios
    .post("v1/elecciones/registrar-voto",
    {   
        idVoto:data.idvoto,
        lista:data.lista,
        mesa: data.mesa,
        cantidadVoto: data.votos,
        idUsuario:10    
    } ,
      {
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then((result) => {
      if (result !== undefined && result.status !== undefined && result.status === 'error') {
         return Promise.reject(result.message);
      } else {
        return result.data;
      }
    })
    .catch((e) => {
        if ((e.response.status !== undefined) || e.response.data.status === 'error') {
          const error = e.response.data !== '' ? e.response.data.message : e.response.statusText;
          return Promise.reject(error);
        }
    });
};