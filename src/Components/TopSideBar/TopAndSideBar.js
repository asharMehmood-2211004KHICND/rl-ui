import React from "react";
import TopBar from "../Header/TopBar";
import SideBar from "../SideBar/SideBar";

export const TopAndSideBar = ({children}) => {
  return (
    <div className="App">
      <TopBar />
      <div className="containerz">
        <SideBar />
        <div className="pages">{children}</div>
      </div>
    </div>
  );
};
