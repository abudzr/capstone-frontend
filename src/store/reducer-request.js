import { createSlice } from "@reduxjs/toolkit";

export const reducerGeneral = createSlice({
  name: 'request',
  initialState: {
    listData:[],
  },
  reducers: {
    setListData: (state, {payload} ) => {
      if(payload){
        const dataTemp = payload;
        dataTemp.forEach((v,i)=> {
          v.id = v.uuid
          v.no = i+1
        });

        state.listData = dataTemp;
      }
  },
  }
});

export const {setListData} = reducerGeneral.actions;

export default reducerGeneral.reducer;