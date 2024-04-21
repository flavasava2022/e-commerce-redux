import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Navigation from "./route/mainLayout/mainLayout";
import Home from "./route/home/home";
import ComparePage from "./route/comparePage/comparePage";
import WishList from "./route/wishList/wishlist";
import Category from "./route/category/category";
import ItemsContainer from "./components/itemsContainer/itemsContainer";
import MainLayout from "./route/mainLayout/mainLayout";
import Signup from "./route/signup/signup";
import LogIn from "./route/lognIn/login";
import "./App.css";
import { MobileHandlerProvider } from "./context/mobileHandlerProvider";

function App() {
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
