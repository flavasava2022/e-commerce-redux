import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChangedListner,
  signOutUser,
} from "../utils/firebase/firebase";
const UserDataProvider = createContext();
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListner((user) => {
      console.log(user);
      setUser(user);
    });
    return unsubscribe;
  }, []);
  const value = {
    user,
    setUser,
  };
  return (
    <UserDataProvider.Provider value={value}>
      {children}
    </UserDataProvider.Provider>
  );
}

export default UserProvider;
export { UserDataProvider };
