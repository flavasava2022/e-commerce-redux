import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  getUserData,
  updateData,
  updateSpecificFields,
} from "../utils/firebase/firebase";
import { UserDataProvider } from "./userContext";

const INITIAL_STATE = {
  cartData: [],
  openDrawer: false,
  totalPrice: 0,
  totalCount: 0,
};
const CART_ACTION_TYPE = {
  SET_OPEN_DRAWER: "SET_OPEN_DRAWER",
  ADD_TO_CART_DRAWER: "ADD_TO_CART_DRAWER",
  REMOVE_FROM_CART_DRAWER: "REMOVE_FROM_CART_DRAWER",
};
const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPE.SET_OPEN_DRAWER:
      return {
        ...state,
        openDrawer: payload,
      };
      break;
    case "ADD_TO_CART":
      return {
        ...state,
        ...payload,
      };
      break;
    case "ADD_TO_CART_DRAWER":
      return {
        ...state,
        ...payload,
      };
      break;
    case "REMOVE_FROM_CART_DRAWER":
      return {
        ...state,
        ...payload,
      };
      break;
    default:
      break;
  }
};
const CartDataProvider = createContext();
function CartProvider({ children }) {
  const { user } = useContext(UserDataProvider);
  const [{ cartData, openDrawer, totalPrice, totalCount }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const setOpenDrawer = (value) => {
    dispatch({ type: CART_ACTION_TYPE.SET_OPEN_DRAWER, payload: value });
  };
  // const getDataFromFireStore = async () => {
  //   const response = await getUserData();

  //   setCartData(response?.cartData);
  // };
  // useEffect(() => {
  //   if (user) {
  //     setTimeout(() => {
  //       getDataFromFireStore();
  //     }, 1000);
  //   } else {
  //     setCartData([]);
  //   }
  // }, [user]);
  // useEffect(() => {
  //   // if (user) {
  //   //   updateSpecificFields("cartData", cartData);
  //   // }
  // }, [cartData]);

  const addToCart = (item, value) => {
    const found = cartData.find((element) => element._id === item._id);
    let newCartData;
    if (found) {
      newCartData = cartData.map((cartItem) => {
        if (cartItem._id === item?._id) {
          return { ...cartItem, quantity: cartItem.quantity + value };
        } else {
          return cartItem;
        }
      });
    } else {
      newCartData = [...cartData, { ...item, quantity: value }];
    }
    let newTotalCount = 0;
    let newTotalPrice = 0;
    newCartData.map((pervState) => {
      newTotalCount = Number(newTotalCount) + Number(pervState?.quantity);
      newTotalPrice =
        Number(newTotalPrice) + Number(pervState?.quantity * pervState?.price);
    });

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        cartData: newCartData,
        totalCount: Number(newTotalCount),
        totalPrice: newTotalPrice,
        openDrawer: true,
      },
    });
  };

  const addToCartDrawer = (item, value) => {
    const newCartData = cartData.map((cartItem) => {
      if (cartItem._id === item?._id) {
        return { ...cartItem, quantity: value + 1 };
      } else {
        return cartItem;
      }
    });
    let newTotalCount = 0;
    let newTotalPrice = 0;
    newCartData.map((pervState) => {
      newTotalCount = Number(newTotalCount) + Number(pervState?.quantity);
      newTotalPrice =
        Number(newTotalPrice) + Number(pervState?.quantity * pervState?.price);
    });

    dispatch({
      type: "ADD_TO_CART_DRAWER",
      payload: {
        cartData: newCartData,
        totalCount: Number(newTotalCount),
        totalPrice: newTotalPrice,
      },
    });
  };

  const removeFromCartDrawer = (item, value) => {
    let newCartData;
    if (value !== 1) {
      newCartData = cartData.map((cartItem) => {
        if (cartItem._id === item?._id) {
          return { ...cartItem, quantity: value - 1 };
        } else {
          return cartItem;
        }
      });
    } else {
      newCartData = cartData.filter((cartItem) => cartItem._id !== item?._id);
    }
    let newTotalCount = 0;
    let newTotalPrice = 0;
    newCartData.map((pervState) => {
      newTotalCount = Number(newTotalCount) + Number(pervState?.quantity);
      newTotalPrice =
        Number(newTotalPrice) + Number(pervState?.quantity * pervState?.price);
    });

    dispatch({
      type: "REMOVE_FROM_CART_DRAWER",
      payload: {
        cartData: newCartData,
        totalCount: Number(newTotalCount),
        totalPrice: newTotalPrice,
      },
    });
  };
  console.log(cartData, totalCount, totalPrice);
  const value = {
    addToCart,
    cartData,
    addToCartDrawer,
    removeFromCartDrawer,
    openDrawer,
    totalCount,
    setOpenDrawer,
    totalPrice,
  };
  return (
    <CartDataProvider.Provider value={value}>
      {children}
    </CartDataProvider.Provider>
  );
}

export default CartProvider;
export { CartDataProvider };
