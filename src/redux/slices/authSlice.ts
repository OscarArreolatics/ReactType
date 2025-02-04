import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  _id: string;
  email: string;
  name: string;
}

interface LoginPayload {
  user: User;
  isAuthenticated: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false
};

// Verifica si ya hay información de usuario en el localStorage
const storedUser = localStorage.getItem('user');
const initialStateFromStorage = storedUser ? JSON.parse(storedUser) : initialState;

const authSlice = createSlice({
  name: 'auth',
  initialState: initialStateFromStorage,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.isAuthenticated = true;
      // Guardar en localStorage
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      // Eliminar de localStorage
      localStorage.removeItem('user');
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { login, logout, setAuth } = authSlice.actions;
export default authSlice.reducer;
