import axios, { AxiosResponse } from "axios";
import conexion from "./conexion";
import { catchError } from "@/utils/utils";


const recurso: string = conexion.url + "Configuracion/";

const ObtenerFecha = async (): Promise<string | null> => {
  try {
    const response: AxiosResponse<string> = await axios.get(recurso + "obtener_fecha", {
      headers: conexion.headers
    });
    
    return response.data;
  } catch (error) {
    catchError(error)
    return null; 
  }
};

export default { ObtenerFecha };
