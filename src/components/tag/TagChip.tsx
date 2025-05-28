import React, { useState } from "react";
import { TagI } from "@/types/tag";
import { Chip, MenuItem, Menu, ListItemIcon } from "@mui/material";
import {
  MoreVert,
  EditOutlined,
  DeleteOutlineOutlined,
} from "@mui/icons-material";
import DeleteTag from "./TagDelete";
import EditTag from "./TagEdit";

interface params {
  tag: TagI;
}

const TagChip: React.FC<params> = ({ tag }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openEdit, setOpenEdit] = React.useState<boolean>(false);
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Chip
        key={tag._id}
        label={tag.title}
        sx={{
          backgroundColor: tag.color,
          color: "white",
          marginRight: "10px",
          fontSize: "18px",
          padding: "5px"
        }}
        onDelete={handleClick}
        deleteIcon={<MoreVert />}
      />
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
        <MenuItem onClick={() => setOpenEdit(true)}>
          <ListItemIcon>
            <EditOutlined />
          </ListItemIcon>
          Editar
        </MenuItem>
        <MenuItem onClick={() => setOpenDelete(true)}>
          <ListItemIcon>
            <DeleteOutlineOutlined className="text-red-500" />
          </ListItemIcon>
          <span className="text-red-500">Eliminar</span>
        </MenuItem>
      </Menu>

      {/* dialog delete tag */}
      <DeleteTag
        Tag={tag}
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      />

      {/* dialog update tag */}
      <EditTag
        Tag={tag}
        open={openEdit}
        onClose={() => setOpenEdit(false)}
      />
    </>
  );
};

export default TagChip;
