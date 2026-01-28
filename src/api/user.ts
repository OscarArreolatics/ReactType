import axios, { AxiosResponse } from "axios";
import conexion from "./conexion";
import { catchError } from "@/utils/utils";
import { UserCoI, UserCoIParams } from "@/types/user";

const recurso: string = conexion.url + "user/";

const getUser = async (): Promise<UserCoI[] | null> => {
  try {
    const response: AxiosResponse<UserCoI[] | null> = await axios.get(recurso);

    return response.data;
  } catch (error) {
    catchError(error);
    return null;
  }
};

const createUser = async (params: UserCoIParams): Promise<UserCoI | null> => {
  try {
    const response: AxiosResponse<UserCoI | null> = await axios.post(
      recurso+"register",
      params,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    catchError(error);
    return null;
  }
};

export default { getUser, createUser };
