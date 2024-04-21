import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Divider, Spin } from "antd";
import middlePic from "../../assets/pexels-mstudio-1240892.jpg";
import fullPic from "../../assets//woman.jpg";
import halfPic from "../../assets/pexels-dom-j-45982.jpg";
import halfpic2 from "../../assets/pexels-ylanite-koppens-934070.jpg";
import deliveryPic from "../../assets/deliver.svg";
import servicePic from "../../assets/Services.svg";
import gaurntePic from "../../assets/garanty.svg";
import Carousel from "../../components/carousel/carsousel";
import FilterDrawer from "../../components/itemsContainer/filterDrawer";
import HeroSection from "../../components/heroSection/heroSection";
function Home() {
  return (
    <div className="bg-[#fff] p-4 hide_scroll">
      <HeroSection />
      <div className="mx-auto">
        <Carousel
          category={"On Sale"}
          Heading={`Today's`}
          text={"Flash Sale"}
        />
      </div>
      <Divider />
      <div className="mx-auto">
        <Carousel
          category={`Best Seller`}
          Heading={`This Month`}
          text={"Best Selling Products"}
        />
      </div>
      <Divider />
      <div className="mx-auto">
        <Carousel
          category={`Trending`}
          Heading={`Trending`}
          text={"Trending This Month"}
        />
      </div>
      <Divider />
      <div>
        <div className="flex items-center gap-2">
          <div className="w-[20px] h-[35px] bg-[#6895D2]  rounded-md"></div>
          <p className=" text-xl font-semibold text-[#6895D2]">Featured</p>
        </div>
        <p className="text-xl font-semibold text-[#D04848] my-4 w-[96%] mx-auto">
          New Arrival
        </p>
        <div className="flex justify-between items-center gap-2 w-[100%] mx-auto">
          <div className="h-[60vh] w-[50%]  ">
            <img
              src={fullPic}
              alt=""
              className="h-[100%] object-cover w-[100%] opacity-80"
            />
          </div>
          <div className="flex flex-col  justify-between gap-2 w-[60%] h-[60vh]">
            <div className="w-full h-[29vh]">
              <img
                src={middlePic}
                alt=""
                className="  h-[100%] object-cover w-[100%] opacity-80"
              />
            </div>

            <div className="flex items-center justify-between gap-2 w-[100%] h-[29vh]">
              <div className="w-[50%] h-[29vh]">
                <img
                  src={halfPic}
                  className="w-full h-[29vh] opacity-80"
                  alt=""
                />
              </div>
              <div className="w-[50%] h-[29vh]">
                <img
                  src={halfpic2}
                  className="w-[100%] h-[29vh] opacity-80 overflow-hidden"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-evenly p-2 mt-10">
          <div className="flex flex-col items-center gap-4">
            <img src={deliveryPic} alt="" />
            <h1 className="text-xl font-semibold text-[#6895D2]">
              FREE AND FAST DELIVERY
            </h1>
            <p className="text-[14px] text-gray-400">
              Free delivery for all orders over $140
            </p>
          </div>{" "}
          <div className="flex flex-col items-center gap-4">
            <img src={deliveryPic} alt="" />
            <h1 className="text-xl font-semibold text-[#6895D2]">
              24/7 CUSTOMER SERVICE
            </h1>
            <p className="text-[14px] text-gray-400">
              Friendly 24/7 customer support
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <img src={deliveryPic} alt="" />
            <h1 className="text-xl font-semibold text-[#6895D2]">
              MONEY BACK GUARANTEE
            </h1>
            <p className="text-[14px] text-gray-400">
              We return money within 30 days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
