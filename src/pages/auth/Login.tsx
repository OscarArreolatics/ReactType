import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Person, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import logo from "@/assets/dragon.png";
import { toast } from "react-toastify";
import usuarios from "@/api/usuario";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@/redux/slices/authSlice";

const Login: React.FC = () => {
  const [User, setUser] = useState<string>("");
  const [Pass, setPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isButtonDisabled = !(User && Pass);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showPassHandler = () => {
    setShowPassword(!showPassword);
  };

  const validarUsuario = () => {
    setLoading(true);
    usuarios
      .ValidarUsuario({ nomina: User, password: Pass })
      .then((result) => {
        if (!result) {
          return;
        }

        if ("code" in result) {
          toast.error(result.message, {
            position: "top-center",
            theme: "colored",
          });
          return;
        }

        if ("Nomina" in result) {
          dispatch(
            login({
              nomina: result.Nomina,
              name: result.Colaborador,
            })
          );
          navigate("/");
          toast.success("Bienvenido !!!", {
            position: "top-center",
            theme: "colored",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Container className="flex justify-center">
        <Card className="my-3" sx={{ minWidth: "35%", borderRadius: "1rem" }}>
          <CardContent>
            <Grid container alignItems="center" justifyContent="center">
              <img src={logo} alt="" width={120} />
            </Grid>
            <Grid container alignItems="center" justifyContent="center">
              <Grid size={1}>
                <Person />
              </Grid>
              <Grid size={11}>
                <TextField
                  id="user"
                  label="Usuario"
                  fullWidth
                  margin="normal"
                  onChange={(e) => setUser(e.target.value)}
                  slotProps={{ htmlInput: { maxLength: 7 } }}
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center" justifyContent="center">
              <Grid size={1}>
                <Lock />
              </Grid>
              <Grid size={11}>
                <TextField
                  id="pass"
                  type={showPassword ? "text" : "password"}
                  label="Contraseña"
                  fullWidth
                  margin="normal"
                  onChange={(e) => setPass(e.target.value)}
                  slotProps={{
                    htmlInput: { maxLength: 90 },
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="description for action"
                            onClick={showPassHandler}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center" justifyContent="center">
              <div className="mt-6">
                <LoadingButton
                  loading={loading}
                  variant="outlined"
                  loadingIndicator="Buscando…"
                  disabled={isButtonDisabled}
                  onClick={validarUsuario}
                >
                  Entrar
                </LoadingButton>
              </div>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Login;
