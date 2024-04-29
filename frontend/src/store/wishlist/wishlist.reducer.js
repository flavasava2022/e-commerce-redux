import { createSlice } from "@reduxjs/toolkit";



const WISHLIST_INITIAL_STATE = {
  wishlistData: [],
};

  export const addOrRemoveDataFromWishListHelper = (wishlist,item) => {
    const found = wishlist?.find((element) => element._id === item._id);
    if (found) {
       return wishlist?.filter(
        (element) => element._id !== item._id
      );
    } else {
      return  [...wishlist, item];
    }


  };
export const wishlistSlice = createSlice({
  name:'wishlist',
  initialState:WISHLIST_INITIAL_STATE,
  reducers:{
addOrRemoveDataFromWishList(state,action){
  state.wishlistData = addOrRemoveDataFromWishListHelper(state.wishlistData,action.payload)
}
  }
})

export const {addOrRemoveDataFromWishList} = wishlistSlice.actions
export const wishListReducer = wishlistSlice.reducer