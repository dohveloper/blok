import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

//initial Value
const initialState = {
  id: 100,
};

//Slice
export const idGeneratorSlice = createSlice({
  name: 'idGenerator',
  initialState,
  reducers: {
    generateId: (state) => {
      state.id += 1;
    },
  },
});
export const { generateId } = idGeneratorSlice.actions;
export default idGeneratorSlice.reducer;
