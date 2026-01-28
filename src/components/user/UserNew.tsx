import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  MenuItem,
} from "@mui/material";
import user from "@/api/user";
import { toast } from "react-toastify";

interface UserForm {
  name: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
}
interface NewUserProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

const UserNew: React.FC<NewUserProps> = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = React.useState<UserForm>({
    name: "",
    email: "",
    role: "user",
    password: "",
    confirmPassword: "",
  });

  const [ErrorMsg, setErrorMsg] = React.useState<string>("");

  const roles = ["user", "editor", "admin"];

  const ValidateInputs = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return false;
    }

    if (!regex.test(formData.email)) {
      return false;
    }

    if (formData.password.length < 6) {
      return false;
    }

    return true;
  };

  const HandleSave = () => {
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden.");
      return;
    }

    user
      .createUser({
        name: formData.name,
        email: formData.email,
        role: formData.role,
        password: formData.password,
      })
      .then((result) => {
        console.log("Usuario creado:", result);
        
        if (!result) {
          return;
        }
        toast.success("Usuario guardada correctamente", {
          position: "top-right",
          theme: "colored",
        });

        onSave();
        onClose();
      })
      .catch((error) => {
        console.error("Error al crear el usuario:", error);
      })
      .finally(() => {
        ClearData();
      });
   
  };

  const HandleClose = () => {
    onClose();
    ClearData();
  };

  const ClearData = () => {
    setFormData({
      name: "",
      email: "",
      role: "user",
      password: "",
      confirmPassword: "",
    });
    setErrorMsg("");
  };

  return (
    <>
      <Dialog open={open} onClose={HandleClose} fullWidth maxWidth="sm">
        <DialogTitle>Nuevo Usuario</DialogTitle>
        <form>
          <DialogContent>
            <TextField
              autoFocus
              margin="normal"
              name="name"
              label="Nombre"
              type="text"
              fullWidth
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              margin="normal"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              margin="normal"
              name="password"
              label="Contraseña"
              type="password"
              fullWidth
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <TextField
              margin="normal"
              name="confirmPassword"
              label="Confirmar Contraseña"
              type="password"
              fullWidth
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <TextField
              select
              margin="normal"
              name="role"
              label="Rol"
              fullWidth
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              {roles.map((role) => (
                <MenuItem value={role} key={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </MenuItem>
              ))}
            </TextField>
            {ErrorMsg && (
              <div style={{ color: "red", marginTop: "10px" }}>{ErrorMsg}</div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={HandleClose}>Cancelar</Button>
            <Button onClick={HandleSave} disabled={!ValidateInputs()}>
              Guardar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
export default UserNew;
