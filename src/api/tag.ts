import axios, { AxiosResponse } from "axios";
import conexion from "./conexion";
import { catchError } from "@/utils/utils";

const recurso: string = conexion.url + "tag/";

export interface TagI {
  _id: string;
  title: string;
  color: string;
}

const getTags = async (): Promise<TagI[] | null> => {
  try {
    const response: AxiosResponse<TagI[] | null> = await axios.get(recurso);
    return response.data;
  } catch (error) {
    catchError(error);
    return null;
  }
};

export default { getTags };
