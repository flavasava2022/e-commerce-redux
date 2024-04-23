import { createAction } from "../../utils/reducer/reducer";
import { CART_ACTION_TYPE } from "./cart.types";

export const setOpenDrawer = (bol) =>
  createAction(CART_ACTION_TYPE.SET_OPEN_DRAWER, bol);

export const addToCart = (cartData, item, value) => {
  console.log(cartData)
  const found = cartData?.find((element) => element._id === item._id);
  let newCartData;
  if (found) {
    newCartData = cartData?.map((cartItem) => {
      if (cartItem._id === item?._id) {
        return { ...cartItem, quantity: cartItem.quantity + value };
      } else {
        return cartItem;
      }
    });
  } else {
    newCartData = [...cartData, { ...item, quantity: value }];
  }
  const newTotalPrice = newCartData.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  );
  const newTotalCount = newCartData.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  return createAction(CART_ACTION_TYPE.ADD_TO_CART, {
    cartData: newCartData,
    totalCount: Number(newTotalCount),
    totalPrice: newTotalPrice,
    openDrawer: true,
  });
};

export const addToCartDrawer = (cartData, item, value) => {
  const newCartData = cartData?.map((cartItem) => {
    if (cartItem._id === item?._id) {
      return { ...cartItem, quantity: value + 1 };
    } else {
      return cartItem;
    }
  });
  const newTotalPrice = newCartData.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  );
  const newTotalCount = newCartData.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  return createAction(CART_ACTION_TYPE.ADD_TO_CART_DRAWER, {
    cartData: newCartData,
    totalCount: Number(newTotalCount),
    totalPrice: newTotalPrice,
  });
};

export const removeFromCartDrawer = (cartData, item, value) => {
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
  const newTotalPrice = newCartData.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  );
  const newTotalCount = newCartData.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  return createAction(CART_ACTION_TYPE.REMOVE_FROM_CART_DRAWER, {
    cartData: newCartData,
    totalCount: Number(newTotalCount),
    totalPrice: newTotalPrice,
  });
};
