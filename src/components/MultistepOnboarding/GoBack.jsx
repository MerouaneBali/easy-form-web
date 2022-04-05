import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function GoBack({ prevStep }) {
  return (
    <button
      id="go-back"
      className="absolute-controller"
      type="button"
      onClick={prevStep}
    >
      <FontAwesomeIcon icon={faChevronLeft} />
      Go Back
    </button>
  );
}

export default GoBack;
