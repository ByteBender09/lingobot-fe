"use client";

import { createContext } from "react";
import { useState } from "react";
import { MODELTYPE } from "../const";

export const ModelStateContext = createContext({});

export const ModelStateProvider = ({ children }) => {
  const [activeStyleIndex, setActiveStyleIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(MODELTYPE.T5);

  return (
    <ModelStateContext.Provider
      value={{
        activeStyleIndex,
        selectedOption,
        setActiveStyleIndex,
        setSelectedOption,
      }}
    >
      {children}
    </ModelStateContext.Provider>
  );
};
