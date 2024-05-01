import { Button, Rate, message } from "antd";
import "./itemContainer.styles.css";
import {
  PushpinFilled,
  HeartOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
  FilterFilled,
  HeartFilled,
} from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import QuickViewModal from "../quickViewModal/quickViewModal";

import { selectCartItems } from "../../store/cart/cart.selectors";

import { useSelector, useDispatch } from "react-redux";
import { compareListData } from "../../store/compare/compare.selectors";
import { addOrRemoveDataFromCompareList } from "../../store/compare/compare.reducer";
import { WishListData } from "../../store/wishlist/wishlist.selectors";
import { addOrRemoveDataFromWishList } from "../../store/wishlist/wishlist.reducer";
import { addToCart, setOpenDrawer } from "../../store/cart/cart.reducer";
import { addToBasket } from "../../store/fetchData/fetchData";

function ItemContainer({ item, id }) {
  const dispatch = useDispatch();
  const compareData = useSelector(compareListData);

  const wishlistData = useSelector(WishListData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [compare, setCompare] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  useEffect(() => {
    const itemCompered = compareData.find((element) => element?.id === id);
    if (itemCompered) {
      setCompare(true);
    }
    const itemWishList = wishlistData.find((element) => element?.id === id);
    if (itemWishList) {
      setWishlist(true);
    }
  }, [item, compareData, wishlistData]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const addToCartHandelr = () => {
    // dispatch(addToCart({ item: item, value: 1 }));
    // dispatch(setOpenDrawer(true));
    addToBasket(
      item.name,
      item.price,
      "red",
      "xl",
      item.image,
      "3",
      item.description,
      item._id,
      "1"
    );
  };
  const [messageApi, contextHolder] = message.useMessage();
  const info = (text) => {
    messageApi.success(text);
  };
  return (
    <div className="main-container relative bg-white p-6 text-center overflow-hidden shadow-inner	border-1 min-w-[200px] min-h-[350px] h-[350px] rounded-lg flex flex-col items-center gap-4 border-2 border-grey cursor-pointer">
      <div className="w-[95%] min-h-[70%] max-h-[70%]  ">
        <img
          src={
            `http://localhost:1337` +
            item?.attributes?.images?.data[0]?.attributes?.url
          }
          alt=""
          className="w-[100%] h-[100%]"
        />
      </div>
      <div className=" absolute  w-full h-full  top-0 left-0 overlay-cart   opacity-0 flex flex-col items-center justify-end gap-2">
        <div className="wishList absolute top-[20px] left-[-80px] flex flex-col gap-4 z-50 text-white text-xl border-2 border-[#6895D2] rounded-lg p-2 ">
          <PushpinFilled
            style={{ color: compare ? "#D04848" : "white" }}
            className="icon-com"
            onClick={() => {
              setCompare(!compare);
              dispatch(addOrRemoveDataFromCompareList(item));
              info(
                `${item.attributes?.name} ${
                  !compare
                    ? "Added To Compare Card"
                    : "Removed From Compare Card"
                }`
              );
            }}
          />
          <HeartFilled
            style={{ color: wishlist ? "#D04848" : "white" }}
            onClick={() => {
              setWishlist(!wishlist);
              dispatch(addOrRemoveDataFromWishList(item));
              info(
                `${item.attributes?.name} ${
                  !wishlist
                    ? "Added To WishList Card"
                    : "Removed From WishList Card"
                } `
              );
            }}
            className="icon-com"
          />
        </div>
        <div className="flex-col flex w-full items-center gap-2 bottom-[-200px] absolute btns-container">
          <Button
            onClick={showModal}
            className="quick-view-btn relative w-[60%] p-4 h-[50px] rounded-full "
          >
            <p className="quick-view-btn-text  w-full h-full opacity-1 items-center justify-center">
              Quick View
            </p>
            <div className="quick-view-btn-logo  w-full h-full opacity-0 items-center justify-center ">
              <EyeOutlined style={{ fontSize: "24px" }} />
            </div>
          </Button>
          <Button
            type="primary"
            onClick={addToCartHandelr}
            className="addToCart-btn relative w-[60%] p-4 h-[50px] rounded-full mb-6"
          >
            <p className="addToCart-btn-text  w-full h-full opacity-1 items-center justify-center">
              add To Cart
            </p>
            <div className="addToCart-btn-logo w-full h-full opacity-0 items-center justify-center">
              <ShoppingCartOutlined style={{ fontSize: "24px" }} />
            </div>
          </Button>
        </div>
      </div>
      <p className="text-center overflow-hidden">{item.attributes?.name}</p>
      <div className="flex items-center justify-between w-full mt-auto">
        <Rate disabled defaultValue={item.attributes?.rating} />
        <p className="flex items-center border-2 border-[#6895D2] rounded-lg min-w-fit font-medium p-2 text-[#6895D2] !leading-none ">
          $ {item.attributes?.price}
        </p>
      </div>

      <QuickViewModal
        item={item}
        id={id}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {contextHolder}
    </div>
  );
}

export default ItemContainer;
