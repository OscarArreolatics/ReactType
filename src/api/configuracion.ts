import axios, { AxiosResponse } from "axios";
import conexion from "./conexion";

const recurso: string = conexion.url + "Configuracion/";

const ObtenerFecha = async (): Promise<string | null> => {
  try {
    const response: AxiosResponse<string> = await axios.get(recurso + "obtener_fecha", {
      headers: conexion.headers
    });
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    
    return null; 
  }
};

export default { ObtenerFecha };
