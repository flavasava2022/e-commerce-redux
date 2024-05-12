import { createContext, useContext, useEffect, useState } from "react";
import ItemContainer from "../../components/itemContainer/itemContainer";
import {
  Drawer,
  Empty,
  Input,
  InputNumber,
  Pagination,
  Select,
  Spin,
} from "antd";
import GridNumber from "../category/grid";
import FilterDrawer from "../category/filterDrawer";
import { FilterFilled } from "@ant-design/icons";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { WishListData } from "../../store/wishlist/wishlist.selectors";
function ItemsContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [loading, setLoading] = useState(false);

  const [gridValue, setGridValue] = useState("5");
  const [paginatedItems, setPaginatedItems] = useState([]);
  const wishlistData = useSelector(WishListData);
  // console.log("wishlistData", wishlistData);
  useEffect(() => {
    setPaginatedItems(
      wishlistData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    );
  }, [wishlistData, currentPage, itemsPerPage]);
  // console.log("categoryFilter", categoryFilter);
  const onGridChange = (value) => {
    setGridValue(value);
  };

  return (
    <div className=" gap-2 flex-col min-w-[80%]  my-4 min-h-[70vh] h-full">
      {loading ? (
        <Spin size="large" />
      ) : (
        <div className="w-full flex flex-col items-center gap-2 justify-between p-2 h-full">
          <div className="w-full flex items-center justify-center">
            <div className="flex items-center justify-between gap-2">
              <GridNumber
                gridColumns={"3"}
                isSelected={gridValue === "3"}
                onGridChange={() => onGridChange("3")}
              />
              <GridNumber
                gridColumns={"4"}
                isSelected={gridValue === "4"}
                onGridChange={() => onGridChange("4")}
              />
              <GridNumber
                gridColumns={"5"}
                isSelected={gridValue === "5"}
                onGridChange={() => onGridChange("5")}
              />
            </div>
          </div>
          {paginatedItems.length === 0 ? (
            <div className="flex items-center justify-center w-full h-full min-h-[20vh] mt-auto mb-0">
              <Empty />
            </div>
          ) : (
            <div
              className="grid items-center  justify-center   gap-6 itemsContainer w-full my-4"
              style={{ gridTemplateColumns: `repeat(${gridValue}, 1fr)` }}
            >
              {/* Render paginated items */}
              {paginatedItems.map((item, index) => (
                <ItemContainer item={item} key={item.id} id={item.id} />
              ))}
            </div>
          )}

          <Pagination
            defaultCurrent={1}
            total={wishlistData.length}
            onChange={(page) => setCurrentPage(page)}
            hideOnSinglePage={true}
            className="mt-2"
          />
        </div>
      )}
    </div>
  );
}

export default ItemsContainer;
