import { createSlice } from "@reduxjs/toolkit";



const COMPARE_INITIAL_STATE = {
  compareData: [],
};

  export const addOrRemoveDataFromCompareListHelper = (compareData,item) => {
    const found = compareData.find((element) => element._id === item._id);
    if (found) {
       return compareData.filter(
        (element) => element._id !== item._id
      );
    } else {
      return  [...compareData, item];
    }


  };
export const compareSlice = createSlice({
  name:'compare',
  initialState:COMPARE_INITIAL_STATE,
  reducers:{
addOrRemoveDataFromCompareList(state,action){
  state.compareData = addOrRemoveDataFromCompareListHelper(state.compareData,action.payload)
}
  }
})

export const {addOrRemoveDataFromCompareList} = compareSlice.actions
export const compareReducer = compareSlice.reducer