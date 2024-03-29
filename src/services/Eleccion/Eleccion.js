import axios from "axios";



export const getResultadosEleccion = () => {
  return axios
  .get("/v1/elecciones/resultados-eleccion", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const dondeVoto = async (idAfiliado) => {
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
        electores:data.electores, 
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