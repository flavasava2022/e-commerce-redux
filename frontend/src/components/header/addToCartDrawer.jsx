import {
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
  UpCircleFilled,
} from "@ant-design/icons";
import { Button, Modal, InputNumber } from "antd";
import { useContext, useEffect, useState } from "react";

import "../../App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCartDrawer,
  removeFromCartDrawer,
} from "../../store/cart/cart.reducer";
import { selectCartItems } from "../../store/cart/cart.selectors";
function AddToCartDrawer({ quantity, item }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(quantity);
  const cartData = useSelector(selectCartItems);

  const increment = () => {
    if (value !== 10) {
      setValue(value + 1);
      dispatch(addToCartDrawer({ item: item, value: value }));
    }
  };
  const decrement = () => {
    setValue(value - 1);
    dispatch(removeFromCartDrawer({ item: item, value: value }));
  };
  useEffect(() => {
    setValue(quantity);
  }, [quantity]);
  return (
    <div className="flex rounded-full p-3 bg-[#6895D2] h-auto  justify-between w-[100%]">
      <button
        onClick={decrement}
        // style={{ border: "none" }}
        className="flex items-center justify-center  p-2 rounded-full	text-white bg-[white]"
      >
        {value === 1 ? (
          <DeleteOutlined
            style={{ fontSize: "14px", color: "black", fontWeight: "bolder" }}
          />
        ) : (
          <MinusOutlined
            style={{ fontSize: "14px", color: "black", fontWeight: "bolder" }}
          />
        )}
      </button>
      <InputNumber
        readOnly
        onChange={setValue}
        max={10}
        value={value}
        style={{
          border: "none",
          width: "40px",
          fontSize: "14px",
          fontWeight: "bolder",
        }}
        className="Input-Number  bg-transparent"
      />
      <button
        onClick={increment}
        className="flex items-center justify-center  p-2 rounded-full	text-white bg-[white]"
      >
        <PlusOutlined
          style={{ fontSize: "18px", color: "black", fontWeight: "bolder" }}
        />
      </button>
    </div>
  );
}

export default AddToCartDrawer;
