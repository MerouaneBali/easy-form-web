import React from "react";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Overview from "../../components/Overview";
import Documentation from "../../components/Documentation";
import Projects from "../../components/Projects";
import Settings from "../../components/Settings";
import Subscriptions from "../../components/Subscriptions";

function Dashboard({ children }) {
  const state = "overview";

  const ViewRF = () => {
    switch (state) {
      case "overview":
        return <Overview />;

      case "documentation":
        return <Documentation />;

      case "projects":
        return <Projects />;

      case "settings":
        return <Settings />;

      case "subscriptions":
        return <Subscriptions />;

      default:
        return <Overview />;
    }
  };

  return (
    <div id="dashboard">
      <Menu />

      <div id="dashboard__body">
        {/* <Header /> */}
        <div id="dashboard__body__content">
          <ViewRF />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
