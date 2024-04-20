"use client";

import { createContext } from "react";
import { useState } from "react";
import { SUBSCRIBTION } from "../const";

export const CurrentSubscribtionContext = createContext({});

export const CurrentSubscribtionProvider = ({ children }) => {
  const [subscribtion, setSubscribtion] = useState(SUBSCRIBTION.FREE);

  return (
    <CurrentSubscribtionContext.Provider
      value={{
        subscribtion,
        setSubscribtion,
      }}
    >
      {children}
    </CurrentSubscribtionContext.Provider>
  );
};
