import { Menu } from "antd";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getAllCategories } from "../../store/category/categories.reducer";
import { useDispatch, useSelector } from "react-redux";
import {
  categoriesArray,
  categoriesArrayError,
  categoriesArrayIsLoading,
} from "../../store/category/categories.selectors";

function HeroSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);

  const changePic = (num) => {
    setCurrentSlide(num);
  };

  return (
    <div className="flex items-center h-[40vh] mt-4 w-full">
      <div className=" relative   flex items-center h-[40vh] rounded-xl w-[100%] justify-center">
        <div className="absolute flex items-center justify-between gap-4 bottom-[20%] left-[45%] z-50 ">
          <span
            className={`bullet w-[25px] h-1 ${
              currentSlide === 0 ? "bg-red-500" : "bg-white"
            } cursor-pointer `}
            onClick={() => changePic(0)}
          ></span>
          <span
            className={`bullet w-[25px] h-1 ${
              currentSlide === 1 ? "bg-red-500" : "bg-white"
            } cursor-pointer `}
            onClick={() => changePic(1)}
          ></span>
          <span
            className={`bullet w-[25px] h-1 ${
              currentSlide === 2 ? "bg-red-500" : "bg-white"
            } cursor-pointer `}
            onClick={() => changePic(2)}
          ></span>
        </div>
        <div className=" relative flex overflow-hidden  w-full h-[40vh] rounded-xl  justify-center">
          <div
            className={`absolute   w-[100%] h-[40vh] picHolder rounded-xl`}
            style={{ transform: `translateY(-${currentSlide * 40}vh` }}
          >
            <img
              src={banner1}
              alt=""
              className="picHolder  w-full h-full rounded-xl object-cover"
            />
            <img
              src={banner2}
              alt=""
              className="picHolder w-full h-full rounded-xl object-cover"
            />
            <img
              src={banner3}
              alt=""
              className="picHolder w-full h-full rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
