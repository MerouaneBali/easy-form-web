import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

function Step4({ project, setProject, setCurrentStep }) {
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setProject((prevState) => ({ ...prevState, forms: data }));
    setCurrentStep((prevState) => prevState + 1);
  };

  return (
    <div id="step_4" className="step">
      <h1>
        Great! now give a name to each form
        <br />
        to differentiate them
      </h1>

      <form
        id="step_4__form"
        className={project.formsTotal > 3 ? "step_4__adjust" : ""}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Rendering a text input for every form */}
        {[...Array(project.formsTotal).keys()].map((index) => (
          <div key={index}>
            <input
              type="text"
              name="project"
              id="project"
              required
              className="input--standard"
              placeholder={`Name of form #${index + 1}...`}
              // Registering input
              {...register(String(index), {
                minLength: {
                  value: 8,
                  message: "Form name must be at least 8 characters long",
                },
                maxLength: {
                  value: 200,
                  message: "Form name must be less than 200 characters long",
                },
                required: true,
              })}
            />
            {/* Rendering errors */}
            {errors[index] && (
              <p className="input--error">{errors[index].message}</p>
            )}
          </div>
        ))}

        <button type="submit" className="button button--primary">
          Create
          <FontAwesomeIcon icon={faCogs} className="icon__light" />
        </button>
      </form>
    </div>
  );
}

export default Step4;
