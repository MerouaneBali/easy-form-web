import React, { useEffect } from "react";
import DashboardTemplate from "../../components/DashboardTemplate";

function Overview({ headerTitleAction }) {
  useEffect(() => {
    headerTitleAction("Overview");
  }, [headerTitleAction]);

  return (
    <DashboardTemplate>
      <div>overview</div>
    </DashboardTemplate>
  );
}

export default Overview;
