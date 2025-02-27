import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import tagApi from "@/api/tag";

interface TagForm {
  title: string;
  color: string;
}

interface NewTagsProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

const NewTag: React.FC<NewTagsProps> = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState<TagForm>({
    title: "",
    color: "#000000",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    tagApi
      .createTag(formData)
      .then((result) => {
        if (!result) {
          return;
        }
        toast.success("Tag guardada correctamente", {
          position: "top-right",
          theme: "colored",
        });
        onSave();
        onClose();
      })
      .finally(() => {
        ClearData();
      });
  };

  const ClearData = () => {
    setFormData({
      title: "",
      color: "#000000",
    });
  };
  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Crear Nueva etiqueta</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Titulo de Etiqueta"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Color de la Etiqueta"
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
    </>
  );
};

export default NewTag;
