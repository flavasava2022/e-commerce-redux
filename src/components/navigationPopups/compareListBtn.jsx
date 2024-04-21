import { Badge, Button, Dropdown, Empty } from "antd";
import { PushpinFilled, PushpinOutlined } from "@ant-design/icons";
import { CompareDataProvider } from "../../context/compareContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
function CompareListBtn() {
  const { compareData } = useContext(CompareDataProvider);
  return (
    <Dropdown
      placement="bottomLeft"
      arrow
      dropdownRender={() => (
        <div
          className="p-6  rounded-xl shadow bg-[#FFFFFF] 
                min-w-[300px] max-w-[400px]  min-h-[150px] "
        >
          <h3 className="text-xl font-semibold text-center">Compare Cart</h3>
          <div className="max-h-[350px] overflow-auto flex flex-col items-center gap-2 mt-6 scrollbar">
            {compareData?.length ? (
              compareData?.map((item) => {
                return (
                  <div
                    className="flex gap-2 py-4 w-full justify-between items-center"
                    key={item?._id}
                  >
                    <div className="max-w-[100%] h-fit w-[40px]">
                      {" "}
                      <img
                        src={item?.image}
                        alt={item?.name}
                        className="w-[100%] h-[100%] object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-2 p-2 w-full">
                      <Link>
                        <p className="text-[13px]  font-normal leading-5	">
                          {item?.name}
                        </p>
                      </Link>
                      <p className="flex items-center border-2 border-[#6895D2] rounded-lg min-w-fit font-medium p-2 text-[#6895D2] !leading-none ">
                        $ {item?.price}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <Empty />
            )}
          </div>
          {compareData?.length ? (
            <Link to={"/compare"}>
              <Button
                type="primary"
                className="text-base font-semibold flex items-center justify-center p-6 mx-auto rounded-full mt-2"
              >
                {" "}
                Visit Compare Page
              </Button>
            </Link>
          ) : (
            ""
          )}
        </div>
      )}
      trigger="click"
    >
      <Badge className="mx-4" count={compareData?.length} overflowCount={10}>
        <PushpinOutlined
          style={{
            fontSize: "23px",
            cursor: "pointer",
            color: compareData?.length > 0 ? "red" : "black",
          }}
        />
      </Badge>
    </Dropdown>
  );
}

export default CompareListBtn;
