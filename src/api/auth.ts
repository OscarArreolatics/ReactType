import axios, { AxiosResponse } from "axios";
import conexion from "./conexion";
import { catchError } from "@/utils/utils";

const recurso: string = conexion.url + "auth/";
axios.defaults.withCredentials = true;

interface ValidarUsuarioParams {
  email: string;
  password: string;
}

interface userInfo {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface checkAuthRes {
  authenticated: boolean;
}

export interface UsuarioResponse {
  token: string;
  user: userInfo;
}

export interface LoginCath {
    code: string,
    msg: string
}

const ValidarUsuario = async (
  params: ValidarUsuarioParams
): Promise<UsuarioResponse | LoginCath | null> => {
  try {
    const response: AxiosResponse<UsuarioResponse | LoginCath | null> = await axios.post(
      recurso + "login",
      params,
      conexion.headers
    );
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    catchError(error);
    return null;
  }
};

const logout = async (): Promise<LoginCath | null> => {
  try {
    const response: AxiosResponse<LoginCath | null> = await axios.post(
      recurso + "logout",
      conexion.headers
    );
    return response.data;
  } catch (error) {
    catchError(error);
    return null;
  }
};

const checkAuth = async (): Promise<checkAuthRes | null> => {
  try {
    const response: AxiosResponse<checkAuthRes | null> = await axios.get(
      recurso + "check",
      {
        withCredentials: true, // Incluye las cookies en la solicitud
      }
    );
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    //catchError(error);
    return null;
  }
}

export default { ValidarUsuario, logout, checkAuth };
