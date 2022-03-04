import React, { useEffect } from "react";
import DashboardTemplate from "../../components/DashboardTemplate";

function Subscriptions({ headerTitleAction }) {
  useEffect(() => {
    headerTitleAction("Subscriptions");
  }, []);

  return (
    <DashboardTemplate>
      <div>subscriptions</div>
    </DashboardTemplate>
  );
}

export default Subscriptions;
