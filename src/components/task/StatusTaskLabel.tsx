import React, { useState } from "react";
import AlarmsIcon from "@mui/icons-material/AccessAlarmsOutlined";
import CheckIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PlayIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import BlockIcon from "@mui/icons-material/Block";
import { Menu, Button, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import taskApi from "@/api/task";

interface labelprops {
  type: string;
  idTask: string;
}

const StatusTaskLabel: React.FC<labelprops> = ({ type, idTask }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [tipo, setTipo] = useState<string>(type);
  const BgColor = (() => {
    switch (tipo) {
      case "pendiente":
        return "bg-slate-400";
      case "en progreso":
        return "bg-emerald-400";
      case "completada":
        return "bg-blue-400";
      case "cancelada":
        return "bg-red-400";
      default:
        return "bg-slate-400";
    }
  })();

  const Icon = (() => {
    switch (tipo) {
      case "pendiente":
        return <AlarmsIcon />;
      case "en progreso":
        return <PlayIcon />;
      case "completada":
        return <CheckIcon />;
      case "cancelada":
        return <BlockIcon />;

      default:
        return <AlarmsIcon />;
    }
  })();

  const status = [
    { id: 1, status: "pendiente", color: "bg-slate-400", icon: <AlarmsIcon /> },
    {
      id: 2,
      status: "en progreso",
      color: "bg-emerald-400",
      icon: <PlayIcon />,
    },
    { id: 3, status: "completada", color: "bg-blue-400", icon: <CheckIcon /> },
    { id: 4, status: "cancelada", color: "bg-red-400", icon: <BlockIcon /> },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeStatus = (status: string) => {
    setTipo(status);
    taskApi
      .updateTask(idTask, { status: status })
      .then((result) => {
        if (!result) {
          return;
        }
        toast.success("Estado de tarea actualizado correctamente", {
          position: "top-right",
          theme: "colored",
        });
        handleClose();
      })
      .finally(() => {});
  };

  return (
    <>
      <div
        className={BgColor + " w-full h-full flex justify-center items-center"}
      >
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <div
            className="text-white text-sm py-1 capitalize flex"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <span className="me-2">{Icon}</span> {tipo}
          </div>
        </Button>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {status.map((sta) => (
          <MenuItem
            key={sta.id}
            sx={{ padding: 0 }}
            onClick={() => handleChangeStatus(sta.status)}
          >
            <div
              className={
                sta.color +
                " w-full h-full flex justify-center items-center py-3 px-5 text-white"
              }
            >
              <span className="me-2">{sta.icon}</span> {sta.status}
            </div>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default StatusTaskLabel;
