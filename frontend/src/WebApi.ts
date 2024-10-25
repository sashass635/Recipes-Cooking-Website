/*import axios from "axios";
import { createContext, PropsWithChildren, useContext } from "react";

const create = () => {
  const login = (login: string, password: string) => {
    return axios.post("https://localhost:7161/api/user/login", { login, password });
  };

  const register = (login: string, password: string) => {
    return axios.post("https://localhost:7161/api/user/register", { login, password });
  };

  return { login, register };
};

export const WebApi = { create };

export type WebApi = ReturnType<typeof create>;

const WebApiContext = createContext<WebApi>;

export const  WebApiProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <WebApiContext.Provider value={WebApi}>{children}</WebApiContext.Provider>;
};
export const useWebApi = () => useContext(WebApiContext);
*/
