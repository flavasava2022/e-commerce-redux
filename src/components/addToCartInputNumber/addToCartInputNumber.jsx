import {
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
  UpCircleFilled,
} from "@ant-design/icons";
import { Button, Modal, InputNumber } from "antd";
import { useState } from "react";
function AddToCartInputNumber({ value, setValue }) {
  const increment = () => {
    if (value !== 10) {
      setValue(value + 1);
    }
  };
  const decrement = () => {
    if (value !== 1) {
      setValue(value - 1);
    }
  };
  return (
    <div className="flex rounded-full p-3 bg-[#6895D2] h-auto w-[35%] justify-between">
      <button
        onClick={decrement}
        // style={{ border: "none" }}
        className="flex items-center justify-center  p-2 rounded-full	text-white bg-[white]"
      >
        <MinusOutlined
          style={{ fontSize: "18px", color: "black", fontWeight: "bolder" }}
        />
      </button>
      <InputNumber
        readOnly
        onChange={setValue}
        max={10}
        value={value}
        style={{
          border: "none",
          width: "40px",
          fontSize: "18px",
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

export default AddToCartInputNumber;
