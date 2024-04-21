import { useContext, useEffect, useState } from "react";
import { CompareDataProvider } from "../../context/compareContext";
import ItemContainer from "../../components/itemContainer/itemContainer";

import { Table } from "antd";
function ComparePage() {
  const { compareData, addOrRemoveDataFromCompareList } =
    useContext(CompareDataProvider);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  // console.log(compareData);
  useEffect(() => {
    if (columns.length > 0) {
      const resultArray = [];
      setData([]);
      for (let i = 0; i <= 3; i++) {
        const newObj = {
          key: `${i}`,
        };
        columns.forEach((item, index) => {
          if (index === 0) {
            switch (i) {
              case 0:
                newObj[item.dataIndex] = <div className="w-fit"></div>;
                break;
              case 1:
                newObj[item.dataIndex] = <p className="w-fit">AVAILABILITY</p>;
                break;
              case 2:
                newObj[item.dataIndex] = <p className="w-fit">CAREGORY</p>;
                break;
              case 3:
                newObj[item.dataIndex] = <p className="w-fit">ONSALE</p>;
                break;
              default:
                break;
            }
          } else {
            // console.log(index);
            switch (i) {
              case 0:
                newObj[item.dataIndex] = (
                  <div className=" flex items-center justify-center">
                    <ItemContainer
                      item={compareData[index - 1]}
                      key={compareData[index - 1]?._id}
                    />
                  </div>
                );
                break;
              case 1:
                newObj[item.dataIndex] = (
                  <div className="w-full flex items-center justify-center">
                    {compareData[index]?.quantity === 0
                      ? "OUT OF STOCK"
                      : "IN STOCK"}
                  </div>
                );
                break;
              case 2:
                newObj[item.dataIndex] = (
                  <div className="w-full flex items-center justify-center">
                    {compareData[index]?.category}
                  </div>
                );
                break;
              case 3:
                newObj[item.dataIndex] = (
                  <p className="w-full flex items-center justify-center">
                    {compareData[index]?.Sale?.available
                      ? `$ ${
                          compareData[index]?.Sale?.pricebefore -
                          compareData[index]?.price
                        }`
                      : "-"}
                  </p>
                );
                break;
              default:
                break;
            }
          }
        });
        resultArray.push(newObj);
      }
      setData(resultArray);
    } else {
      setData([]);
    }
  }, [columns, compareData]);
  // console.log(data);
  useEffect(() => {
    setColumns([]);
    for (let index = 0; index < compareData.length + 1; index++) {
      const element = compareData[index];

      setColumns((pervState) => {
        // console.log(index);
        return [
          ...pervState,
          {
            title: `column${index + 1}`,
            dataIndex: `column${index + 1}`,
            key: `column${index + 1}`,
          },
        ];
      });
    }
  }, [compareData]);
  const compareData2 = [
    {
      title: "",
      dataIndex: "empty",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  // console.log(jsxElements); // Array of JSX elements
  // console.log(data); // Object with keys as dataIndex values and JSX elements as values
  return (
    <div className="w-[80%] mx-auto">
      <Table
        dataSource={data}
        columns={columns}
        showHeader={false}
        responsive={["md"]}
        pagination={false}
        bordered={true}
        size="middle"
      />
    </div>
  );
}

export default ComparePage;
