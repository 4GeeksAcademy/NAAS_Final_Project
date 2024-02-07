// GlobalStyleContext.js
import React, { createContext, useState, useContext } from 'react';

const GlobalStyleContext = createContext();

export const useGlobalStyle = () => useContext(GlobalStyleContext);

export const GlobalStyleProvider = ({ children }) => {
  const [isStyleActive, setIsStyleActive] = useState(
    localStorage.getItem('isStyleActive') === 'true'
  );

  const toggleGlobalStyle = (className, targetSelector) => {
    const updatedIsStyleActive = !isStyleActive;
    const elements = document.querySelectorAll(targetSelector);

    if (updatedIsStyleActive) {
      elements.forEach((element) => {
        element.classList.add(className);
      });
    } else {
      elements.forEach((element) => {
        element.classList.remove(className);
      });
    }

    localStorage.setItem('isStyleActive', updatedIsStyleActive.toString());
    setIsStyleActive(updatedIsStyleActive);
  };

  return (
    <GlobalStyleContext.Provider value={{ isStyleActive, toggleGlobalStyle }}>
      {children}
    </GlobalStyleContext.Provider>
  );
};
