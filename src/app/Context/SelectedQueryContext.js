"use client";

import { createContext } from "react";
import { useState } from "react";

export const SeletedQueryContext = createContext({});

export const SeletedQueryProvider = ({ children }) => {
  const [selectedQuery, setSelectedQuery] = useState({});

  return (
    <SeletedQueryContext.Provider
      value={{
        selectedQuery,
        setSelectedQuery,
      }}
    >
      {children}
    </SeletedQueryContext.Provider>
  );
};
