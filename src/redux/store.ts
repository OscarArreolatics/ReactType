import { configureStore } from '@reduxjs/toolkit';
import fechaReducer from '@/redux/slices/fechaSlice'
import authReducer from '@/redux/slices/authSlice'
import projectReducer from '@/redux/slices/projectSlice'
import TagReducer from '@/redux/slices/tagSlice'

const store = configureStore({
  reducer: {
    fecha: fechaReducer,
    auth: authReducer,
    projects: projectReducer,
    tags: TagReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;