import { createSlice } from "@reduxjs/toolkit";

export const reducerGeneral = createSlice({
  name: 'request',
  initialState: {
    listData:[],
    itemListRedux:[],
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
    setItemListRedux: (state, {payload} ) => {
      state.itemListRedux = payload;
    },
    setValueRequest: (state,{payload}) => {
      const newData = [...state.itemListRedux]
      const selected = newData.findIndex((d)=> d.id === payload.id)
      newData[selected][payload.value.name]=payload.value.value
  
      state.itemListRedux = newData;
    },
  }
});

export const {setListData, setItemListRedux, setValueRequest} = reducerGeneral.actions;

export default reducerGeneral.reducer;