import { useEffect, useState } from "react";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

import GoBack from "./GoBack";
import Restart from "./Restart";
import Timeline from "./Timeline";
import Carousel from "./Carousel";

function MultistepOnboarding() {
  // Swiper instance
  const [swiper, setSwiper] = useState();

  // Project data
  const [project, setProject] = useState({
    formsTotal: 0,
    forms: {},
  });

  // Current step
  const [currentStep, setCurrentStep] = useState(0);

  const prevStep = () => setCurrentStep((prevState) => prevState - 1); // set the current step to the previews one
  const nextStep = () => setCurrentStep((prevState) => prevState + 1); // set the current step to the next one
  const restart = () => setCurrentStep(0); // set the current step to the first one

  // Steps to be rendered
  const steps = [
    {
      name: "Intro",
      View: () => <Step1 nextStep={nextStep} />,
    },
    {
      name: "Project",
      View: () => <Step2 setProject={setProject} nextStep={nextStep} />,
    },
    {
      name: "Forms",
      View: () => <Step3 setProject={setProject} nextStep={nextStep} />,
    },
    {
      name: "That's it!",
      View: () => (
        <Step4 project={project} setProject={setProject} nextStep={nextStep} />
      ),
    },
  ];

  // Watching currentStep changes
  useEffect(() => {
    swiper && swiper.slideTo(currentStep);
  }, [swiper, currentStep]);

  return (
    <div id="multistep-onboarding">
      {/* Rendering back button in all steps except in the last one */}
      {currentStep < steps.length ? (
        <GoBack prevStep={prevStep} />
      ) : (
        <Restart restart={restart} />
      )}

      <Timeline
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      <Carousel project={project} steps={steps} setSwiper={setSwiper} />
    </div>
  );
}

export default MultistepOnboarding;
