import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FechaState {
  value: string;
}

const initialState: FechaState = {
  value: 'fecha', 
};

const fechaSlice = createSlice({
  name: 'fecha',
  initialState,
  reducers: {
    // Reducer para establecer un valor específico
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

// Exportamos las acciones
export const { setValue } = fechaSlice.actions;

// Exportamos el reducer
export default fechaSlice.reducer;
