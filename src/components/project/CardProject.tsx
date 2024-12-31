import * as React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Grid from "@mui/material/Grid2";
import {
  Card,
  Chip,
  IconButton,
  MenuItem,
  Menu,
  ListItemIcon,
} from "@mui/material";
import { ProjectI } from "@/api/project";
import EditProject from "./EditProject";
import DeleteProject from "./DeleteProject";
import StatusLabel from "./StatusLabel";

const CardProject: React.FC<{ project: ProjectI }> = ({ project }) => {
  const colorPriority = (priority: string) => {
    let color;
    switch (priority) {
      case "alta":
        color = "bg-red-600";
        break;
      case "media":
        color = "bg-yellow-400";
        break;
      case "baja":
        color = "bg-green-600";
        break;
      default:
        color = "";
        break;
    }
    return color;
  };

  //menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //dialog edit
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  //dialog delete
  const [openDeleteDialog, setOpenDeleteDialog] =
    React.useState<boolean>(false);

  return (
    <>
      <Card className="h-full relative pb-8" variant="outlined">
        <div className="absolute top-0 right-0">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => setOpenDialog(true)}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              Editar
            </MenuItem>
            <MenuItem onClick={() => setOpenDeleteDialog(true)} >
              <ListItemIcon>
                <DeleteIcon className="text-red-500"/>
              </ListItemIcon>
              <span className="text-red-500">Eliminar</span>
            </MenuItem>
          </Menu>
        </div>
        <Grid container sx={{ height: "100%" }}>
          <Grid
            size={1}
            className="py-3"
            sx={{ backgroundColor: project.color }}
          ></Grid>
          <Grid size={10} className="p-3 capitalize">
            <div>
              <div className="font-semibold text-lg capitalize">
                {project.name}
              </div>
              <div className="text-sm mb-3 capitalize">
                {project.description}
              </div>
              <div>
                {project.tags.map((tag, tagIndex) => (
                  <Chip
                    key={tagIndex}
                    label={tag}
                    className="me-1 capitalize"
                    color="success"
                    size="small"
                  />
                ))}
              </div>
              <div className="my-3">
                Tareas Abiertas ({project.tasks.length})
              </div>
              <div className="text-sm capitalize">
                Administrador: Oscar Arreola
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid container size={12} className="absolute bottom-0">
          
          <Grid
            size={{ xs: 12, md: 6 }}
            className={
              colorPriority(project.priority) +
              " text-white text-sm py-1 text-center capitalize flex"
            }
            style={{ alignItems: "center", justifyContent: "center" }}
          >
              Prioridad: {project.priority}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <StatusLabel type={project.status} />
          </Grid>
        </Grid>
      </Card>

      {/* Diálogo de edición */}
      <EditProject
        projectId={project._id}
        open={openDialog}
        onClose={handleCloseDialog}
      />

      {/* Diálogo borrar */}
      <DeleteProject
        projectId={project._id}
        projectName={project.name}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      />
    </>
  );
};

export default CardProject;
