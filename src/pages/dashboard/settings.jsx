import React, { useEffect } from "react";
import DashboardTemplate from "../../components/DashboardTemplate";

function Settings({ headerTitleAction }) {
  useEffect(() => {
    headerTitleAction("Settings");
  }, []);

  return (
    <DashboardTemplate>
      <div>settings</div>
    </DashboardTemplate>
  );
}

export default Settings;
