import React, { useEffect } from "react";
import DashboardTemplate from "../../components/DashboardTemplate";
import Documentation from "../documentation";

function DocumentationMirror({ headerTitleAction }) {
  useEffect(() => {
    headerTitleAction("Documentation");
  }, []);

  return (
    <DashboardTemplate>
      <Documentation />
    </DashboardTemplate>
  );
}

export default DocumentationMirror;
