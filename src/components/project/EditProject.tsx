import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import project from "@/api/project";
import "dayjs/locale/es";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useDispatch } from "react-redux";
import { setProjects } from "@/redux/slices/projectSlice";

dayjs.extend(localizedFormat);
dayjs.locale("es");

interface EditProjectProps {
  projectId: string;
  open: boolean;
  onClose: () => void;
}

const EditProject: React.FC<EditProjectProps> = ({
  projectId,
  open,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    priority: "baja",
    color: "#000000", // Color por defecto
    startDate: dayjs(),
    endDate: null as Dayjs | null,
    status: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleDateChange =
    (key: "startDate" | "endDate") => (date: Dayjs | null) => {
      setProjectData({ ...projectData, [key]: date });
    };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await project.getAProject(projectId);
        if (res) {
          setProjectData({
            name: res.name,
            description: res.description ? res.description : "",
            priority: res.priority,
            color: res.color,
            startDate: dayjs(res.startDate),
            endDate: dayjs(res.endDate),
            status: res.status,
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    if (open) {
      setLoading(true);
      fetchProject();
    }
  }, [open, projectId]);

  const handleSave = () => {
    const projectDate = {
      name: projectData.name,
      description: projectData.description,
      priority: projectData.priority,
      color: projectData.color,
      startDate: projectData.startDate ? projectData.startDate.toDate() : null,
      endDate: projectData.endDate ? projectData.endDate.toDate() : null,
      status: projectData.status,
    };

    project
      .updateProject(projectId, projectDate)
      .then((result) => {
        if (!result) {
          return;
        }
        toast.success("Proyecto actualizado correctamente", {
          position: "top-right",
          theme: "colored",
        });
        fetchProjects();
        onClose();
      })
      .finally(() => {});
  };

  const fetchProjects = async () => {
    try {
      const res = await project.getProjects();
      if (res) {
        dispatch(setProjects(res));
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Proyecto</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="Nombre del Proyecto"
              name="name"
              value={projectData.name}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Descripción"
              name="description"
              value={projectData.description}
              onChange={handleInputChange}
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Prioridad"
              name="priority"
              value={projectData.priority}
              onChange={handleInputChange}
              select
            >
              <MenuItem value="alta">Alta</MenuItem>
              <MenuItem value="media">Media</MenuItem>
              <MenuItem value="baja">Baja</MenuItem>
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <div className="mt-3">
                <DatePicker
                  label="Fecha de Inicio"
                  value={projectData.startDate}
                  onChange={handleDateChange("startDate")}
                  className="w-full"
                  format="DD-MM-YYYY"
                />
              </div>
              <div className="mt-5">
                <DatePicker
                  label="Fecha de Finalización"
                  value={projectData.endDate}
                  onChange={handleDateChange("endDate")}
                  className="w-full"
                  format="DD-MM-YYYY"
                />
              </div>
            </LocalizationProvider>
            <TextField
              fullWidth
              margin="normal"
              label="Estado"
              name="status"
              value={projectData.status}
              onChange={handleInputChange}
              select
              className="capitalize"
            >
              <MenuItem value="activo">activo</MenuItem>
              <MenuItem value="pausado">pausado</MenuItem>
              <MenuItem value="completado">completado</MenuItem>
            </TextField>
            <TextField
              fullWidth
              margin="normal"
              label="Color del Proyecto"
              name="color"
              type="color"
              value={projectData.color}
              onChange={handleInputChange}
            />
          </>
        )}
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

export default EditProject;
