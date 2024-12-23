import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/router/ProtectedRoute";
import { useDispatch } from "react-redux";
import auth from "@/api/auth";
import { setAuth } from "@/redux/slices/authSlice";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/Dashboard";

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
      <Route
        path="/dash"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
