import { Checkbox, Drawer, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";

function FilterDrawer({
  onCloseFiterDrawer,
  openFilterDrawer,
  setFilterMaxPrice,
  setFilterMinPrice,
  filterMaxPrice,
  filterMinPrice,
  filterName,
  setFilterName,
  setCategoryFilter,
}) {
  const [plainOptions, setPlainOptions] = useState([]);
  const getData = () => {
    fetch("https://fake-e-commerce-api.onrender.com/categories/")
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        setPlainOptions(json);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  const onChange = (checkedValues) => {
    setCategoryFilter(checkedValues);
    if (checkedValues.length <= 0) {
      setCategoryFilter(plainOptions);
    } else {
      setCategoryFilter(checkedValues);
    }
  };

  return (
    <Drawer
      title="FILTER"
      onClose={onCloseFiterDrawer}
      open={openFilterDrawer}
      placement="left"
    >
      <div className="flex flex-col  gap-4 w-full  h-full">
        <div className="flex items-start  gap-2 flex-col">
          <p className="py-1 border-b-2 border-black text-xl font-semibold">
            NAME
          </p>
          <Input
            placeholder="Basic usage"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </div>
        <div className="flex items-start  gap-2 flex-col">
          <p className="py-1 border-b-2 border-black text-xl font-semibold">
            PRICE
          </p>
          <div className="flex items-center justify-start gap-2 w-full">
            <p>FROM</p>
            <InputNumber
              size="small"
              min={0}
              max={10000}
              type="number"
              defaultValue={filterMinPrice}
              onChange={(e) => setFilterMinPrice(e)}
            />

            <p>TO</p>
            <InputNumber
              size="small"
              min={1}
              max={10000}
              type="number"
              defaultValue={filterMaxPrice}
              onChange={(e) => setFilterMaxPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-start  gap-2 flex-col w-full">
          <p className="py-1 border-b-2 border-black text-xl font-semibold">
            CATEGORY
          </p>
          <Checkbox.Group
            options={plainOptions}
            onChange={onChange}
            className="flex flex-col overflow-y-auto max-h-[150px] flex-nowrap	w-full"
          />
        </div>
      </div>
    </Drawer>
  );
}

export default FilterDrawer;
