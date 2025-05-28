import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { toast } from "react-toastify";
import Task from "@/api/task";
import projectApi from "@/api/project";
import { ProjectI } from "@/types/project";
import "dayjs/locale/es";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import AvatarProject from "@/components/avatar/AvatarProject";
import AvatarUser from "@/components/avatar/AvatarUser";


// Configuración de `dayjs` para formatos localizados
dayjs.extend(localizedFormat);
dayjs.locale("es");

interface NewTaskProps {
  projId?: string;
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

const NewTask: React.FC<NewTaskProps> = ({ projId, open, onClose, onSave }) => {
  const [projects, setProjects] = useState<ProjectI[]>();
  const [project, setProject] = useState<ProjectI>();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "",
    assignedTo: "",
    stage: "",
    status: "",
    priority: "baja",
    dueDate: dayjs(),
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name == "projectId") {
      changeProjectCollab(value)
    }
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      dueDate: date || dayjs(), // Si `date` es `null`, lo inicializamos con un valor por defecto
    }));
  };


  const changeProjectCollab = (idProj : string) => {
    if (projects) {
      setProject(projects.find( e => e._id === idProj))
    }
  }

  const handleSave = () => {
    const TaskData = {
      title: formData.title,
      description: formData.description,
      projectId: formData.projectId,
      assignedTo: formData.assignedTo,
      stage: formData.stage,
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate.toDate(),
    };

    console.log(TaskData);
    

    Task.createTask(TaskData)
      .then((result) => {
        if (!result) {
          return;
        }
        toast.success("tarea guardada correctamente", {
          position: "top-right",
          theme: "colored",
        });
        onSave();
        onClose();
      })
      .finally(() => {});
  };

  const fetchProjects = useCallback(async () => {
    try {
      if (!projId) {
        const res = await projectApi.getProjects();
        if (res) {
          setProjects(res);
        }
      } else {
        const res = await projectApi.getAProject(projId);
        if (res) {
          setProjects([res]);

          if (res.collaborators.length > 0) {
            setProject(res);
          }

          setFormData((prev) => ({ ...prev, projectId: projId }));
        }
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  }, [projId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Crear Nueva Tarea</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Nombre de la tarea"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Descripción"
          name="description"
          minRows={3}
          value={formData.description}
          onChange={handleInputChange}
          multiline
        />
        
        <TextField
          fullWidth
          margin="normal"
          label="Proyecto"
          name="projectId"
          value={formData.projectId}
          onChange={handleInputChange}
          select
          slotProps={{
            htmlInput: {
              readOnly: projId ? true : false,
            },
          }}
        >
          {projects?.map((project) => (
            <MenuItem value={project._id} key={project._id}>
              <Grid container className="w-full">
                <Grid size={2}>
                  <AvatarProject project={project} />
                </Grid>
                <Grid size={10} className="flex flex items-center capitalize">
                  {project.name}
                </Grid>
              </Grid>
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          margin="normal"
          label="Asignar A"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleInputChange}
          select
          disabled={project? false : true}
        >
          {project ? project?.collaborators.map((collab) => (
            <MenuItem value={collab._id} key={collab._id}>
              <Grid container className="w-full">
                <Grid size={2}>
                  <AvatarUser user={collab} />
                </Grid>
                <Grid size={10} className="flex flex items-center capitalize">
                  {collab.name}
                </Grid>
              </Grid>
            </MenuItem>
          )) : <MenuItem></MenuItem> }
        </TextField>
        <TextField
          fullWidth
          margin="normal"
          label="Etapa"
          name="stage"
          value={formData.stage}
          onChange={handleInputChange}
          select
        >
          <MenuItem value="planeacion">planeacion</MenuItem>
          <MenuItem value="programacion">programacion</MenuItem>
          <MenuItem value="validacion">validacion</MenuItem>
          <MenuItem value="finalizada">finalizada</MenuItem>
        </TextField>

        <TextField
          fullWidth
          margin="normal"
          label="Estatus"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          select
        >
          <MenuItem value="pendiente">pendiente</MenuItem>
          <MenuItem value="en progreso">en progreso</MenuItem>
          <MenuItem value="completada">completada</MenuItem>
          <MenuItem value="cancelada">cancelada</MenuItem>
        </TextField>

        <TextField
          fullWidth
          margin="normal"
          label="Prioridad"
          name="priority"
          value={formData.priority}
          onChange={handleInputChange}
          select
        >
          <MenuItem value="alta">Alta</MenuItem>
          <MenuItem value="media">Media</MenuItem>
          <MenuItem value="baja">Baja</MenuItem>
        </TextField>

        <LocalizationProvider dateAdapter={AdapterDayjs}  adapterLocale="es">
          <div className="mt-3">
            <DatePicker
              label="Fecha de vencimiento"
              value={formData.dueDate}
              onChange={handleDateChange}
              className="w-full"
               format="DD-MM-YYYY"
            />
          </div>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTask;
