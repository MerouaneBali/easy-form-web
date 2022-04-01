import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function Step3({ project, setProject, setCurrentStep }) {
  return (
    <div id="step_3" className="step">
      <h1>How many forms do have in this project?</h1>

      <div id="step_3__choices">
        {[...Array(4).keys()].map((index) => (
          <div
            key={index}
            onClick={() => {
              setProject((prevState) => ({
                ...prevState,
                formsTotal: index + 1,
              }));
              setCurrentStep((prevState) => prevState + 1);
            }}
          >
            <h1>{index + 1}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Step3;
