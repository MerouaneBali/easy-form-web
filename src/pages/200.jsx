import { faCheckCircle, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FormSubmitted() {
  return (
    <div id="form-submitted">
      <h1>Congratulations!</h1>
      <p>Form submitted successfully</p>
      <FontAwesomeIcon icon={faCheckCircle} size="8x" />
      <h3>
        Powered by <span>Easy Forms</span>
      </h3>
    </div>
  );
}

export default FormSubmitted;
