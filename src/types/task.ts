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

export interface ParamsTask {
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