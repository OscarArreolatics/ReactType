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
import tagApi, { TagI } from "@/api/tag";
import { setTags } from "@/redux/slices/tagSlice";
import { useDispatch } from "react-redux";

interface TagForm {
  title: string;
  color: string;
}

interface EditTagsProps {
  open: boolean;
  onClose: () => void;
  Tag: TagI;
}

const EditTag: React.FC<EditTagsProps> = ({ Tag, open, onClose }) => {
    const dispatch = useDispatch();
  const [formData, setFormData] = useState<TagForm>(Tag);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const EditSave = () => {
    tagApi
      .updateTag(Tag._id, formData)
      .then((result) => {
        if (!result) {
          return;
        }
        toast.success("Tag Actializada correctamente", {
          position: "top-right",
          theme: "colored",
        });
        fetchTags()
        onClose();
      })
  };

  const fetchTags = async () => {
      try {
        const res = await tagApi.getTags();
        if (res) {
          dispatch(setTags(res));
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Editar etiqueta</DialogTitle>
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
          <Button onClick={EditSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditTag;
