import { useState } from "react";
import axios from "axios";

export const useToken = () => {
  const getToken = () => localStorage.getItem("token");
  const [token, setToken] = useState(getToken);

  const saveToken = (userToken) => {
    localStorage.setItem("token", userToken);
    setToken(userToken);

    /**
     * Seteamos el token para los headers de AXIOS
     */
    if (userToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  return [token, saveToken];
};

export const singInUser = async ({ username, password }) => {
  try {
    const get = async () => {
      return axios.post(
        "http://local-api.iosper.gov.ar:8083/v1/auth/signin",
        { nombre: username, contrasena: password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    };

    const token = get()
      .then((result) => {
        if ( result?.data?.status === "error") {
          console.log(result?.data?.message);
        } else {
          return result?.data?.token || null;
        }
      })
      .catch((e) => {
        if (e?.response?.data?.status === "error") {
          console.log(e?.response?.data?.message);
        }
      });

    return token;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const recuperarPinMiIosper = async (username, idHistorialContactoPersonaFisica) => {
  return axios
    .post("/v1/auth/miiosper/recuperar", 
      {  nombreUsuario: username,
         idHistorialContactoPersonaFisica: idHistorialContactoPersonaFisica },
      { headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          return Promise.reject(e.response.data.message);
        }
    });

};


export const nuevoPin = async (pin, token) => {
  return axios
    .post("/v1/auth/nueva-contrasenia", 
      {  contrasenia: pin,
         token: token },
      { headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          return Promise.reject(e.response.data.message);
        }
    });

};

export const verifyRecaptcha = async (token) => {
  return axios
    .post("/v1/auth/verify-recaptcha", 
      { token: token },
      { headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          return Promise.reject(e.response.data.message);
        }
    });

};