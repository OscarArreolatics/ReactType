import React, { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Chip,
  OutlinedInput,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { toast } from "react-toastify";
import project from "@/api/project";
import "dayjs/locale/es";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useDispatch } from "react-redux";
import { setProjects } from "@/redux/slices/projectSlice";
import userApi from "@/api/user";
import { UserCoI } from "@/types/user";
import tagApi from "@/api/tag";
import { TagI } from "@/types/tag";
import { getColorFromText } from "@/utils/utils";

dayjs.extend(localizedFormat);
dayjs.locale("es");

interface EditProjectProps {
  projectId: string;
  open: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  description: string;
  collabs: string[]; // Define explícitamente el tipo del array
  tags: string[];
  priority: string;
  color: string;
  startDate: Dayjs;
  endDate: Dayjs | null;
  status: string;
}

const EditProject: React.FC<EditProjectProps> = ({
  projectId,
  open,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState<FormData>({
    name: "",
    description: "",
    collabs: [],
    tags: [],
    priority: "baja",
    color: "#000000", // Color por defecto
    startDate: dayjs(),
    endDate: null as Dayjs | null,
    status: "",
  });

  const [collabs, setCollabs] = useState<UserCoI[]>([]);
  const [tags, setTags] = useState<TagI[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleDateChange =
    (key: "startDate" | "endDate") => (date: Dayjs | null) => {
      setProjectData({ ...projectData, [key]: date });
    };

  const handleChangeCollab = (
    event: SelectChangeEvent<typeof projectData.collabs>
  ) => {
    setProjectData({ ...projectData, collabs: event.target.value as string[] });
  };

  const handleChangeTag = (
    event: SelectChangeEvent<typeof projectData.tags>
  ) => {
    setProjectData({ ...projectData, tags: event.target.value as string[] });
  };

  const getCollabs = useCallback(async () => {
    try {
      const collabs = await userApi.getUser();
      if (collabs) {
        setCollabs(collabs);
      }
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  }, []);

  const getTags = useCallback(async () => {
    try {
      const tags = await tagApi.getTags();
      if (tags) {
        setTags(tags);
      }
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  }, []);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await project.getAProject(projectId);
        if (res) {
          const collabs: string[] = res.collaborators.map((col) => col._id);
          const tags: string[] = res.tags.map((tag) => tag._id);
          setProjectData({
            name: res.name,
            collabs: collabs,
            tags: tags,
            description: res.description ? res.description : "",
            priority: res.priority,
            color: res.color,
            startDate: dayjs(res.startDate),
            endDate: dayjs(res.endDate),
            status: res.status,
          });
          setLoading(false);
          getCollabs();
          getTags();
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    if (open) {
      setLoading(true);
      fetchProject();
    }
  }, [open, projectId, getCollabs, getTags]);

  const handleSave = () => {
    const projectDate = {
      name: projectData.name,
      description: projectData.description,
      collaborators: projectData.collabs,
      tags: projectData.tags,
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
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-chip-label">
                Colaboradores
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={projectData.collabs}
                onChange={handleChangeCollab}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((id) => {
                      const collab = collabs.find((c) => c._id === id);
                      return collab ? (
                        <Chip
                          key={id}
                          label={collab.name}
                          sx={{
                            backgroundColor: getColorFromText(collab._id),
                            color: "white"
                          }}
                        />
                      ) : null;
                    })}
                  </Box>
                )}
              >
                {collabs.map((collab) => (
                  <MenuItem key={collab._id} value={collab._id}>
                    <span className="mr-3">{collab.name}</span>
                    <Chip
                      sx={{
                        backgroundColor: getColorFromText(collab._id),
                        width: "15px",
                        height: "15px",
                      }}
                    ></Chip>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "100%", marginTop: "1em" }}>
              <InputLabel id="demo-multiple-tag-label">Etiquetas</InputLabel>
              <Select
                labelId="demo-multiple-tag-label"
                id="demo-multiple-tag"
                multiple
                value={projectData.tags}
                onChange={handleChangeTag}
                input={<OutlinedInput id="select-multiple-tag" label="tag" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((id) => {
                      const tag = tags.find((c) => c._id === id);
                      return tag ? (
                        <Chip
                          key={id}
                          label={tag.title}
                          sx={{ backgroundColor: tag.color, color: "white" }}
                        />
                      ) : null;
                    })}
                  </Box>
                )}
              >
                {tags.map((tag) => (
                  <MenuItem key={tag._id} value={tag._id}>
                    {tag.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
