import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./route/home/home";
import WishList from "./route/wishList/wishlist";
import Category from "./route/category/category";
import ItemsContainer from "./components/itemsContainer/itemsContainer";
import MainLayout from "./route/mainLayout/mainLayout";
import Signup from "./route/signup/signup";

import "./App.css";

import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/user/user.reducer";
import axios from "axios";
import { getBasketData } from "./store/fetchData/fetchData";

function App() {
  const dispatch = useDispatch();
  const fetchUser = async (jwt) => {
    try {
      const response = await axios.get("http://localhost:1337/api/users/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(response.data);
      dispatch(setCurrentUser(response.data));
      getBasketData();
    } catch (error) {
      console.error("Failed to fetch user:", error);
      // Clear token from storage if fetching user fails
      // localStorage.removeItem("jwt");
    }
  };
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      fetchUser(jwt);
    }
  }, []);
  const Routing = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/signup", element: <Signup /> },
        { path: "/wishlist", element: <WishList /> },
        { path: "/products/:category", element: <ItemsContainer /> },
        { path: "/subCategories/:category", element: <Category /> },
      ],
    },
  ]);
  return <RouterProvider router={Routing} />;
}

export default App;
