import { useState } from "react";

function ColorBox({ color, isSelected, onClick }) {
  return (
    <div
      className={`p-1 bg-white w-fit  rounded-full cursor-pointer ${
        isSelected ? "border-2 border-[#6895D2]" : "border-transparent"
      }`}
      onClick={onClick}
    >
      <div
        className={`w-[70px] h-[40px]  rounded-full`}
        style={{ background: color }}
      ></div>
    </div>
  );
}

export default ColorBox;
