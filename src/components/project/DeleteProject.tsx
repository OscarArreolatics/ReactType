import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import project from "@/api/project";
import { useDispatch } from "react-redux";
import { setProjects } from "@/redux/slices/projectSlice";

interface DeleteProjectProps {
  open: boolean;
  onClose: () => void;
  projectName: string;
  projectId: string;
}

const DeleteProject: React.FC<DeleteProjectProps> = ({
  projectId,
  open,
  onClose,
  projectName,
}) => {
  const dispatch = useDispatch();

  const DeleteProject = () => {
    project
      .deleteProject(projectId)
      .then((result) => {
        if (!result) {
          return;
        }
        toast.info("Proyecto eliminado correctamente", {
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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Eliminar Proyecto</DialogTitle>
      <DialogContent>
        ¿Estás seguro de que deseas eliminar el proyecto&nbsp;
        <strong>{projectName}</strong>?
        <div className="mt-3">
          Esta acción:
          <ul className="list-disc ps-4">
            <li>borrara el proyecto</li>
            <li>borrara todas las tareas asociadas a este proyecto</li>
          </ul>
        </div>
        <div className="mt-8">
          <strong>Esta acción no se puede deshacer.</strong>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={DeleteProject} color="error">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProject;
