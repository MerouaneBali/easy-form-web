import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import mergeRefs from "../utils/mergeRefs";

// import "../css/components/Forms.css";

function Form({
  handleSubmit,
  inputs,
  fieldError,
  setFieldError,
  onSubmit,
  button,
}) {
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = (nativeEvent, targetInput) => {
    const rect = nativeEvent.target.getBoundingClientRect();
    const x = nativeEvent.clientX - rect.left;

    if (x >= rect.width - 14 * 2) {
      const passwordInput = targetInput;

      // eslint-disable-next-line no-unused-expressions
      passwordInput.type === "password"
        ? (passwordInput.type = "text")
        : (passwordInput.type = "password");

      passwordInput.classList.toggle("password--hide-password");
    }
  };

  const onSubmitWrapper = async (data) => {
    setFieldError(null);

    setLoading(true);

    await onSubmit(data);

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitWrapper)}>
      {inputs.map((input) => (
        <div key={input.name}>
          <label htmlFor={input.label}>{input.label}</label>
          <input
            type={input.type}
            name={input.name}
            placeholder={input.placeholder}
            autoComplete={input.autoComplete}
            id={input.id}
            className={`input--standard ${
              fieldError && fieldError.field === input.name
                ? " input-error"
                : ""
            }`}
            ref={mergeRefs(input.ref, input.externalRef)}
            onChange={input.onChange}
            onBlur={input.onBlur}
            inputRef={input.ref}
            onClick={({ nativeEvent }) => {
              if (input.type === "password") {
                togglePasswordVisibility(
                  nativeEvent,
                  input.externalRef.current
                );
              }
            }}
          />
          {/* eslint-disable-next-line operator-linebreak */}
          {fieldError && fieldError.field === input.name && (
            <p className="validation-error">{fieldError.message}</p>
            // eslint-disable-next-line indent
          )}
        </div>
      ))}

      <button type="submit" className={button.className || "button--primary"}>
        {button.value || "submit"}
        {loading && (
          <FontAwesomeIcon
            icon={faCircleNotch}
            className="spinner icon__light"
          />
        )}
      </button>
    </form>
  );
}

export default Form;
