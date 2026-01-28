import axios, { AxiosResponse } from "axios";
import conexion from "./conexion";
import { catchError } from "@/utils/utils";
import { ProjectI, ParamsProject, ProjectTaskReportI } from "@/types/project";
import { CodeCath } from "@/types/codeCath";

const recurso: string = conexion.url + "project/";



const getProjects = async (): Promise<ProjectI[] | null> => {
  try {
    const response: AxiosResponse<ProjectI[] | null> = await axios.get(
      recurso+"user",
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

const getProjectsTaskReport = async (): Promise<ProjectTaskReportI[] | null> => {
  try {
    const response: AxiosResponse<ProjectTaskReportI[] | null> = await axios.get(
      recurso+"taskReport",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    catchError(error);
    return null;
  }
}

export default { getProjects, createProject, getAProject, updateProject, deleteProject, getProjectsTaskReport };
