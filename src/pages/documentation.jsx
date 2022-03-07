import React from "react";
import Code from "../components/Code";
import GeneralTemplate from "../components/GeneralTemplate";
import Tabs from "../components/Tabs";
import Documentation from "./_documentation";

function DocumentationMirror() {
  return (
    <GeneralTemplate>
      <Documentation />
    </GeneralTemplate>
  );
}

export default DocumentationMirror;
