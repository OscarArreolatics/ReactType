import { Button, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useEffect, useState } from "react";
//import configuracion from "@/api/configuracion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import auth from "@/api/auth";

const Header = () => {
  const dispatch = useDispatch();
  const [fecha, setFecha] = useState<string | null>(null);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  //const userName = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchDate = async () => {
      const fechaActual = new Date();
      const dia = fechaActual.getDate().toString().padStart(2, "0");
      const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
      const anio = fechaActual.getFullYear().toString();

      const fechaFormateada: string = `${dia}/${mes}/${anio}`;
      setFecha(fechaFormateada);

      /* const fechaServer = await configuracion.ObtenerFecha();
      if (fechaServer) {
        setFecha(fechaServer);
      } */
    };

    fetchDate();
  }, []);

  const handleLogout = () => {
    auth.logout().then((res) => {
      if (res) {
        dispatch(logout());
        navigate("/login");
      }
    });
  };

  return (
    <Paper className="uppercase font-bold text-black text-md p-3">
      <Grid container>
        <Grid
          container
          alignItems="center"
          size={{ xs: 12, md: 5 }}
          className="text-xl"
        >
          {import.meta.env.VITE_APP_TITLE}
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="end"
          size={{ xs: 12, md: 5 }}
        >
          {/* {userName ? "Bienvenido: " + userName.name : ""} */}
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          size={{ xs: 6, md: 1 }}
          className="text-end lg:text-center "
        >
          {fecha}
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          size={{ xs: 6, md: 1 }}
          className="text-end lg:text-center"
        >
          {isAuthenticated ? (
            <Button onClick={handleLogout}>
              <ExitToAppIcon className="text-xl text-black" />
            </Button>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Header;
