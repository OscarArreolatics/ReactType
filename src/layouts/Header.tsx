import { Button, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useEffect, useState } from "react";
import configuracion from "@/api/configuracion";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";

const Header = () => {
  const dispatch = useDispatch();
  const [fecha, setFecha] = useState<string | null>(null);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userName = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchDate = async () => {
      setFecha(await configuracion.ObtenerFecha());
    };

    fetchDate();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
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
          {userName ? "Bienvenido: " + userName.name : ""}
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
