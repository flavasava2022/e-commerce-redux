import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./route/home/home";
import WishList from "./route/wishList/wishlist";
import Category from "./route/category/category";
import MainLayout from "./route/mainLayout/mainLayout";
import Signup from "./route/signup/signup";

import "./App.css";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./store/user/user.reducer";
import axios from "axios";

import { getCartData } from "./store/cart/cart.actions";
import { selectUser } from "./store/user/user.selectors";
import Product from "./route/product/product";
import { notification } from "antd";
import { getWishlistData } from "./store/wishlist/wishlist.actions";
import Checkout from "./route/checkout/checkout";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const jwt = localStorage.getItem("jwt");
  const [api, contextHolder] = notification.useNotification();
  const fetchUser = async (jwt) => {
    try {
      const response = await axios.get("http://localhost:1337/api/users/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch(setCurrentUser(response.data));
      api["success"]({
        message: "Login Successful",
        description: `Welcome Back, ${response.data?.username}`,
        placement: "top",
      });
      // getBasketData();
    } catch (error) {
      console.error("Failed to fetch user:", error);
      api["error"]({
        message: "Login error",
        description: `${error}`,
        placement: "top",
      });
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
    }
  };
  useEffect(() => {
    if (jwt) {
      fetchUser(jwt);
    }
  }, []);
  useEffect(() => {
    if (user) {
      dispatch(getCartData(user));
      dispatch(getWishlistData(user));
    }
  }, [user, api, dispatch]);
  const Routing = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/signup", element: <Signup /> },
        { path: "/wishlist", element: <WishList /> },
        { path: "/products/", element: <Category /> },
        { path: "/product/:slug", element: <Product /> },
        { path: "/checkout", element: <Checkout /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={Routing} />
      {contextHolder}
    </>
  );
}

export default App;
