import { createContext, useEffect, useState } from "react";

const MobileHandlerContext = createContext();

function MobileHandlerProvider({ children }) {
  const [isMobile, setIsMobile] = useState();
  const mediaQuery = "(max-width: 1024px)";

  const isMobileHandler = (e) => {
    setIsMobile(e.matches);
  };

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);
    setIsMobile(mediaQueryList.matches);

    const handleChange = (e) => isMobileHandler(e);
    mediaQueryList.addEventListener("change", handleChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [mediaQuery]);

  return (
    <MobileHandlerContext.Provider value={{ isMobile }}>
      {children}
    </MobileHandlerContext.Provider>
  );
}

export { MobileHandlerProvider, MobileHandlerContext };
