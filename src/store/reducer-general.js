import { createSlice } from "@reduxjs/toolkit";

export const reducerGeneral = createSlice({
  name: 'general',
  initialState: {
    show:false,
    listMenu:[],
    department:[],
  },
  reducers: {
    openDrawer: (state, {payload} ) => {
        state.show = payload;
    },
    setListMenu: (state, {payload} ) => {
      if(payload){
        const dataTemp = payload[0].roles

        state.department = payload[0].departments;
        state.listMenu = dataTemp[0].permissions;
      }
  },
  }
});

export const {openDrawer, setListMenu} = reducerGeneral.actions;

export default reducerGeneral.reducer;