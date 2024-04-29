import { createSlice } from "@reduxjs/toolkit";

const CART_INITIAL_STATE = {
  cartData: [],
  openDrawer: false,
};

export const addToCartHelper = (cartData, item, value) => {
  const found = cartData?.find((element) => element._id === item._id);

  if (found) {
    return cartData?.map((cartItem) => {
      if (cartItem._id === item?._id) {
        return { ...cartItem, quantity: cartItem.quantity + value };
      } else {
        return cartItem;
      }
    });
  } else {
    return [...cartData, { ...item, quantity: value }];
  }
};

export const addToCartDrawerHelper = (cartData, item, value) => {
  return cartData?.map((cartItem) => {
    if (cartItem._id === item?._id) {
      return { ...cartItem, quantity: value + 1 };
    } else {
      return cartItem;
    }
  });
};
export const removeFromCartDrawerHelper = (cartData, item, value) => {
  if (value !== 1) {
    return cartData.map((cartItem) => {
      if (cartItem._id === item?._id) {
        return { ...cartItem, quantity: value - 1 };
      } else {
        return cartItem;
      }
    });
  } else {
    return cartData.filter((cartItem) => cartItem._id !== item?._id);
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    setOpenDrawer(state, action) {
      state.openDrawer = action.payload;
    },
    addToCart(state, action) {
      const { item, value } = action.payload;
      state.cartData = addToCartHelper(state.cartData, item, value);
    },
    addToCartDrawer(state, action) {
      const { item, value } = action.payload;
      state.cartData = addToCartDrawerHelper(state.cartData, item, value);
    },
    removeFromCartDrawer(state, action) {
      const { item, value } = action.payload;
      state.cartData = removeFromCartDrawerHelper(state.cartData, item, value);
    },
  },
});

export const { removeFromCartDrawer,addToCartDrawer,setOpenDrawer, addToCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
