import { Divider, Layout, Menu } from "antd";
import logo from "../../assets/MainLogo.png";
import { Link } from "react-router-dom";
function Footer() {
  const { Footer } = Layout;

  const quickLinks = [
    {
      label: "Privacy Policy",
      key: "Privacy Policy",

      className: "footer-menu",
    },
    {
      label: "Terms Of Use",
      key: "Terms Of Use",
      className: "footer-menu",
    },
    {
      label: "FAQ",
      key: "FAQ",
      className: "footer-menu",
    },
    {
      label: "Contact",
      key: "Contact",
      className: "footer-menu",
    },
  ];
  const acountMenu = [
    {
      label: "Login / Register",
      key: "Login / Register",
      className: "footer-menu",
    },
    {
      label: "Cart",
      key: "Cart",
      className: "footer-menu",
    },
    {
      label: "Wishlist",
      key: "Wishlist",
      className: "footer-menu",
    },
    {
      label: "Compare",
      key: "Compare",
      className: "footer-menu",
    },
  ];

  return (
    <Footer
      style={{
        textAlign: "center",
        color: "white",
        background: "black",
      }}
    >
      <div className="flex  justify-evenly gap-2">
        <div className="w-[20%] flex flex-col gap-8   p-2 h-[100%] items-center justify-between">
          <Link to={"/"}>
            <h1 className="text-xl font-semibold text-[#6895D2]">MEGA Store</h1>
          </Link>
          <Link to={"/"} className="mt-auto mb-0">
            <img
              src={logo}
              alt="logo"
              className=" w-[60px] flex items-center justify-center"
              style={{ borderRadius: "30% 70% 70% 30% / 30% 34% 66% 70% " }}
            />
          </Link>
        </div>
        <div className=" w-[20%] flex flex-col  gap-4  p-2 h-[100%] items-center justify-between">
          <h1 className="w-full text-center text-xl font-semibold">Support</h1>
          <p className="w-full text-center text-base footer-menu">
            exclusive@gmail.com
          </p>
          <p className="w-full text-center text-base footer-menu">
            +xxxxx-xxxxx-xxxxx
          </p>
        </div>
        <div className="w-[20%] p-2">
          <h1 className="w-full text-center text-xl font-semibold">Account</h1>

          <Menu
            items={acountMenu}
            style={{ borderInlineEnd: "0px", color: "green" }}
            className="   bg-transparent border-none shadow-none  scrollbar text-center text-white"
            theme="dark"
            selectable={false}
          />
        </div>
        <div className="w-[20%]  p-2">
          <h1 className="w-full text-center text-xl font-semibold">
            Quick Link
          </h1>
          <Menu
            items={quickLinks}
            style={{ borderInlineEnd: "0px" }}
            className=" overflow-auto  bg-transparent border-none shadow-none  scrollbar text-center "
            theme="dark"
            selectable={false}
          />
        </div>
      </div>
      <Divider style={{ background: "#6895D2" }} />
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  );
}

export default Footer;
