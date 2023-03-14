import { createSlice } from "@reduxjs/toolkit";

export const reducerGeneral = createSlice({
  name: 'general',
  initialState: {
    show:false,
  },
  reducers: {
    openDrawer: (state, {payload} ) => {
        state.show = payload;
    }
  }
});

export const {openDrawer} = reducerGeneral.actions;

export default reducerGeneral.reducer;