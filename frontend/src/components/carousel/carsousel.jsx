import ItemContainer from "../itemContainer/itemContainer";
import ItemCarousel from "./itemCarousel";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import "./carousel.styles.css";
import { useState, useEffect } from "react";
import { Button, Spin } from "antd";
import { Link } from "react-router-dom";
function Carousel({ category, Heading, text }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      fetch(
        `https://fake-e-commerce-api.onrender.com/product/subcategory/${category}`
      )
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          setLoading(false);
        });
    };
    getData();
  }, [category]);
  const [movement, setMovement] = useState(0);
  const end = Number((data.length - 5) * -258);
  const start = Number(data.length * 258);
  const leftArrow = () => {
    if (movement === 0) {
      setMovement(end);
    } else {
      if (movement >= start) {
        setMovement(0);
      } else {
        setMovement((pervState) => {
          return pervState + 258;
        });
      }
    }
  };
  const rightArrow = () => {
    if (movement === start) {
      setMovement(0);
    } else {
      if (movement <= end) {
        setMovement(0);
      } else {
        setMovement((pervState) => {
          return pervState - 258;
        });
      }
    }
  };
  return (
    <div className="mb-8">
      <div className=" relative  h-[50vh] rounded-lg overflow-hidden w-[100%] hide_scroll">
        <div className="flex items-center gap-2">
          <div className="w-[20px] h-[35px] bg-[#6895D2]  rounded-md"></div>
          <p className=" text-xl font-semibold text-[#6895D2]">{Heading}</p>
        </div>
        <div className="flex w-[96%] gap-2 items-center justify-between mx-auto">
          <p className="text-xl font-semibold text-[#D04848] my-4">{text}</p>
          <div className="     flex items-center justify-center gap-2">
            <LeftCircleOutlined
              className="text-[30px] text-[#6895D2] cursor-pointer"
              onClick={leftArrow}
            />{" "}
            <RightCircleOutlined
              className="text-[30px] text-[#6895D2] cursor-pointer"
              onClick={rightArrow}
            />
          </div>
        </div>

        {loading ? (
          <div className="w-full  absolute  items-center  justify-center flex gap-2   h-full px-2">
            <Spin size="large" className="" />
          </div>
        ) : (
          <>
            <div
              className={` absolute  items-center  justify-center flex gap-2   carousel h-[40vh] px-2`}
              style={{ left: `${movement}px` }}
            >
              {data.map((item) => {
                return (
                  <ItemCarousel
                    item={item}
                    key={item?._id}
                    className="w-[25%]"
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
      <Link to={`/subCategories/${category}`}>
        <Button
          type="primary"
          className="w-[10vw] p-4 h-[5vh]  flex items-center justify-center rounded-full mx-auto mt-2"
        >
          View All Products
        </Button>
      </Link>
    </div>
  );
}

export default Carousel;
