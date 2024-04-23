import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./route/home/home";
import ComparePage from "./route/comparePage/comparePage";
import WishList from "./route/wishList/wishlist";
import Category from "./route/category/category";
import ItemsContainer from "./components/itemsContainer/itemsContainer";
import MainLayout from "./route/mainLayout/mainLayout";
import Signup from "./route/signup/signup";
import LogIn from "./route/lognIn/login";
import "./App.css";

import { useEffect } from "react";
import {
  getCurrentUser,
  onAuthStateChangedListner,
} from "./utils/firebase/firebase";
import { checkUserSession, setUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
  }, []);
  const Routing = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/login", element: <LogIn /> },
        { path: "/signup", element: <Signup /> },
        { path: "/compare", element: <ComparePage /> },
        { path: "/wishlist", element: <WishList /> },
        { path: "/products/:category", element: <ItemsContainer /> },
        { path: "/subCategories/:category", element: <Category /> },
      ],
    },
  ]);
  return <RouterProvider router={Routing} />;
}

export default App;
