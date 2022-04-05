import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Restart({ restart }) {
  return (
    <button
      id="restart"
      className="absolute-controller"
      type="button"
      onClick={restart} // set the current step to the first one
    >
      <FontAwesomeIcon icon={faRedo} />
      Restart
    </button>
  );
}

export default Restart;
