import { createContext, useContext, useState } from "react";

const MathContext = createContext();

export const MathProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  return (
    <MathContext.Provider value={{ history, setHistory }}>
      {children}
    </MathContext.Provider>
  );
};

export const useMathContext = () => useContext(MathContext);