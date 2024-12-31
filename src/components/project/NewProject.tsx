import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import project from "@/api/project";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

// Configuración de `dayjs` para formatos localizados
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
dayjs.locale();

interface NewProjectProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

const NewProject: React.FC<NewProjectProps> = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "baja",
    color: "#000000", // Color por defecto
    startDate: dayjs(),
    endDate: null as Dayjs | null,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange =
    (key: "startDate" | "endDate") => (date: Dayjs | null) => {
      setFormData({ ...formData, [key]: date });
    };

  const handleSave = () => {
    const projectDate = {
      name: formData.name,
      description: formData.description,
      priority: formData.priority,
      color: formData.color,
      startDate: formData.startDate ? formData.startDate.toDate() : null,
      endDate: formData.endDate ? formData.endDate.toDate() : null,
    };

    project
      .createProject(projectDate)
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="mt-3">
            <DatePicker
              label="Fecha de Inicio"
              value={formData.startDate}
              onChange={handleDateChange("startDate")}
              className="w-full"
            />
          </div>
          <div className="mt-5">
            <DatePicker
              label="Fecha de Finalización"
              value={formData.endDate}
              onChange={handleDateChange("endDate")}
              className="w-full"
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
