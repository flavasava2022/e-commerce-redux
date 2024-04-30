import { Button, Collapse, Modal, Rate } from "antd";

import { FilterFilled, HeartFilled, UpCircleFilled } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import AddToCartInputNumber from "../addToCartInputNumber/addToCartInputNumber";

import ColorBox from "./colorbox";
import SizeBox from "./sizeBox";
import { useDispatch, useSelector } from "react-redux";
import { compareListData } from "../../store/compare/compare.selectors";
import { addOrRemoveDataFromCompareList } from "../../store/compare/compare.reducer";
import { WishListData } from "../../store/wishlist/wishlist.selectors";
import { addOrRemoveDataFromWishList } from "../../store/wishlist/wishlist.reducer";
import { addToCart } from "../../store/cart/cart.reducer";
import { FaHeart } from "react-icons/fa";

function QuickViewModal({ item, setIsModalOpen, isModalOpen }) {
  const [value, setValue] = useState(1);
  const [selectedBox, setSelectedBox] = useState("red");
  const [selectedSize, setSelectedSize] = useState("S");
  const handleBoxClick = (index) => {
    setSelectedBox(index);
  };
  const handleBoxSizeClick = (size) => {
    setSelectedSize(size);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setValue(1);
  };
  const dispatch = useDispatch();
  const compareData = useSelector(compareListData);
  const wishlistData = useSelector(WishListData);

  const [compare, setCompare] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  useEffect(() => {
    const itemCompered = compareData.find(
      (element) => element?._id === item?._id
    );
    if (itemCompered) {
      setCompare(true);
    }
    const itemWishList = wishlistData.find(
      (element) => element?._id === item?._id
    );
    if (itemWishList) {
      setWishlist(true);
    }
  }, [item]);
  const modalStyles = {
    header: {
      borderLeft: `5px solid black`,
      borderRadius: 0,
      paddingInlineStart: 5,
    },
    body: {
      height: "fit",
    },
    mask: {
      backdropFilter: "blur(10px)",
    },
    footer: {
      borderTop: "1px solid #333",
    },
    content: {
      boxShadow: "0 0 30px #999",
      background: "#ffffff",
      borderRadius: "18px",
    },
  };
  const items = [
    {
      key: "1",
      label: <p className="text-black">Description</p>,
      children: (
        <p className=" max-h-[15vh] overflow-auto scrollbar text-gray-500">
          {item?.description}
        </p>
      ),
    },
  ];
  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      styles={modalStyles}
      footer={null}
      width="50vw"
    >
      <div className="flex justify-between py-4  gap-8 max-h-[100%] min-h-[100%]">
        <div className="w-[40%] min-h-[100%] max-h-[100%]  ">
          <img
            src={item?.image}
            alt=""
            className="w-[100%] h-[100%] object-cover"
          />
        </div>
        <div className="px-4 py-2 w-[60%] flex flex-col h-[100%] gap-5 justify-between">
          <p className="text-xl font-semibold ">{item?.name}</p>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <p className="flex items-center border-2 border-[#6895D2] rounded-lg min-w-fit font-medium p-2 text-[#6895D2] !leading-none ">
                $ {item?.price}
              </p>
              <Rate
                disabled
                defaultValue={item?.rate?.rating}
                className=" text-[28px]"
              />
            </div>

            <FaHeart
              style={{ color: wishlist ? "#D04848" : "grey", fontSize: "23px" }}
              onClick={() => {
                setWishlist(!wishlist);
                dispatch(addOrRemoveDataFromWishList(item));
              }}
              className="icon-com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[18px] flex gap-2 items-center capitalize font-bold">
                Color{" "}
              </p>
              <ColorBox
                color="#f95a61"
                isSelected={selectedBox === "#f95a61"}
                onClick={() => handleBoxClick("#f95a61")}
              />
              <ColorBox
                color="#5aa1f9"
                isSelected={selectedBox === "#5aa1f9"}
                onClick={() => handleBoxClick("#5aa1f9")}
              />
              <ColorBox
                color="#0d1824"
                isSelected={selectedBox === "#0d1824"}
                onClick={() => handleBoxClick("#0d1824")}
              />
              <ColorBox
                color="yellow"
                isSelected={selectedBox === "#ffffb6"}
                onClick={() => handleBoxClick("#ffffb6")}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[18px] flex gap-2 items-center capitalize font-bold">
                Size
              </p>
              <SizeBox
                text="S"
                isSelected={selectedSize === "S"}
                onClick={() => handleBoxSizeClick("S")}
              />
              <SizeBox
                text="M"
                isSelected={selectedSize === "M"}
                onClick={() => handleBoxSizeClick("M")}
              />
              <SizeBox
                text="L"
                isSelected={selectedSize === "L"}
                onClick={() => handleBoxSizeClick("L")}
              />
              <SizeBox
                text="XL"
                isSelected={selectedSize === "XL"}
                onClick={() => handleBoxSizeClick("XL")}
              />
            </div>
          </div>
          <Collapse
            items={items}
            expandIconPosition="end"
            className=" rounded-xl "
            style={{ background: "rgba(226,232,240,.6)" }}
          />

          <div className="flex items-center justify-evenly gap-1 w-full ">
            <AddToCartInputNumber
              value={value}
              setValue={setValue}
              className=""
            />
            <Button
              className=" rounded-full  p-5  h-auto w-[65%] bg-[#F3B95F] "
              type="secondary"
              onClick={() => {
                dispatch(addToCart({ item: item, value: value }));
                handleCancel();
              }}
            >
              ADD TO CART
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default QuickViewModal;
