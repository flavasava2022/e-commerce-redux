import { createAction } from "../../utils/reducer/reducer";
import { COMPARE_ACTION_TYPE } from "./compare.types";

  export const addOrRemoveDataFromCompareList = (compareData,item) => {
    console.log(compareData)
    const found = compareData.find((element) => element._id === item._id);
    let newCompareData;
    if (found) {
      newCompareData = compareData.filter(
        (element) => element._id !== item._id
      );
    } else {
      newCompareData = [...compareData, item];
    }

    return createAction(COMPARE_ACTION_TYPE.ADD_OR_REMOVE, newCompareData );
  };