import React, { useState } from "react";
import { Menu, Button, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import taskApi from "@/api/task";
interface labelprops {
  priority: string;
  idTask: string;
}

const PriorityLabel: React.FC<labelprops> = ({ idTask, priority }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [priori, setPriori] = useState<string>(priority);
  const BgColor = (() => {
    switch (priori) {
      case "alta":
        return "bg-red-600";
      case "media":
        return "bg-yellow-400";
      case "baja":
        return "bg-green-600";
      default:
        return "bg-slate-400";
    }
  })();

  const prioridad = [
    { id: 1 + "prio", prio: "alta", color: "bg-red-600" },
    {
      id: 2 + "prio",
      prio: "media",
      color: "bg-yellow-400",
    },
    { id: 3 + "prio", prio: "baja", color: "bg-green-600" },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePriority = (priority: string) => {
    setPriori(priority);
    taskApi
      .updateTask(idTask, { priority: priority })
      .then((result) => {
        if (!result) {
          return;
        }
        toast.success("prioridad de tarea actualizada correctamente", {
          position: "top-right",
          theme: "colored",
        });
        handleClose();
      })
      .finally(() => {});
  };
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ padding: 0, margin: 0}}
        className="w-full h-full"
      >
        <div
          className={
            BgColor + " w-full h-full flex justify-center items-center"
          }
        >
          <div
            className="text-white text-sm py-1 capitalize flex"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            {priori}
          </div>
        </div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {prioridad.map((prio) => (
          <MenuItem
            key={prio.id}
            sx={{ padding: 0 }}
            onClick={() => handleChangePriority(prio.prio)}
          >
            <div
              className={
                prio.color +
                " w-full h-full flex justify-center items-center py-3 px-12 text-white"
              }
            >
              {prio.prio}
            </div>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default PriorityLabel;
