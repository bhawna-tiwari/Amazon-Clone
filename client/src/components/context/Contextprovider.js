import  { createContext } from "react";
import React, { useContext, useEffect, useState } from "react";

export const Logincontext = createContext(null);

const Contextprovider = ({ children }) => {
  const [account, setAccount] = useState("");

  return <>
      <Logincontext.Provider value={{ account, setAccount }}>
        {children}
      </Logincontext.Provider>
    </>;
};

export default Contextprovider;
