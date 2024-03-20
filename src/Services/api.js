// src/useApi.js
import { useContext } from "react";
import axios from "axios";
import AuthContext from "../Context/Auth";

export const useApi = () => {
  const { credentials } = useContext(AuthContext);

  // Create an Axios instance inside the hook
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  // Set up your Axios interceptors
  api.interceptors.request.use(
    (config) => {
      if (credentials.username && credentials.password) {
        const token = btoa(`${credentials.username}:${credentials.password}`);
        config.headers["Authorization"] = `Basic ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return api;
};
