import { createSlice } from "@reduxjs/toolkit";

export const reducerAuth = createSlice({
  name: 'auth',
  initialState: {
    userData: {
      name: '',
      email: ''
    }
  },
  reducers: {
    setUserData: ({ userData }, { payload }) => {
        userData.name = payload.name;
        userData.email = payload.email;
    }
  }
});

export const {setUserData} = reducerAuth.actions;

export default reducerAuth.reducer;