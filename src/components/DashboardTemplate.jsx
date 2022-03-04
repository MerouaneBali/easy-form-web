import React from "react";
import Menu from "./Menu";
import Header from "./Header";

function DashboardTemplate({ children }) {
  return (
    <div id="dashboard">
      <Menu />
      <div id="dashboard__body">
        <Header />
        <div id="dashboard__body__content">{children}</div>
      </div>
    </div>
  );
}

export default DashboardTemplate;
