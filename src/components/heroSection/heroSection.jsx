import { Menu } from "antd";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
function HeroSection() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);
  let { category } = useParams();
  const [picHieght, setpicHieght] = useState(0);
  const getData = () => {
    fetch("https://fake-e-commerce-api.onrender.com/categories")
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        setData([]);
        json.map((Category) => {
          setData((pervstate) => {
            return [
              ...pervstate,
              {
                label: Category,
                key: Category,
              },
            ];
          });
        });
        setLoading(true);
      });
  };
  // console.log(category);
  const changePic = (num) => {
    setpicHieght(num);
  };
  useEffect(() => {
    getData();
  }, []);
  const onClick = (e) => {
    console.log("click ", e.key);
    navigate(`/products/${e.key}`);
  };
  return (
    <div className="flex items-center h-[40vh] mt-4 w-full">
      <div className="w-[20%]">
        {loading && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-[20px] h-[35px] bg-[#6895D2]  rounded-md"></div>
              <p className="text-xl font-semibold text-[#6895D2]">Categories</p>
            </div>

            <Menu
              defaultSelectedKeys={category === undefined ? null : [category]}
              items={data}
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
              picHieght === 0 ? "bg-red-500" : "bg-white"
            } cursor-pointer `}
            onClick={() => changePic(0)}
          ></span>
          <span
            className={`bullet w-[25px] h-1 ${
              picHieght === 40 ? "bg-red-500" : "bg-white"
            } cursor-pointer `}
            onClick={() => changePic(40)}
          ></span>
          <span
            className={`bullet w-[25px] h-1 ${
              picHieght === 80 ? "bg-red-500" : "bg-white"
            } cursor-pointer `}
            onClick={() => changePic(80)}
          ></span>
        </div>
        <div className=" relative flex overflow-hidden  w-[70vw] h-[40vh] rounded-xl  justify-center">
          <div
            className={`absolute   w-[100%] h-[40vh] picHolder rounded-xl`}
            style={{ bottom: `${picHieght}vh` }}
          >
            <img
              src={banner1}
              alt=""
              className="picHolder  w-full h-[40vh] rounded-xl object-cover"
            />
            <img
              src={banner2}
              alt=""
              className="picHolder w-full h-[40vh] rounded-xl object-cover"
            />
            <img
              src={banner3}
              alt=""
              className="picHolder w-full h-[40vh] rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
