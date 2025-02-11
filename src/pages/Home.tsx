import React from "react";
import Grid from "@mui/material/Grid2";
import Login from "./auth/Login";

const Home: React.FC = () => {
  return (
    <>
      <Grid container className="w-full">
        <Grid  size={{ xs: 12, md: 6 }}>
          <div className="bg-blue-500 text-white h-full div-inclinado flex justify-center items-center text-center">
            <h1 className="text-3xl font-bold uppercase">Bienvenido a task control</h1>
          </div>
        </Grid>
        <Grid  size={{ xs: 12, md: 6 }} className="flex justify-center items-center">
          <Login/>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
