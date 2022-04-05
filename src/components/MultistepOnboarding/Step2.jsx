import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Step2({ setProject, setCurrentStep }) {
  const [projectName, setProjectName] = useState("");

  return (
    <div id="step_2" className="step">
      <h1>First, what's your project's name?</h1>
      <input
        type="text"
        name="project"
        id="project"
        className="input--standard"
        placeholder="Yout project's name..."
        value={projectName}
        onChange={({ target }) => setProjectName(target.value)}
      />
      <button
        className="button button--primary"
        style={{ opacity: projectName ? 1 : 0.5 }}
        onClick={() => {
          if (!projectName) return;

          setProject((prevState) => ({ ...prevState, projectName }));
          setCurrentStep((prevState) => prevState + 1);
        }}
      >
        Next
        <FontAwesomeIcon icon={faChevronRight} className="icon__light" />
      </button>
    </div>
  );
}

export default Step2;
