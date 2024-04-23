import { CART_ACTION_TYPE, COMPARE_ACTION_TYPE } from "./compare.types";


const COMPARE_INITIAL_STATE = {
  compareData: [],
};

export const compareReducer = (state=COMPARE_INITIAL_STATE, action={}) => {
  const { type, payload } = action;

  switch (type) {
    case COMPARE_ACTION_TYPE.ADD_OR_REMOVE:
      return {
        ...state,
        compareData: payload,
      };
      break;

    default:
      return state
      break;
  }
};