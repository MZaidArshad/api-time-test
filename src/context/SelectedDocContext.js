import React, { createContext, useState, useContext } from "react";

// Create the context
const SelectedDocContext = createContext();

// Create the provider component
export const SelectedDocProvider = ({ children }) => {
  const [selectedDoc, setSelectedDoc] = useState({});

  return (
    <SelectedDocContext.Provider value={{ selectedDoc, setSelectedDoc }}>
      {children}
    </SelectedDocContext.Provider>
  );
};

// Custom hook to use the selectedDoc context
export const useSelectedDoc = () => {
  const context = useContext(SelectedDocContext);
  if (!context) {
    throw new Error("useSelectedDoc must be used within a SelectedDocProvider");
  }
  return context;
};
