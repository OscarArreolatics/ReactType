import axios, { AxiosResponse } from "axios";
import conexion from "./conexion";
import { catchError } from "@/utils/utils";

const recurso: string = conexion.url + "tasks/";

export interface TaskI {
  _id: string;
  title: string;
  description: string;
  projectId: string; 
  assignedTo?: string; 
  stage: "planeacion" | "programacion" | "validacion" | "finalizada";
  status: "pendiente" | "en progreso" | "completada" | "cancelada";
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

/* interface ParamsTask {
  id?: string;
  name: string;
  description: string;
  priority: string;
  color: string;
  startDate: Date | null;
  endDate?: Date | null;
  status?: string;
} */


export interface CodeCath {
  code: string,
  msg: string
}

const getTasksUser = async (): Promise<TaskI[] | null> => {
  try {
    const response: AxiosResponse<TaskI[] | null> = await axios.get(
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



export default { getTasksUser};
