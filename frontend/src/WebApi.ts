import axios from "axios";
import { createContext, useContext } from "react";

const create = () => {
  const login = (login: string, password: string) => {
    return axios.post("https://localhost:7161/api/user/login", { login, password });
  };

  const register = (name: string, login: string, password: string) => {
    return axios.post("https://localhost:7161/api/user/register", { name, login, password });
  };

  return { login, register };
};

export const WebApi = { create };
export type WebApi = ReturnType<typeof create>;

const WebApiContext = createContext<WebApi | undefined>(undefined);

export const WebApiProvider = WebApiContext.Provider;

export const useWebApi = () => {
  const context = useContext(WebApiContext);
  if (context === undefined) {
    throw Error("WebApi context not found in ancestors");
  }

  return context;
};
