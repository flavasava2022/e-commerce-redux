import { Layout, Drawer, Menu } from "antd";
import logo from "../../assets/MainLogo.png";
import {
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  FilterOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import WishlistBtn from "../navigationPopups/wishlistBtn";
import CompareListBtn from "../navigationPopups/compareListBtn";
import ShoppingCart from "../navigationPopups/shoppingCart";
import { selectUser } from "../../store/user/user.selectors";
import { useDispatch, useSelector } from "react-redux";
import { signOutStart } from "../../store/user/user.action";
function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Header } = Layout;

  const items = [
    {
      label: "Home",
      key: "home",
    },
    {
      label: "Contact",
      key: "contact",
    },
    {
      label: "About",
      key: "about",
    },
    {
      label: "Sign Up",
      key: "signup",
    },
  ];
  const onClick = (e) => {
    // console.log("click ", e.key);
    navigate(`/${e.key === "home" ? "" : e.key}`);
  };
  const signOutHandler = async () => {
    dispatch(signOutStart());
  };
  return (
    <Header className="flex items-center justify-between text-white bg-[#FFFFFF] px-[5%] h-[8vh] border-b-2">
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
        defaultSelectedKeys={["1"]}
        mode="horizontal"
        items={items}
        className="bg-transparent border-none w-[40%] min-w-fit flex items-center justify-center"
        onClick={onClick}
      />
      <div className=" p-2 flex gap-4 text-xl items-center">
        {user ? (
          <div className="flex items-center justify-between gap-1">
            <p className="text-black">Welcome back , {user?.displayName}</p>{" "}
            <LogoutOutlined
              style={{ color: "black" }}
              className="cursor-pointer"
              onClick={signOutHandler}
            />
          </div>
        ) : (
          <LoginOutlined style={{ color: "black" }} />
        )}
        <WishlistBtn />
        <CompareListBtn />
        <ShoppingCart />
      </div>
    </Header>
  );
}

export default Header;
