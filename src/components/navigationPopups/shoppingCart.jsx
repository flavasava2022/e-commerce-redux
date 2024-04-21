import {
  ShoppingFilled,
  ShoppingOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Drawer, Badge, Empty, Button, Divider } from "antd";
import { useContext } from "react";
import { CartDataProvider } from "../../context/cartContext";
import AddToCartDrawer from "../header/addToCartDrawer";

function ShoppingCart() {
  const { openDrawer, setOpenDrawer, cartData, totalPrice, totalCount } =
    useContext(CartDataProvider);

  return (
    <>
      <Badge className="mx-4" count={totalCount} overflowCount={10}>
        <ShoppingOutlined
          onClick={() => {
            setOpenDrawer(true);
          }}
          style={{
            fontSize: "23px",
            cursor: "pointer",
            color: totalCount > 0 ? "red" : "black",
          }}
        />
      </Badge>

      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title="SHOPPING CART"
      >
        <div className="flex flex-col gap-4 h-full">
          <div className="p-1 max-h-[550px] min-h-[550px] overflow-y-scroll flex flex-col items-center  gap-4 hide__scroll">
            {cartData?.length ? (
              cartData?.map((item) => {
                return (
                  <div className="w-full" key={item?._id}>
                    <div className="p-2 flex  items-center  justify-between gap-3  w-full">
                      <div className="w-[100px] h-[120px] ">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="w-[100%] h-[100%] object-cover"
                        />
                      </div>
                      <div className="w-[80%] flex flex-col h-[120px] gap-2 items-stretch justify-between">
                        <div className="flex items-start justify-between gap-2 ">
                          <Link>
                            <p className="text-base  font-normal leading-5	">
                              {item?.name}
                            </p>
                          </Link>
                          <p className="flex items-center border-2 border-dashed border-[#6895D2] rounded-lg min-w-fit font-medium p-2 text-[#6895D2] text-[12px] !leading-none ">
                            $ {item?.price}
                          </p>
                        </div>
                        <div className="flex items-center justify-center w-full">
                          <AddToCartDrawer
                            quantity={item?.quantity}
                            item={item}
                            key={`${item?._id} cart`}
                          />
                        </div>
                      </div>
                    </div>
                    <Divider />
                  </div>
                );
              })
            ) : (
              <div className="flex h-full items-center justify-center">
                <Empty />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between p-2">
            <p className="text-xl font-semibold text-center">Subtotal</p>
            <p className="flex items-center border-2 border-dashed border-[#6895D2] rounded-lg min-w-fit font-medium p-2 text-[#6895D2] !leading-none ">
              $ {totalPrice}
            </p>
          </div>
          <p className=" text-sm text-slate-500 dark:text-slate-400 font-normal p-2 text-center">
            Taxes and shipping calculated at checkout
          </p>
          <div className="flex flex-col items-center justify-center gap-4 mt-auto mb-0">
            <Button
              className=" rounded-full w-[95%] p-4  h-auto bg-[#F3B95F]"
              type="secondary"
            >
              View Cart
            </Button>
            <Button
              className=" rounded-full w-[95%] p-4  h-auto"
              type="primary"
            >
              Check out
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default ShoppingCart;
