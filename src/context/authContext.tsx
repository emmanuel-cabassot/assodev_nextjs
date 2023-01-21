import React, { createContext, useState } from 'react';
import Router from 'next/router';
import { url } from 'inspector';
const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

export const AuthContext = createContext({
  user: null as object | null,
  token: null as string | null,
  refreshToken: () => { },
  login: (formData: any) => { },
  register: (formData: any) => { },
  logout: () => { },
  meInfos: () => { },
  isLoading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<object | null>(null);

  const login = async (formData: any) => {
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(response => response.json())
    //   .then(json => console.log(json))

    fetch('https://api-projectdev.fr/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })

    // try {
    //   setIsLoading(true);
    //   const response = await fetch(`http://5.196.88.154/api/user/login`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(formData)
    //   });
    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log('data', data);
    //     // Enregistre les informations de jeton dans le local storage
    //     localStorage.setItem('token', data.access_token);
    //     localStorage.setItem('refresh_token', data.refresh_token);
    //     setToken(data);
    //     const user = await fetch(`${urlApiNest}/user/me`, {
    //       method: 'GET',

    //       headers: {
    //         'Content-Type': 'application/json',
    //         authorization: `Bearer ${data.access_token}`,
    //       },

    //     });
    //     const userData = await user.json();
    //     setUser(userData);
    //     console.log('userData', userData);
    //     // Redirige l'utilisateur vers la page d'accueil
    //     Router.push('/');
    //   } else if (response.status === 400) {
    //     throw new Error('Invalid email or password');
    //   } else {
    //     throw new Error('Something went wrong');
    //   }
    // } catch (error) {
    //   // Handle error
    // }
  };

  const logout = () => {
    // Supprime les informations de jeton du local storage
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    setToken(null);
    setUser(prevToken => null);
    // Redirige l'utilisateur vers la page de connexion
    Router.push('/');
  };

  const register = async (formData: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${urlApiNest}/user/register`, {
        method: 'POST',
        headers: {

          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const data = await response.json();
        console.log('data', data);
        // Enregistre les informations de jeton dans le local storage
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        setToken(data);
        Router.push('/');
      } else if (response.status === 400) {
        throw new Error('Invalid email or password');
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      // Handle error
    }
  };


  const meInfos = async () => {
    try {
      console.log('on rentre dans meInfos')
      setIsLoading(true);
      const tokenStorage = localStorage.getItem('token');

      if (!tokenStorage) {
        console.log('1');

        return;
      }
      var jwt = require('jsonwebtoken');
      const decoded = jwt.decode(tokenStorage);
      console.log('decoded', decoded);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const tokenLifetime = 1 * 60; // 5 minutes en secondes

      if (currentTimestamp - decoded.exp > tokenLifetime) {
        // Le jeton a expiré
        setToken(null);
        setUser(prevToken => null);
        throw new Error('Token expired');
      }

      const response = await fetch(`${urlApiNest}/user/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${tokenStorage}`,
        },
      });
      if (response.ok) {
        console.log('2');

        const data = await response.json();
        console.log('data', data);
        // Enregistre les informations de jeton dans le local storage
        setUser(prevToken => data);
        setToken(prevToken => tokenStorage);

        Router.push('/');
      } else if (response.status === 400) {

        throw new Error('error status 400');
      } else {

        throw new Error('Something went wrong');
      }
    } catch (error) {

      throw new Error("on est dans le catch et donc la requete n'est pas envoyée");
    }
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      return;
    }
    var jwt = require('jsonwebtoken');
    const decoded = await jwt.decode(localStorage.getItem('token'));
    const idUser = decoded.id;
    console.log('idUser', idUser);

    const response = await fetch(`${urlApiNest}/user/refresh/${refreshToken}/${idUser}`, {
      method: 'GET'
    });
    if (response.ok) {
      const data = await response.json();
      // Enregistre les informations de jeton dans le local storage
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      console.log('refresh_token dans refreshtoken() : ', localStorage.getItem('refresh_token'));

      setToken(data);
      Router.push('/');
    } else if (response.status === 400) {
      throw new Error('Invalid email or password');
    } else {
      throw new Error('Something went wrong');
    }

  };

  const context = {
    token,
    refreshToken,
    user,
    meInfos,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={{ token, refreshToken, login, register, logout, meInfos, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;