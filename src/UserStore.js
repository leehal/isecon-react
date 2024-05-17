import { createContext, useState } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [pname, setPname] = useState("");

  return (
    <UserContext.Provider
      value={{
        pname,
        setPname,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserStore;
