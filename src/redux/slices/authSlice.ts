import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  email: string;
  name: string;
}

interface LoginPayload {
  user: User;
  token: string;
}

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

// Verifica si ya hay información de usuario en el localStorage
const storedUser = localStorage.getItem('token');
const initialStateFromStorage = storedUser ? { isAuthenticated : true} : initialState;

const authSlice = createSlice({
  name: 'auth',
  initialState: initialStateFromStorage,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.isAuthenticated = true;
      // Guardar en localStorage
      localStorage.setItem('token', JSON.stringify(action.payload.token));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      // Eliminar de localStorage
      localStorage.removeItem('token');
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { login, logout, setAuth } = authSlice.actions;
export default authSlice.reducer;
