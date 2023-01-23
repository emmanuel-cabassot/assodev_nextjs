import React, { createContext, useState, useEffect } from 'react';
import Router from 'next/router';
import { UserInterface } from '../../interfaces/auth/UserInterface';
import { loginReqApi } from '../../api/projectDev/user/login';
import { userMeReqApi } from '../../api/projectDev/user/me';
import { userRegisterReqApi } from '../../api/projectDev/user/register';
import { refreshTokenReqApi } from '../../api/projectDev/user/refreshToken';

const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

export const AuthContext = createContext({
  user: null as UserInterface | null,
  refreshToken: () => { },
  login: (formData: any) => { },
  register: (formData: any) => { },
  logout: () => { },
  meInfos: () => { },
  errorMessage: '',
  isLoading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Fonction de connexion
   * 
   * Enregistre les informations de jeton et les informations de l'utilisateur dans le local storage
   * Met à jour le contexte avec les informations de jeton
   * Récupère les informations de l'utilisateur à partir de l'API
   * Redirige vers la page d'accueil
   * @param {Object} formData - données de connexion (email et mot de passe)
   */
  const login = async (formData: any) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      // Appel à l'API pour se connecter
      const login = await loginReqApi(formData);
      // Enregistre les informations de jeton dans le local storage
      localStorage.setItem('token', login.access_token);
      localStorage.setItem('refresh_token', login.refresh_token);
      const userInfos = await userMeReqApi(login.access_token);
      // Enregistre les informations de l'utilisateur
      setUser(userInfos);
      // Redirige l'utilisateur vers la page d'accueil
      Router.push('/');
    } catch (error: any) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      setUser(prevToken => null);
      setErrorMessage(error?.message);
    }
    finally {
      setIsLoading(false);
    }
  };

  /**
   * Fonction qui déconnecte l'utilisateur
   * 
   * Supprime les informations de jeton du local storage
   * Redirige l'utilisateur vers la home page
   */
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    Router.push('/');
  };

  /**
   * Fonction d'enregistrement de l'utilisateur
   * 
   * Requête à l'API pour enregistrer un nouvel utilisateur
   * Enregistre les informations de jeton dans le local storage
   * Redirige l'utilisateur vers la page d'accueil
   */
  const register = async (formData: any) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      // Appel à l'API pour enregistrer un nouvel utilisateur
      const register = await userRegisterReqApi(formData);
      // Enregistre les informations de jeton dans le local storage
      localStorage.setItem('token', register.access_token);
      localStorage.setItem('refresh_token', register.refresh_token);
      const userInfos = await userMeReqApi(register.access_token);
      // Enregistre les informations de l'utilisateur
      setUser(userInfos);
      // Redirige l'utilisateur vers la page d'accueil
      Router.push('/');
    } catch (error: any) {
      setErrorMessage(error?.message);
    }
    finally {
      setIsLoading(false);
    }
  };

  /**
   * Fonction qui recupere les informations de l'utilisateur
   * 
   * Vérifie si le jeton est valide et non expiré
   * !!!!! Partie non faite: Si le jeton à expiré, on appelle la fonction refreshToken
   * Si le jeton est valide, on appelle la fonction meInfos
   * Enregistre le nouveau jeton d'accès dans le local storage
   * !!!!!A vérifier et annulé si necessaire: Redirige l'utilisateur vers la page d'accueil0
   */
  const meInfos = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const tokenStorage = localStorage.getItem('token');

      if (!tokenStorage) {
        setUser(null);
        return
      }

      var jwt = require('jsonwebtoken');
      const decoded = jwt.decode(tokenStorage);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const tokenLifetime = 5 * 60; // 5 minutes en secondes

      if (currentTimestamp - decoded.exp > tokenLifetime) {
        // Le jeton a expiré
        setUser(null);
        throw new Error('Token expired');
      }

      const userInfos = await userMeReqApi(tokenStorage);
      
        setUser(userInfos);

        Router.push('/');
    } catch (error: any) {

      setErrorMessage(error?.message);
    }
  };

  /**
   * Fonction qui rafraichit le jeton d'accès
   * 
   * Vérifie si le jeton de rafraichissement est valide et non expiré
   * Requête de l'API pour rafraichir le jeton d'accès
   * Enregistre le nouveau jeton d'accès dans le local storage
   */
  const refreshToken = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) throw new Error("No refresh token");

      var jwt = require('jsonwebtoken');
      const decoded = await jwt.decode(localStorage.getItem('token'));
      const idUser = decoded.id;

      const data: any = refreshTokenReqApi(refreshToken, idUser);
      // Enregistre les informations de jeton dans le local storage
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      Router.push('/');
    } catch (error: any) {
      setErrorMessage(error?.message);
    }
    finally {
      setIsLoading(false);
    }
  };

  const context = {
    refreshToken,
    user,
    meInfos,
    login,
    register,
    logout,
    isLoading,
    errorMessage,
  };

  return (
    <AuthContext.Provider value={{ refreshToken, login, register, logout, meInfos, user, isLoading, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;