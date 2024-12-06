import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  nomina: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

// Verifica si ya hay información de usuario en el localStorage
const storedUser = localStorage.getItem('user');
const initialStateFromStorage = storedUser ? JSON.parse(storedUser) : initialState;

const authSlice = createSlice({
  name: 'auth',
  initialState: initialStateFromStorage,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      // Eliminar de localStorage
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
