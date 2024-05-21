import { createContext, useState } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [pname, setPname] = useState("");
  const [uno, setUno] = useState("");

  return (
    <UserContext.Provider
      value={{
        pname,
        setPname,
        uno,
        setUno,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserStore;
