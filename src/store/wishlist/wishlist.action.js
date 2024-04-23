import { createAction } from "../../utils/reducer/reducer";
import { WISHLIST_ACTION_TYPE } from "./wishlist.types";

  export const addOrRemoveDataFromWishList = (wishListData,item) => {
    const found = wishListData.find((element) => element._id === item._id);
    let newWishListData;
    if (found) {
      newWishListData = wishListData.filter(
        (element) => element._id !== item._id
      );
    } else {
      newWishListData = [...wishListData, item];
    }

    return createAction(WISHLIST_ACTION_TYPE.ADD_OR_REMOVE, newWishListData );
  };