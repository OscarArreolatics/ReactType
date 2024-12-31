import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Header = () => {
  const [fecha, setFecha] = useState<string | null>(null);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

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

  return (
    <>
      {isAuthenticated ? (
        ""
      ) : (
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
            ></Grid>
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
            ></Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default Header;
