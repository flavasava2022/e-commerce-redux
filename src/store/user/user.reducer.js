import { USER_ACTION_TYPE } from "./user.types";

const INITIAL_STATE = {
  user: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPE.SIGN_IN_SUCCESS:
      return {
        ...state,
        user: payload,
      };
      break;
          case USER_ACTION_TYPE.SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: null,
      };
      break;
    case USER_ACTION_TYPE.SIGN_IN_FAILED:
    case USER_ACTION_TYPE.SIGN_OUT_FAILED:
    case USER_ACTION_TYPE.SIGN_UP_FAILED:
      return {
        ...state,
        error: payload,
      };
      break;
    default:
      return state;
      break;
  }
};
