import React, { useEffect } from "react";
import Subscriptions from "../subscriptions";
import DashboardTemplate from "../../components/DashboardTemplate";

function SubscriptionsMirror({ headerTitleAction }) {
  useEffect(() => {
    headerTitleAction("Subscriptions");
  }, []);

  return (
    <DashboardTemplate>
      <Subscriptions />
    </DashboardTemplate>
  );
}

export default SubscriptionsMirror;
