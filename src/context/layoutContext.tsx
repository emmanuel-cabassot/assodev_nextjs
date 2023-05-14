import React, { createContext, useState, useEffect, ReactNode } from 'react';


export const LayoutContext = createContext({
    headerHeight: 0 as number,
    setHeaderHeight: (height: number) => {},
    footerHeight: 0 as number,
    setFooterHeight: (height: number) => {},
    stepperHeight: 147 as number,
    saveHeaderHeight: (height: number) => {},
})


export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);

  const saveHeaderHeight = (headerHeight:any) => {
    console.log(' on rentre dans le saveHeaderHeight')
    setHeaderHeight(headerHeight);
  } ;

  const context = {
    headerHeight,
    setHeaderHeight,
    footerHeight,
    setFooterHeight,
    stepperHeight: 147,
    saveHeaderHeight,
  }

  return (
    <LayoutContext.Provider value={context}>
      {children}
    </LayoutContext.Provider>
  );
};
