import React, { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  OutlinedInput,
  Chip,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { toast } from "react-toastify";
import project from "@/api/project";
import userApi from "@/api/user";
import { UserCoI } from "@/types/user";
import tagApi from "@/api/tag";
import { TagI } from "@/types/tag";
import "dayjs/locale/es";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { getColorFromText } from "@/utils/utils";

dayjs.extend(localizedFormat);
dayjs.locale("es");

interface NewProjectProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
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
}

const NewProject: React.FC<NewProjectProps> = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    collabs: [],
    tags: [],
    priority: "baja",
    color: "#000000", // Color por defecto
    startDate: dayjs(),
    endDate: null as Dayjs | null,
  });
  const [collabs, setCollabs] = useState<UserCoI[]>([]);
  const [tags, setTags] = useState<TagI[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeCollab = (
    event: SelectChangeEvent<typeof formData.collabs>
  ) => {
    setFormData({ ...formData, collabs: event.target.value as string[] });
  };

  const handleChangeTags = (event: SelectChangeEvent<typeof formData.tags>) => {
    setFormData({ ...formData, tags: event.target.value as string[] });
  };

  const handleDateChange =
    (key: "startDate" | "endDate") => (date: Dayjs | null) => {
      setFormData({ ...formData, [key]: date });
    };

  const handleSave = () => {
    const projectData = {
      name: formData.name,
      description: formData.description,
      collaborators: formData.collabs,
      tags: formData.tags,
      priority: formData.priority,
      color: formData.color,
      startDate: formData.startDate ? formData.startDate.toDate() : null,
      endDate: formData.endDate ? formData.endDate.toDate() : null,
    };

    project
      .createProject(projectData)
      .then((result) => {
        if (!result) {
          return;
        }
        toast.success("Proyecto guardado correctamente", {
          position: "top-right",
          theme: "colored",
        });
        onSave();
        onClose();
      })
      .finally(() => {});
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
    getCollabs();
    getTags();
  }, [getCollabs, getTags]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Nombre del Proyecto"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          multiline
          rows={3}
        />
        <FormControl sx={{ width: "100%", marginTop: "0.5em" }}>
          <InputLabel id="demo-multiple-chip-label">Colaboradores</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={formData.collabs}
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
                        color: "white",
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
            value={formData.tags}
            onChange={handleChangeTags}
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
          value={formData.priority}
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
              value={formData.startDate}
              onChange={handleDateChange("startDate")}
              className="w-full"
              format="DD-MM-YYYY"
            />
          </div>
          <div className="mt-5">
            <DatePicker
              label="Fecha de Finalización"
              value={formData.endDate}
              onChange={handleDateChange("endDate")}
              className="w-full"
              format="DD-MM-YYYY"
            />
          </div>
        </LocalizationProvider>
        <TextField
          fullWidth
          margin="normal"
          label="Color del Proyecto"
          name="color"
          type="color"
          value={formData.color}
          onChange={handleInputChange}
        />
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

export default NewProject;
