import axios, { AxiosResponse } from "axios";
import conexion from "./conexion";
import { catchError } from "@/utils/utils";

const recurso: string = conexion.url + "user/";

export interface UserCoI {
    _id: string;
    name: string;
}

const getUser = async (): Promise<UserCoI[] | null> => {
    try {
      const response: AxiosResponse<UserCoI[] | null> = await axios.get(
        recurso
      );
  
      return response.data;
    } catch (error) {
      catchError(error);
      return null;
    }
  };

export default { getUser}