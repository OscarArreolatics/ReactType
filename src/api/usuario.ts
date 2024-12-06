import axios, { AxiosResponse } from "axios";
import conexion from "./conexion";
import { catchError } from "@/utils/utils";

const recurso: string = conexion.url + "ConfigPerfil/usuario/";

interface ValidarUsuarioParams {
  nomina: string;
  password: string;
}

export interface UsuarioResponse {
  Nomina: string;
  Colaborador: string;
  Departamento: string;
  Password: string;
  SolicitarPass: boolean | null;
  UsuarioMAVI: string | null;
}

export interface LoginCath {
    code: string,
    message: string
}

const ValidarUsuario = async (
  params: ValidarUsuarioParams
): Promise<UsuarioResponse | LoginCath | null> => {
  try {
    const response: AxiosResponse<UsuarioResponse | LoginCath | null> = await axios.get(
      recurso + "validar",
      {
        params: params,
        headers: conexion.headers,
      }
    );

    return response.data;
  } catch (error) {
    catchError(error);
    return null;
  }
};

export default { ValidarUsuario };
