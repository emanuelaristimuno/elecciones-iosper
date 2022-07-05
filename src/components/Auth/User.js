import React, { useState, useContext, useEffect, useMemo, createContext, useCallback } from 'react';
import { singInUser, useToken }  from '../../services/Auth/Autenticacion'
import jwt from 'jsonwebtoken'

export const UserContext = createContext(null);

export const UserProvider = (props) => {  
  const [user, setUser] = useState(null);
  const [token, setToken] = useToken();

  useEffect(() => {
    if (token) {
      const decodedToken = jwt.decode(token, {complete: true});
      const isExpired = (decodedToken) ? (decodedToken.payload.exp < ((new Date()).getTime() / 1000)) : true;

      if (!isExpired) {
        setUser(decodedToken.payload.pay)
      }

    }
  }, [token])
  
  const signIn = useCallback(async (username, password) => {
    try {
      const signToken = await singInUser({username: username, password: password})
      if (signToken) {
        const decodedToken = jwt.decode(signToken, {complete: true});
        setToken(signToken)
        setUser(decodedToken.payload.pay)
        return decodedToken.payload.pay
      }else {
        setToken(null)
        setUser(null)
        return null
      }
          
    } catch (err) {
      console.error(err)
      setToken(null)
      setUser(null)
      return null
    }
  }, [setToken, setUser])
  
  const signOut = useCallback(() => {
    setToken(null)
    setUser(null)
  }, [setToken, setUser])
  

  const values = useMemo(() => ({ user, token, signIn, signOut }), [user, token, signIn, signOut])

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUser = () => {  
  const context = useContext(UserContext);
  if (context === undefined) {    
    throw new Error('`useUser` must be within a `UserProvider`');  
  }  
  return context;
}

