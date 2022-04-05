import React from "react";

function Step1({ setCurrentStep }) {
  return (
    <div id="step_1" className="step">
      <h1>Hello! Welcome to Easy Forms</h1>
      <p>
        Handle your forms without the hassle of building your own back-end
        system again!
      </p>
      <button
        className="button button--primary"
        onClick={() => setCurrentStep((prevState) => prevState + 1)}
      >
        Let's Go
      </button>
    </div>
  );
}

export default Step1;
