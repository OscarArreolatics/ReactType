import axios, { AxiosResponse } from "axios";
import conexion from "./conexion";
import { catchError } from "@/utils/utils";

const recurso: string = conexion.url + "tasks/";

export interface TaskI {
  _id: string;
  title: string;
  description: string;
  projectId: {
    _id: string;
    name: string;
  };
  assignedTo?: assignedTo;
  stage: "planeacion" | "programacion" | "validacion" | "finalizada";
  status: "pendiente" | "en progreso" | "completado" | "cancelada";
  priority: "alta" | "media" | "baja";
  dueDate?: Date;
  completedAt: Date;
  attachments: string[];
  comments: {
    userId: string;
    comment: string;
    createdAt: Date;
  }[];
  activityLog: {
    action: string;
    userId: string;
    timestamp: Date;
  }[];
}

export interface assignedTo {
  _id: string;
  name: string;
}

interface ParamsTask {
  id?: string;
  title?: string;
  description?: string;
  projectId?: string;
  assignedTo?: string;
  stage?: string;
  status?: string;
  priority?: string;
  dueDate?: Date;
}

export interface CodeCath {
  code: string;
  msg: string;
}

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
