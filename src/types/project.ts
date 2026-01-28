export interface ProjectI {
  _id: string;
  name: string;
  description: string;
  createdBy: collaborator;
  collaborators: collaborator[];
  status: "activo" | "pausado" | "completado";
  incompleteTasks: number;
  startDate: Date;
  endDate?: Date;
  priority: "alta" | "media" | "baja";
  tags: tag[];
  color: string;
}

export interface collaborator {
  _id: string;
  name: string;
}

export interface tag {
  _id: string;
  title: string;
  color: string;
}

export interface ParamsProject {
  id?: string;
  name: string;
  description: string;
  priority: string;
  color: string;
  startDate: Date | null;
  endDate?: Date | null;
  status?: string;
}

export interface ProjectTaskReportI {
  _id: string;
  name: string;
  description: string;
  createdBy: collaborator;
  completadas: number;
  pendientes: number;
  en_proceso: number;
  canceladas: number;
}