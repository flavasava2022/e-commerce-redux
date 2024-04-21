import {
  Children,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { UserDataProvider } from "./userContext";
import { getUserData, updateSpecificFields } from "../utils/firebase/firebase";
import { type } from "@testing-library/user-event/dist/type";
const wishlistDataProvider = createContext();
const INITIAL_STATE = {
  wishlistData: [],
};
const WISHLIST_ACTION_TYPE = {
  ADD_OR_REMOVE: "ADD_OR_REMOVE",
};
const wishlistReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case WISHLIST_ACTION_TYPE.ADD_OR_REMOVE:
      return {
        ...state,
        wishlistData: payload,
      };
      break;

    default:
      break;
  }
};
function WishlistProvider({ children }) {
  const [{ wishlistData }, dispatch] = useReducer(
    wishlistReducer,
    INITIAL_STATE
  );
  // const { user } = useContext(UserDataProvider);
  // const getDataFromFireStore = async () => {
  //   const response = await getUserData();

  //   setWishlistData(response?.wishlistData);
  // };
  // useEffect(() => {
  //   if (user) {
  //     setTimeout(() => {
  //       getDataFromFireStore();
  //     }, 1000);
  //   } else {
  //     setWishlistData([]);
  //   }
  // }, [user]);
  // useEffect(() => {
  //   if (user) {
  //     updateSpecificFields("wishlistData", wishlistData);
  //   }
  // }, [wishlistData]);
  const addOrRemoveDataFromWishList = (item) => {
    const found = wishlistData.find((element) => element._id === item._id);
    let newWishListData;
    if (found) {
      newWishListData = wishlistData.filter(
        (element) => element._id !== item._id
      );
    } else {
      newWishListData = [...wishlistData, item];
    }

    dispatch({ type: "ADD_OR_REMOVE", payload: newWishListData });
  };

  const value = { wishlistData, addOrRemoveDataFromWishList };
  return (
    <wishlistDataProvider.Provider value={value}>
      {children}
    </wishlistDataProvider.Provider>
  );
}

export default WishlistProvider;
export { wishlistDataProvider };
