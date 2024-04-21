import { Button, ConfigProvider } from "antd";

import App from "../../App";

import CartProvider from "../../context/cartContext";
import CompareProvider from "../../context/compareContext";
import WishlistProvider from "../../context/whishlistContext";
import UserProvider from "../../context/userContext";
import { MobileHandlerProvider } from "../../context/mobileHandlerProvider";

const AntdWrapper = () => {
  //   const { i18n } = useTranslation();

  //   useEffect(() => {
  //     // Update language direction when i18n language changes
  //     document.dir = i18n.language === "ar-AE" ? "rtl" : "ltr";
  //     // //console.log(i18n.language)
  //   }, [i18n.language]);

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#6895D2",
          colorPrimaryActive: "#D04848",
          colorPrimaryHover: "#D04848",
        },
        components: {
          Checkbox: {
            colorPrimary: "#0C0C0C",
            darkItemHoverColor: "#16181e",
            colorPrimaryHover: "#191b21",
          },
          Tabs: {
            colorPrimary: "#1c1e25",
            colorPrimaryActive: "#16181e",
            colorPrimaryHover: "#191b21",
          },
        },
      }}
    >
          <MobileHandlerProvider>
      <UserProvider>
        <CartProvider>
          <CompareProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </CompareProvider>
        </CartProvider>
      </UserProvider>
      </MobileHandlerProvider>
    </ConfigProvider>
  );
};

export default AntdWrapper;
