import React from "react";
import Navigation from "./Navigation";

function GeneralTemplate({ children }) {
  return (
    <div id="GeneralTemplate">
      <Navigation />
      {children}
    </div>
  );
}

export default GeneralTemplate;
