function Step5({ project }) {
  return (
    <div id="step_5" className="step">
      <h1>Here you have your forms URLs!</h1>

      <p>Add them on your {project.projectName}'s forms</p>

      <hr />

      <h2>Your URLs</h2>

      {Object.keys(project.forms).map((form, index) => (
        <div key={index} className="form">
          <h3>{form.name}</h3>
          <div className="form__link">
            <p>
              https://easy-forms-api.herokuapp.com/forms/6246cae4102ccd385e57e6fd
            </p>
            <button
              className="button--primary"
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://easy-forms-api.herokuapp.com/forms/6246cae4102ccd385e57e6fd`
                );
                alert("Your API key was copied to your clipboard");
              }}
            >
              COPY
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Step5;
