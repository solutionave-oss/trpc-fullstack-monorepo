"use client";

import { motion, } from "framer-motion";
import type { FC, ReactNode, } from "react";
import { createContext, useContext, useState, } from "react";

const LoaderContext = createContext({
  isLoading: false,
  startLoading: () => {
    //
  },
  stopLoading: () => {
    //
  },
});

export const LoaderProvider: FC<{ children: ReactNode }> = ({ children, }) => {
  const [isLoading, setIsLoading,] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <LoaderContext.Provider value={ {
      isLoading, startLoading, stopLoading,
    } }>
      { children }
      { isLoading && <LoadingOverlay/> }
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);

const LoadingOverlay = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
      initial={ {
        opacity: 0,
      } }
      animate={ {
        opacity: 1,
      } }
      exit={ {
        opacity: 0,
      } }
    >
      <motion.div
        className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"
      />
    </motion.div>
  );
};
