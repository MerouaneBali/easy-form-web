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
  const [swiper, setSwiper] = useState();
  const [project, setProject] = useState({
    formsTotal: 0,
    forms: {},
  });
  const [currentStep, setCurrentStep] = useState(0);

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

  useEffect(() => {
    swiper && swiper.slideTo(currentStep);
  }, [swiper, currentStep]);

  return (
    <div id="multistep-onboarding">
      {currentStep < steps.length ? (
        <button
          id="go-back"
          className="absolute-controller"
          type="button"
          onClick={() => setCurrentStep((prevState) => prevState - 1)}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          Go Back
        </button>
      ) : (
        <button
          id="restart"
          className="absolute-controller"
          type="button"
          onClick={() => setCurrentStep(0)}
        >
          <FontAwesomeIcon icon={faRedo} />
          Restart
        </button>
      )}

      <ul
        id="steps"
        className={currentStep === steps.length ? "steps--hide" : ""}
      >
        {steps.map((step, index) => (
          <li
            onClick={
              index < currentStep ? () => setCurrentStep(index) : () => {}
            }
            key={index}
            className={
              index <= currentStep
                ? "steps__step steps__step--active"
                : "steps__step"
            }
          >
            <div className="steps__step__number">{index + 1}</div>
            <div
              className={
                steps.length !== index + 1 ? "steps__step__pipline" : ""
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
          onSwiper={setSwiper}
          onSlideChange={() => console.log("slide change")}
        >
          {steps.map(({ View }, index) => (
            <SwiperSlide key={index} className="carousel__wrapper">
              <View
                project={project}
                setProject={setProject}
                setCurrentStep={setCurrentStep}
              />
            </SwiperSlide>
          ))}
          <SwiperSlide className="carousel__wrapper">
            <Step5 project={project} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default MultistepOnboarding;
