import axios, { AxiosResponse } from "axios";
import conexion from "./conexion";
import { catchError } from "@/utils/utils";

const recurso: string = conexion.url + "project/";

export interface ProjectI {
  _id: string;
  name: string;
  description?: string;
  createdBy: {
    _id: string;
    name: string;
  };
  collaborators: collaborator[];
  status: "activo" | "pausado" | "completado";
  incompleteTasks: number;
  startDate: Date;
  endDate?: Date;
  priority: "alta" | "media" | "baja";
  tags: string[];
  color: string;
}

interface collaborator {
  _id: string;
  name: string;
}

interface ParamsProject {
  id?: string;
  name: string;
  description: string;
  priority: string;
  color: string;
  startDate: Date | null;
  endDate?: Date | null;
  status?: string;
}


export interface CodeCath {
  code: string,
  msg: string
}

const getProjects = async (): Promise<ProjectI[] | null> => {
  try {
    const response: AxiosResponse<ProjectI[] | null> = await axios.get(
      recurso,
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

const getAProject = async (id: string): Promise<ProjectI | null> => {
  try {
    const response: AxiosResponse<ProjectI | null> = await axios.get(
      recurso+id,
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

const createProject = async (
  params: ParamsProject
): Promise<ProjectI | null> => {
  try {
    const response: AxiosResponse<ProjectI | null> = await axios.post(
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

const updateProject = async (id: string,
  params: ParamsProject
): Promise<ProjectI | null> => {
  try {
    const response: AxiosResponse<ProjectI | null> = await axios.put(
      recurso+id,
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

const deleteProject = async (id: string): Promise<CodeCath | null> => {
  try {
    const response: AxiosResponse<CodeCath | null> = await axios.delete(
      recurso+id,
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

export default { getProjects, createProject, getAProject, updateProject, deleteProject };
