import { useEffect, useState } from "react";
import "./grid.styles.css";
function GridNumber({ gridColumns, isSelected, onGridChange }) {
  const [columns, setColumns] = useState(Array.from("x".repeat(gridColumns)));

  return (
    <div
      style={{ width: `${gridColumns * 20}px` }}
      className={`transition-colors	 grid-container flex h-[30px] p-2 ${
        !isSelected ? "border-gray-400" : "border-[#6895D2]"
      }  border-2 bg-white items-center justify-between gap-2 rounded-md cursor-pointer`}
      onClick={onGridChange}
    >
      {columns?.map((item, index) => {
        return (
          <div
            key={index}
            className={`transition-colors		 flex w-[10px]  h-[20px] bg-[#6895D2]  ${
              !isSelected ? "bg-gray-400" : "bg-[#6895D2]"
            } rounded-md`}
          ></div>
        );
      })}
    </div>
  );
}

export default GridNumber;
