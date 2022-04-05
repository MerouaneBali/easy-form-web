import React from "react";

function Timeline({ steps, currentStep, setCurrentStep }) {
  return (
    <ul
      id="steps"
      className={currentStep === steps.length ? "steps--hide" : ""} // Hide the steps timeline on the last step
    >
      {/* Rendering the steps timeline */}
      {steps.map((step, index) => (
        <li
          onClick={
            index < currentStep ? () => setCurrentStep(index) : () => {} // Allow the timeline item (representing a step number) to be clicked if we already have passed that step
          }
          key={index}
          className={
            index <= currentStep
              ? "steps__step steps__step--active" // Highliting the current timeline item
              : "steps__step"
          }
        >
          <div className="steps__step__number">{index + 1}</div>
          <div
            className={
              steps.length !== index + 1 ? "steps__step__pipline" : "" // Preventing the last timeline item from rendering it's pipline
            }
          />
          <div className="steps__step__title">{step.name}</div>
        </li>
      ))}
    </ul>
  );
}

export default Timeline;
