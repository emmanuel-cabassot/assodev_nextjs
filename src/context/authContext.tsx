import React, { createContext, useState } from 'react';
import Router from 'next/router';

export const AuthContext = createContext({
  token: null,
  login: (formData: any) => { },
  register: (formData: any) => { },
  user: null,
  logout: () => { },
  meInfos: () => { },
  isLoading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState(null || Object);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (formData: any) => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/user/login', {
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
        const user = await fetch('http://localhost:3000/user/me', {
          method: 'GET',

          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${data.access_token}`,
          },

        });
        const userData = await user.json();
        setUser(userData);
        console.log('userData', userData);
        // Redirige l'utilisateur vers la page d'accueil
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

  const logout = () => {
    // Supprime les informations de jeton du local storage
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    setToken(null);
    setUser(null);
    // Redirige l'utilisateur vers la page de connexion
    Router.push('/');
  };

  const register = async (formData: any) => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/user/register', {
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
      setIsLoading(true);
      const tokenStorage = localStorage.getItem('token');

      if (!tokenStorage) {
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
        setUser(null);
        throw new Error('Token expired');
      }

      const response = await fetch('http://localhost:3000/user/me', {
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
        console.log('ca passe')
        setUser(data);
        console.log('token', token)
        setToken(tokenStorage);
        console.log('tokenbis', token)
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

  const context = {
    token,
    user,
    meInfos,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout, meInfos, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;