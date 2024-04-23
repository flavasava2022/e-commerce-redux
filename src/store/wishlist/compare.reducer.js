import { WISHLIST_ACTION_TYPE } from "./wishlist.types";


const WISHLIST_INITIAL_STATE = {
  wishlistData: [],
};

export const wishlistReducer = (state=WISHLIST_INITIAL_STATE, action={}) => {
  const { type, payload } = action;

  switch (type) {
    case WISHLIST_ACTION_TYPE.ADD_OR_REMOVE:
      return {
        ...state,
        wishlistData: payload,
      };
      break;

    default:
      return state
      break;
  }
};