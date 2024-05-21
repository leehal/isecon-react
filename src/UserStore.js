import { createContext, useEffect, useState } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [pname, setPname] = useState("");
  const [uno, setUno] = useState(localStorage.getItem("uno") || "");
  const a = 0;

  useEffect(() => {
    localStorage.setItem("uno", uno);
  }, [uno]);

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
