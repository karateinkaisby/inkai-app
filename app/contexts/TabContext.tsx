"use client";

import { createContext, useContext, useState } from "react";

interface TabState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabContext = createContext<TabState>({
  activeTab: "",
  setActiveTab: () => {},
});

export function TabProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  return useContext(TabContext);
}

export default TabContext;
