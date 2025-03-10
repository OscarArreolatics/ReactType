import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/router/ProtectedRoute";
import { useDispatch } from "react-redux";
import auth from "@/api/auth";
import { setAuth } from "@/redux/slices/authSlice";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import MyWork from "@/pages/task/MyWork";
import Projects from "@/pages/project/Projects";
import ProjectDetails from "@/pages/project/ProjectDetail"
import Tags from "@/pages/tag/Tags";

const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    
    const checkAuth = async () => {
      try {
        const check = await auth.checkAuth();
        if (check) {
          dispatch(setAuth(check.authenticated))
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        dispatch(setAuth(false))
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Login" element={<Login />} />
      {/* rutas Dashboard */}
      <Route
        path="/mywork"
        element={
          <ProtectedRoute roles={["admin","editor","user"]}>
            <MyWork />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute roles={["admin","editor","user"]}>
            <Projects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/project/:id"
        element={
          <ProtectedRoute roles={["admin","editor","user"]}>
            <ProjectDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tags"
        element={
          <ProtectedRoute roles={["admin","editor"]}>
            <Tags />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
