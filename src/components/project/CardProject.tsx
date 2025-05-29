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
import { Link } from "react-router-dom";
import { ProjectI } from "@/types/project";
import EditProject from "./EditProject";
import DeleteProject from "./DeleteProject";
import StatusLabel from "../label/StatusLabel";
import AvatarUser from "../avatar/AvatarUser";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useAuth } from "@/utils/RoleAuth";

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
  const User = useSelector((state: RootState) => state.auth.user);
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
      <Card className="h-full relative" variant="outlined">
        <>
          <div className="absolute top-0 right-0 z-50">
            {User._id === project.createdBy._id && (
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
            )}
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
              {useAuth(["admin"]) && (
                <MenuItem onClick={() => setOpenDeleteDialog(true)}>
                  <ListItemIcon>
                    <DeleteIcon className="text-red-500" />
                  </ListItemIcon>
                  <span className="text-red-500">Eliminar</span>
                </MenuItem>
              )}
            </Menu>
          </div>
        </>

        <Link to={"/project/" + project._id}>
          <Grid container >
            <Grid
              size={1}
              className="py-0"
              sx={{ backgroundColor: project.color }}
            ></Grid>
            <Grid size={10} className="p-3 ">
              <div>
                <div className="font-semibold text-lg capitalize">
                  {project.name}
                </div>
                <div
                  className="text-sm mb-3  flex items-center"
                  style={{ minHeight: "50px" }}
                >
                  {project.description?.length >= 75
                    ? project.description?.substring(0, 75) + "..."
                    : project.description}
                </div>
                <div style={{ minHeight: "25px" }}>
                  {project.tags.map((tag, tagIndex) => (
                    <Chip
                      key={tagIndex}
                      label={tag.title}
                      className="me-1 capitalize"
                      sx={{ backgroundColor: tag.color, color: "white" }}
                      size="small"
                    />
                  ))}
                </div>

                <div className="my-3">
                  Tareas Abiertas{" "}
                  <span className="font-bold">({project.incompleteTasks})</span>
                </div>
                <div className="text-sm capitalize">
                  Administrador: {project.createdBy.name}
                </div>
                <div className="flex mt-3">
                  {project.collaborators.map((collab, index) => (
                    <div key={collab._id + index} className={"mr-1"}>
                      <AvatarUser user={collab} />
                    </div>
                  ))}
                </div>
              </div>
            </Grid>
          </Grid>

          <Grid container size={12} >
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
        </Link>
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
