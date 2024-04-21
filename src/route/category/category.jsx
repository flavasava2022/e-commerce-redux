import { useEffect, useState } from "react";

import { Drawer, Input, InputNumber, Pagination, Select, Spin } from "antd";
import GridNumber from "../../components/itemsContainer/grid";
import { FilterFilled } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import ItemContainer from "../../components/itemContainer/itemContainer";
import FilterDrawer from "../../components/itemsContainer/filterDrawer";
function Category() {
  let { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("A-Z");
  const [gridValue, setGridValue] = useState("5");
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState(9999);
  const [filterMinPrice, setFilterMinPrice] = useState(0);
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const showFilterDrawer = () => {
    setOpenFilterDrawer(true);
  };
  const onCloseFiterDrawer = () => {
    setOpenFilterDrawer(false);
  };
  const fetchData = () => {
    fetch(
      `https://fake-e-commerce-api.onrender.com/product/subcategory/${category}`
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  };

  useEffect(() => {
    setData([]);
    setLoading(true);
    fetchData();
  }, [category]);
  // console.log(data);
  useEffect(() => {
    const filteredItems = data.filter((item) => {
      const itemNameMatch = item?.name
        .toLowerCase()
        .includes(filterName?.toLowerCase());
      const itemPriceMatch =
        filterMaxPrice === "" ||
        filterMinPrice === "" ||
        (item.price <= parseFloat(filterMaxPrice) &&
          item.price >= parseFloat(filterMinPrice));
      const itemCategoryMatch =
        categoryFilter.length > 0
          ? categoryFilter.find((element) => {
              // console.log(element, item?.category);
              return element === item?.category;
            })
          : true;
      // console.log("itemCategoryMatch", itemCategoryMatch);
      return itemNameMatch && itemCategoryMatch && itemPriceMatch;
    });
    const sortedItems = [...filteredItems].sort((a, b) => {
      switch (sort) {
        case "a-b":
          return b.price - a.price;
          break;
        case "b-a":
          return a.price - b.price;
          break;
        case "A-Z":
          return a?.name?.toLowerCase() < b?.name?.toLowerCase() ? -1 : 1;
          break;
        case "Z-A":
          return b?.name?.toLowerCase() < a?.name?.toLowerCase() ? -1 : 1;
          break;
        default:
          break;
      }
    });
    setPaginatedItems(
      sortedItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    );
  }, [
    data,
    currentPage,
    itemsPerPage,
    sort,
    filterMaxPrice,
    filterMinPrice,
    filterName,
    categoryFilter,
  ]);
  console.log("categoryFilter", categoryFilter);
  const onGridChange = (value) => {
    setGridValue(value);
  };
  const handleSortChange = (value) => {
    setSort(value);
  };
  return (
    <div className="flex items-center justify-center gap-2 flex-col min-w-[80%]  my-4 min-h-[70vh]">
      {loading ? (
        <Spin size="large" />
      ) : (
        <div className="w-full flex flex-col items-center gap-2 justify-between p-2 ">
          <div className="w-full flex items-center justify-between">
            <div
              onClick={showFilterDrawer}
              className="flex items-center justify-between gap-2 cursor-pointer"
            >
              <p className="text-xl  text-gray-400">FILTER</p>{" "}
              <FilterFilled className="text-xl text-gray-400" />
            </div>
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
            <Select
              defaultValue={sort}
              style={{
                width: 120,
              }}
              onChange={handleSortChange}
              options={[
                {
                  label: " A-Z",
                  value: "A-Z",
                },
                {
                  label: "Z-A",
                  value: "Z-A",
                },
                {
                  label: "low to high",
                  value: "b-a",
                },
                {
                  label: "high to low",
                  value: "a-b",
                },
              ]}
            />
          </div>
          <div
            className="grid items-center  justify-center   gap-6 itemsContainer w-full my-4"
            style={{ gridTemplateColumns: `repeat(${gridValue}, 1fr)` }}
          >
            {/* Render paginated items */}
            {paginatedItems.map((item, index) => (
              <ItemContainer item={item} key={item._id} />
            ))}
          </div>
          <Pagination
            defaultCurrent={1}
            total={data.length}
            onChange={(page) => setCurrentPage(page)}
            hideOnSinglePage={true}
            className="mt-2"
          />
        </div>
      )}

      <FilterDrawer
        onCloseFiterDrawer={onCloseFiterDrawer}
        openFilterDrawer={openFilterDrawer}
        setFilterMaxPrice={setFilterMaxPrice}
        setFilterMinPrice={setFilterMinPrice}
        filterMaxPrice={filterMaxPrice}
        filterMinPrice={filterMinPrice}
        filterName={filterName}
        setFilterName={setFilterName}
        setCategoryFilter={setCategoryFilter}
      />
    </div>
  );
}

export default Category;
