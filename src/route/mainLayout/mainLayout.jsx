import { useState } from "react";
import { Menu, Layout } from "antd";
import { Breadcrumb } from "antd";
import Header from "../../components/header/header";
import "../../App.css";

import { Outlet, Link } from "react-router-dom";
import HeroSection from "../../components/heroSection/heroSection";
import Footer from "../../components/footer/footer";

function MainLayout() {
  return (
    <Layout className="scrollbar  min-h-[100vh] bg-white">
      <Header />
      <div className=" w-[90%] mx-auto p-2 ">
        <Outlet />
      </div>
      <div className="mt-auto mb-0">
        <Footer />
      </div>
    </Layout>
  );
}

export default MainLayout;
