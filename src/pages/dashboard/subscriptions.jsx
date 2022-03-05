import React, { useEffect } from "react";
import DashboardTemplate from "../../components/DashboardTemplate";

function SubscriptionsMirror({ headerTitleAction }) {
  useEffect(() => {
    headerTitleAction("Subscriptions");
  }, []);

  return (
    <DashboardTemplate>
      <div>subscriptions</div>
    </DashboardTemplate>
  );
}

export default SubscriptionsMirror;
