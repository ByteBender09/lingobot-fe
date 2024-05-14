"use client";

import { createContext } from "react";
import { useState } from "react";

export const ScoreContext = createContext({});

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState({});
  const [loadingScore, setLoadingScore] = useState(false);

  return (
    <ScoreContext.Provider
      value={{
        score,
        setScore,
        loadingScore,
        setLoadingScore,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};
