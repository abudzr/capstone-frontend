import { createSlice } from "@reduxjs/toolkit";

export const reducerAuth = createSlice({
  name: 'auth',
  initialState: {
    isLogin:false,
  },
  reducers: {
    setIslogin: (state, { payload }) => {
        state.isLogin = payload;
    }
  }
});

export const {setIslogin} = reducerAuth.actions;

export default reducerAuth.reducer;