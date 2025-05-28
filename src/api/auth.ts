import axios, { AxiosResponse } from "axios";
import conexion from "./conexion";
import { catchError } from "@/utils/utils";
import { ValidarUsuarioParams, UsuarioResponse, checkAuthRes } from "@/types/auth";
import { CodeCath } from "@/types/codeCath";

const recurso: string = conexion.url + "auth/";
axios.defaults.withCredentials = true;



const ValidarUsuario = async (
  params: ValidarUsuarioParams
): Promise<UsuarioResponse | CodeCath | null> => {
  try {
    const response: AxiosResponse<UsuarioResponse | CodeCath | null> = await axios.post(
      recurso + "login",
      params,
      conexion.headers
    );
    return response.data;
  } catch (error) {
    catchError(error);
    return null;
  }
};

const logout = async (): Promise<CodeCath | null> => {
  try {
    const response: AxiosResponse<CodeCath | null> = await axios.post(
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
