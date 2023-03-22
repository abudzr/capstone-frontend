import { createSlice } from "@reduxjs/toolkit";

export const reducerApproval = createSlice({
  name: 'approval',
  initialState: {
    listModule:[],
  },
  reducers: {
    setListModule: (state, {payload} ) => {
      state.listModule = payload;
    },
  }
});

export const {setListModule } = reducerApproval.actions;

export default reducerApproval.reducer;