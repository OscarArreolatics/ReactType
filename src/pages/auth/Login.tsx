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
import usuarios from "@/api/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@/redux/slices/authSlice";
//import { validarExpresion } from "@/utils/utils";

const Login: React.FC = () => {
  const [User, setUser] = useState<string>("");
  const [Pass, setPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isButtonDisabled: boolean = !(User && Pass);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validarUsuario = () => {
    setLoading(true);
    usuarios
      .ValidarUsuario({ email: User, password: Pass })
      .then((result) => {
        if (!result) {
          return;
        }

        if ("code" in result) {
          toast.error(result.msg, {
            position: "top-center",
            theme: "colored",
          });
          return;
        }

        dispatch(
          login({
            user: {
              _id: result.user._id,
              email: result.user.email,
              name: result.user.name,
            },
            isAuthenticated: true,
          })
        );
      
        toast.success("Bienvenido !!!", {
          position: "top-right",
          theme: "colored",
        });
      })
      .finally(() => {
        setLoading(false);
        navigate("/mywork");
      });
  };

  return (
    <>
      <Container className="flex justify-center items-center">
        <Card className="my-3 w-full md:w-2/4 h-1/2" sx={{ borderRadius: "1rem" }}>
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
                  label="Email"
                  fullWidth
                  margin="normal"
                  //onKeyDown={(e) => validarExpresion(e, /^e\d*$/i)}
                  onChange={(e) => setUser(e.target.value)}
                  slotProps={{ htmlInput: { maxLength: 30 } }}
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
                            onClick={() => setShowPassword(!showPassword)}
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
                  loadingIndicator="Entrar…"
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
