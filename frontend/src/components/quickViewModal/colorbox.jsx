import { useState } from "react";

function ColorBox({ color, isSelected, onClick }) {
  return (
    <div
      className={` bg-white w-[70px] h-[50px]  rounded-full cursor-pointer flex items-center justify-center ${
        isSelected ? "border-2 border-[#6895D2]" : "border-2 border-transparent"
      }`}
      onClick={onClick}
    >
      <div
        className={`w-[60px] h-[40px]  rounded-full`}
        style={{ background: color }}
      ></div>
    </div>
  );
}

export default ColorBox;
