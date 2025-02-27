import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import tagApi, { TagI } from "@/api/tag";
import { toast } from "react-toastify";
import { setTags } from "@/redux/slices/tagSlice";
import { useDispatch } from "react-redux";

interface DeleteTagsProps {
  open: boolean;
  onClose: () => void;
  Tag: TagI;
}

const DeleteTag: React.FC<DeleteTagsProps> = ({ Tag, open, onClose }) => {
  const dispatch = useDispatch();

  const HandleDelete = () => {
    tagApi.deleteTag(Tag._id).then((result) => {
      if (!result) {
        return;
      }

      if (result.code == "NOT_FOUND") {
        toast.error(result.msg, {
          position: "top-center",
          theme: "colored",
        });
        return;
      }

      if (result.code == "COMPLETED") {
        toast.info("Etiqueta eliminada correctamente", {
          position: "top-right",
          theme: "colored",
        });
      }

      fetchTags();
      onClose();
    });
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
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>Eliminar Proyecto</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar la etiqueta&nbsp;
          <strong>{Tag.title}</strong>?
          <div className="mt-3">
            Esta acción:
            <ul className="list-disc ps-4">
              <li>borrara la etiqueta</li>
              <li>borrara borrar todas las estiquetas de los proyectos</li>
            </ul>
          </div>
          <div className="mt-8">
            <strong>Esta acción no se puede deshacer.</strong>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={HandleDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteTag;
