import { useState } from "react";

function SizeBox({ text, isSelected, onClick }) {
  return (
    <div
      className={`w-[70px] h-[40px]  rounded-xl flex items-center justify-center ${
        isSelected ? "bg-[#6895D2] text-white" : "bg-white"
      } border-2  cursor-pointer`}
      onClick={onClick}
    >
      <p className="text-xl font-semibold ">{text}</p>
    </div>
  );
}

export default SizeBox;
