import { Layout, Menu } from "antd";
import logo from "../../assets/MainLogo.png";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import WishlistBtn from "../navigationPopups/wishlistBtn";
import CompareListBtn from "../navigationPopups/compareListBtn";
import ShoppingCart from "../navigationPopups/shoppingCart";
import { selectUser } from "../../store/user/user.selectors";
import { useSelector } from "react-redux";
import { signOutUser } from "../../utils/firebase/firebase";
import LoginPopup from "../navigationPopups/loginPopup";

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { Header } = Layout;
  const items = [
    {
      label: "Home",
      key: "home",
      style: { fontSize: "18px" },
      className: "header-menu",
    },
    {
      label: "Contact",
      key: "contact",
      style: { fontSize: "18px" },
      className: "header-menu",
    },
    {
      label: "About",
      key: "about",
      style: { fontSize: "18px" },
      className: "header-menu",
    },
    {
      label: "Sign up",
      key: "signup",
      style: { fontSize: "18px" },
      className: "header-menu",
    },
  ];
  const onClick = (e) => {
    // console.log("click ", e.key);
    navigate(`/${e.key === "home" ? "" : e.key}`);
  };
  const signOutHandler = async () => {
    signOutUser();
  };
  return (
    <Header className="flex items-center justify-between text-white bg-[#FFFFFF] px-[5%] h-[8vh]  sticky-header">
      <div className="flex items-center justify-between gap-2">
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo"
            className=" w-[60px] flex items-center justify-center"
            style={{ borderRadius: "30% 70% 70% 30% / 30% 34% 66% 70% " }}
          />
        </Link>
        <Link to={"/"}>
          <h1 className="text-xl font-semibold text-[#6895D2]">MEGA Store</h1>
        </Link>
      </div>
      <Menu
        defaultSelectedKeys={
          items?.find(
            (element) =>
              element?.label ===
              pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length)
          ) === ""
            ? ["home"]
            : items?.find(
                (element) =>
                  element?.label ===
                  pathname.substring(
                    pathname.lastIndexOf("/") + 1,
                    pathname.length
                  )
              ) === undefined
            ? []
            : items?.find(
                (element) =>
                  element?.label ===
                  pathname.substring(
                    pathname.lastIndexOf("/") + 1,
                    pathname.length
                  )
              )?.key
        }
        mode="horizontal"
        items={items}
        className="bg-transparent border-none w-[40%] min-w-fit flex items-center justify-center"
        onClick={onClick}
      />
      <div className=" p-2 flex gap-4 text-xl items-center">
        <LoginPopup />
        <WishlistBtn />
        <ShoppingCart />
      </div>
    </Header>
  );
}

export default Header;
