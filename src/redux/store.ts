import { configureStore } from '@reduxjs/toolkit';
import fechaReducer from '@/redux/slices/fechaSlice'
import authReducer from '@/redux/slices/authSlice'

const store = configureStore({
  reducer: {
    fecha: fechaReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;