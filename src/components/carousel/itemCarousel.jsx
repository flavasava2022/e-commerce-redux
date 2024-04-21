import { Button, Rate } from "antd";
import "../itemContainer/itemContainer.styles.css";
import {
  FilterOutlined,
  HeartOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
  FilterFilled,
  HeartFilled,
} from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { CompareDataProvider } from "../../context/compareContext";
import { wishlistDataProvider } from "../../context/whishlistContext";
import { CartDataProvider } from "../../context/cartContext";
import QuickViewModal from "../quickViewModal/quickViewModal";

function ItemCarousel({ item }) {
  const { compareData, addOrRemoveDataFromCompareList } =
    useContext(CompareDataProvider);
  const { wishlistData, addOrRemoveDataFromWishList } =
    useContext(wishlistDataProvider);
  const { addToCart } = useContext(CartDataProvider);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const showModal = () => {
    setIsModalOpen(true);
  };
  const AddToCart = () => {
    addToCart(item, 1);
  };
  return (
    <div className=" main-container relative  bg-white p-6 text-center overflow-hidden shadow-inner	border-2 border-grey-100 w-[20%] min-w-[242px]   h-[90%] rounded-lg flex flex-col items-center gap-4 ">
      <div className="w-[60%] min-h-[60%] max-h-[60%]  ">
        <img
          src={item?.image}
          alt=""
          className="w-[100%] h-[100%] object-cover"
        />
      </div>
      <div className=" absolute  w-full h-full  top-0 left-0 overlay-cart   opacity-0 flex flex-col items-center justify-end gap-2">
        <Button
          onClick={showModal}
          className="quick-view-btn relative w-[60%] p-4 h-[50px] rounded-full"
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
          onClick={AddToCart}
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
      <p className="text-center overflow-hidden max-h-[45px]">{item?.name}</p>
      <div className="flex items-center justify-between w-full mt-auto">
        <Rate disabled defaultValue={item?.rating?.rate} />
        <p className="flex items-center border-2 border-[#6895D2] rounded-lg min-w-fit font-medium p-2 text-[#6895D2] !leading-none ">
          $ {Math.floor(item?.price)}
        </p>
      </div>

      <QuickViewModal
        item={item}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        addToCart={addToCart}
      />
    </div>
  );
}

export default ItemCarousel;
