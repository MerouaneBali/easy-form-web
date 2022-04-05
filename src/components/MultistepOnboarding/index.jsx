import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faRedo } from "@fortawesome/free-solid-svg-icons";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

import "swiper/css";

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

  // Steps to be rendered
  const steps = [
    {
      name: "Intro",
      View: () => <Step1 setCurrentStep={setCurrentStep} />,
    },
    {
      name: "Project",
      View: () => (
        <Step2 setProject={setProject} setCurrentStep={setCurrentStep} />
      ),
    },
    {
      name: "Forms",
      View: () => (
        <Step3 setProject={setProject} setCurrentStep={setCurrentStep} />
      ),
    },
    {
      name: "That's it!",
      View: () => (
        <Step4
          project={project}
          setProject={setProject}
          setCurrentStep={setCurrentStep}
        />
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
        // Back button
        <button
          id="go-back"
          className="absolute-controller"
          type="button"
          onClick={() => setCurrentStep((prevState) => prevState - 1)} // set the current step to the previews one
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          Go Back
        </button>
      ) : (
        // Restart button
        <button
          id="restart"
          className="absolute-controller"
          type="button"
          onClick={() => setCurrentStep(0)} // set the current step to the first one
        >
          <FontAwesomeIcon icon={faRedo} />
          Restart
        </button>
      )}

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

      <div id="carousel__container">
        <Swiper
          id="carousel"
          initialSlide={currentStep}
          spaceBetween={0}
          slidesPerView={1}
          allowTouchMove={false}
          onSwiper={setSwiper} // Setting the swiper instance
        >
          {/* Rendering the steps views */}
          {steps.map(({ View }, index) => (
            <SwiperSlide key={index} className="carousel__wrapper">
              <View
                project={project}
                setProject={setProject}
                setCurrentStep={setCurrentStep}
              />
            </SwiperSlide>
          ))}
          {/* Rendering last step alone so it won't be included in the steps timeline  */}
          <SwiperSlide className="carousel__wrapper">
            <Step5 project={project} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default MultistepOnboarding;

// TODO:
// - Make a function called next() that replaces `setCurrentStep((prevState) => prevState + 1);`, and pass it to the steps views
