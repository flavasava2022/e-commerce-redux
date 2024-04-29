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

  const { pathname } = useLocation();

  const [currentSlide, setCurrentSlide] = useState(0);
  const categoriesData = useSelector(categoriesArray);
  const isLoading = useSelector(categoriesArrayIsLoading);
  const categoriesError = useSelector(categoriesArrayError);

  const changePic = (num) => {
    setCurrentSlide(num);
  };
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  const onClick = (e) => {
    console.log("click ", e.key);
    navigate(`/products/${e.key}`);
  };
  return (
    <div className="flex items-center h-[40vh] mt-4 w-full">
      <div className="w-[20%]">
        {!isLoading && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-[20px] h-[35px] bg-[#6895D2]  rounded-md"></div>
              <p className="text-xl font-semibold text-[#6895D2]">Categories</p>
            </div>

            <Menu
              defaultSelectedKeys={
                categoriesData?.find(
                  (element) =>
                    element?.label ===
                    pathname.substring(
                      pathname.lastIndexOf("/") + 1,
                      pathname.length
                    )
                ) === undefined
                  ? null
                  : categoriesData?.find(
                      (element) =>
                        element?.label ===
                        pathname.substring(
                          pathname.lastIndexOf("/") + 1,
                          pathname.length
                        )
                    )?.key
              }
              selectedKeys={
                categoriesData?.find(
                  (element) =>
                    element?.label ===
                    pathname.substring(
                      pathname.lastIndexOf("/") + 1,
                      pathname.length
                    )
                ) === undefined
                  ? null
                  : [
                      categoriesData?.find(
                        (element) =>
                          element?.label ===
                          pathname.substring(
                            pathname.lastIndexOf("/") + 1,
                            pathname.length
                          )
                      )?.key,
                    ]
              }
              items={categoriesError === true ? [] : categoriesData}
              className=" overflow-auto h-[35vh] w-[90%]  scrollbar"
              onClick={onClick}
            />
          </div>
        )}
      </div>
      <div className=" relative   flex items-center h-[40vh] rounded-xl w-[80%] justify-center">
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
        <div className=" relative flex overflow-hidden  w-[70vw] h-[40vh] rounded-xl  justify-center">
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
