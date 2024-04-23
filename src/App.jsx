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
  createUserDocument,
  onAuthStateChangedListner,
} from "./utils/firebase/firebase";

import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/user/user.reducer";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListner((user) => {
      if (user) {
        createUserDocument(user);
      }
      const pickedUser =
        user &&
        (({ accessToken, email, displayName }) => ({
          accessToken,
          email,
          displayName,
        }))(user);
      dispatch(setCurrentUser(pickedUser));
    });

    return unsubscribe;
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
