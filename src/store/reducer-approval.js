import { createSlice } from "@reduxjs/toolkit";

export const reducerApproval = createSlice({
  name: 'approval',
  initialState: {
    listModule:[],
    uuidAproval:null,
  },
  reducers: {
    setListModule: (state, {payload} ) => {
      state.listModule = payload;
    },
    setUuidApproval: (state, {payload} ) => {
      state.uuidAproval = payload;
    },
  }
});

export const {setListModule,setUuidApproval } = reducerApproval.actions;

export default reducerApproval.reducer;