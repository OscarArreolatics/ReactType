import axios, { AxiosResponse } from "axios";
import conexion from "./conexion";
import { catchError } from "@/utils/utils";
import { TaskI, ParamsTask } from "@/types/task";

const recurso: string = conexion.url + "tasks/";

const getTasksUser = async (): Promise<TaskI[] | null> => {
  try {
    const response: AxiosResponse<TaskI[] | null> = await axios.get(
      recurso + "user",
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

const getTasksByProject = async (id: string): Promise<TaskI[] | null> => {
  try {
    const response: AxiosResponse<TaskI[] | null> = await axios.get(
      recurso + "project/" + id,
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

const createTask = async (params: ParamsTask): Promise<TaskI | null> => {
  try {
    const response: AxiosResponse<TaskI | null> = await axios.post(
      recurso,
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

const updateTask = async (
  id: string,
  params: ParamsTask
): Promise<TaskI | null> => {
  try {
    const response: AxiosResponse<TaskI | null> = await axios.put(
      recurso + id,
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

export default { getTasksUser, getTasksByProject, createTask, updateTask };
