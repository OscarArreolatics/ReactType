import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/auth/Login';
import ProtectedRoute from '@/router/ProtectedRoute';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
    </Routes>
  );
};

export default AppRouter;