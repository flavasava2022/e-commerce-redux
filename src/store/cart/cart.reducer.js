import { CART_ACTION_TYPE } from "./cart.types";


const CART_INITIAL_STATE = {
  cartData: [],
  openDrawer: false,
  totalPrice: 0,
  totalCount: 0,
};

export const cartReducer = (state= CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPE.SET_OPEN_DRAWER:
      return {
        ...state,
        openDrawer: payload,
      };
      break;
    case CART_ACTION_TYPE.ADD_TO_CART:
      return {
        ...state,
        ...payload,
      };
      break;
    case CART_ACTION_TYPE.ADD_TO_CART_DRAWER:
      return {
        ...state,
        ...payload,
      };
      break;
    case CART_ACTION_TYPE.REMOVE_FROM_CART_DRAWER:
      return {
        ...state,
        ...payload,
      };
      break;
    default:
      return state
      break;
  }
};