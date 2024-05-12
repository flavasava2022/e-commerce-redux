import { Affix, ConfigProvider } from "antd";

import { MobileHandlerProvider } from "../../context/mobileHandlerProvider";
import App from "../../App";
import { Provider } from "react-redux";
import { persistor, store } from "../../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";


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
      <Provider store={store}>
        {/* <PersistGate persistor={persistor}> */}
        <App />

        {/* </PersistGate> */}
      </Provider>
    </ConfigProvider>
  );
};

export default AntdWrapper;
