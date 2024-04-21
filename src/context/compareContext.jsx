import {
  Children,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { UserDataProvider } from "./userContext";
import { getUserData, updateSpecificFields } from "../utils/firebase/firebase";
const CompareDataProvider = createContext();
const INITIAL_STATE = {
  compareData: [],
};
const COMPARE_ACTION_TYPE = {
  ADD_OR_REMOVE: "ADD_OR_REMOVE",
};
const compareReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case COMPARE_ACTION_TYPE.ADD_OR_REMOVE:
      return {
        ...state,
        compareData: payload,
      };
      break;

    default:
      break;
  }
};
function CompareProvider({ children }) {
  // const [compareData, setCompareData] = useState([]);
  const [{ compareData }, dispatch] = useReducer(compareReducer, INITIAL_STATE);
  // const { user } = useContext(UserDataProvider);
  // const getDataFromFireStore = async () => {
  //   const response = await getUserData();
  //   console.log(response);
  //   setCompareData(response?.compareData);
  // };
  // useEffect(() => {
  //   if (user) {
  //     setTimeout(() => {
  //       getDataFromFireStore();
  //     }, 1000);
  //   } else {
  //     setCompareData([]);
  //   }
  // }, [user]);
  // useEffect(() => {
  //   if (user) {
  //     updateSpecificFields("compareData", compareData);
  //   }
  // }, [compareData]);
  const addOrRemoveDataFromCompareList = (item) => {
    const found = compareData.find((element) => element._id === item._id);
    let newCompareData;
    if (found) {
      newCompareData = compareData.filter(
        (element) => element._id !== item._id
      );
    } else {
      newCompareData = [...compareData, item];
    }

    dispatch({ type: "ADD_OR_REMOVE", payload: newCompareData });
  };
  console.log(compareData);
  const value = { compareData, addOrRemoveDataFromCompareList };
  return (
    <CompareDataProvider.Provider value={value}>
      {children}
    </CompareDataProvider.Provider>
  );
}

export default CompareProvider;
export { CompareDataProvider };
