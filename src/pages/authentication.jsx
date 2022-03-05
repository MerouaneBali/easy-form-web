import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Code from "../components/Code";
import Tabs from "../components/Tabs";
import api from "../utils/api";
import mergeRefs from "../utils/mergeRefs";
import consoleLogDevInfo from "../utils/cldi";
// import "../css/layouts/authentication.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Logo from "../components/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

function Authentication() {
  const { register, resetField, handleSubmit } = useForm();

  const router = useRouter();

  const email = register("email");
  const password = register("password");
  const passwordConfirmation = register("passwordConfirmation");
  const [fieldError, setFieldError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [authMethod, setAuthMethod] = useState("login");

  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

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

  const onSubmit = async (data) => {
    setFieldError(null);

    setLoading(true);

    switch (authMethod) {
      case "register":
        try {
          await api.instance.post("/authentication/register", {
            email: data.email,
            password: data.password,
            passwordConfirmation: data.passwordConfirmation,
          });

          // setAuthSession(Cookies.get("session"));

          router.push("/dashboard/overview");
        } catch (error) {
          const res = error.response;

          if (!res) {
            // eslint-disable-next-line
            alert("An error has accured");
          } else if (res.status === 400) {
            setFieldError(res.data);
          } else if (res.status === 409) {
            setFieldError({
              field: "email",
              message: "User with this email already exists",
            });
          } else {
            // eslint-disable-next-line no-alert
            alert(
              "An internal server error has occurred, please try again in few seconds"
            );
          }
        }
        break;

      case "login":
        try {
          await api.instance
            .post(
              "/authentication/login",
              {
                email: data.email,
                password: data.password,
              },
              { withCredentials: true }
            )
            // eslint-disable-next-line no-console
            .then((res) => console.log(res));

          // setAuthSession(Cookies.get("session"));

          router.push("/dashboard/overview");
        } catch (error) {
          const res = error.response;

          if (!res) {
            // eslint-disable-next-line
            alert("An error has accured");
          } else if (res.status === 400) {
            setFieldError(res.data);
          } else if (res.status === 404) {
            setFieldError({
              field: "email",
              message: "No user exists with such email",
            });
          } else {
            // eslint-disable-next-line no-alert
            alert(
              "An internal server error has occurred, please try again in few seconds"
            );
          }
        }
        break;

      case "reset":
        try {
          await api.instance.post("/authentication/resetPassword", {
            email: data.email,
            newPassword: data.password,
            newPasswordConfirmation: data.passwordConfirmation,
          });

          // eslint-disable-next-line no-alert
          alert(
            "A password reset link was sent to your email, please click it to reset your password to the new one"
          );
        } catch (error) {
          const res = error.response;

          if (!res) {
            // eslint-disable-next-line
            alert("An error has accured");
          } else if (res.status === 400) {
            res.data.field = res.data.field.replace("newPassword", "password");
            setFieldError(res.data);
          } else {
            // eslint-disable-next-line no-alert
            alert(
              "An internal server error has occurred, please try again in few seconds"
            );
          }
        }
        break;

      default:
        break;
    }

    setLoading(false);
  };

  useEffect(() => {
    consoleLogDevInfo();
  }, []);

  return (
    <main id="Authentication">
      <aside>
        <div id="authentication">
          {authMethod === "login" && (
            <section>
              <Logo />
              <h3>easy forms</h3>
            </section>
          )}

          <section>
            {authMethod === "login" && (
              <>
                <h2>log in to easy forms</h2>
                <p>Enter your email and password below</p>
              </>
            )}

            {authMethod === "register" && (
              <>
                <h2>create New account</h2>
                <p>Please fill the following fields</p>
              </>
            )}

            {authMethod === "reset" && (
              <>
                <h2>reset password</h2>
                <p>Please fill the following fields</p>
              </>
            )}
          </section>

          <section>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email adress"
                  autoComplete="username"
                  id="email"
                  className={`input--standard ${
                    fieldError && fieldError.field === "email"
                      ? " input-error"
                      : ""
                  }`}
                  ref={email.ref}
                  onChange={email.onChange}
                  onBlur={email.onBlur}
                  inputRef={email.ref}
                />
                {fieldError && fieldError.field === "email" && (
                  <p className="validation-error">{fieldError.message}</p>
                )}
              </div>

              <div>
                <label>
                  password
                  {authMethod === "login" && (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <span
                      role="button"
                      tabIndex="0"
                      onClick={() => {
                        if (!loading) {
                          resetField("password");
                          setFieldError(null);
                          setAuthMethod("reset");
                        }
                      }}
                    >
                      Forgot password?
                    </span>
                  )}
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  id="password"
                  className={`input--standard ${
                    fieldError && fieldError.field === "password"
                      ? " input-error"
                      : ""
                  }`}
                  ref={mergeRefs(passwordRef, password.ref)}
                  onChange={password.onChange}
                  onBlur={password.onBlur}
                  inputRef={password.ref}
                  onClick={
                    ({ nativeEvent }) =>
                      togglePasswordVisibility(nativeEvent, passwordRef.current)
                    // eslint-disable-next-line react/jsx-curly-newline
                  }
                />
                {fieldError && fieldError.field === "password" && (
                  <p className="validation-error">{fieldError.message}</p>
                )}
              </div>

              {/* eslint-disable-next-line operator-linebreak */}
              {authMethod !== "login" && (
                <div>
                  <label>
                    {authMethod === "register" && "password confirmation"}
                    {authMethod === "reset" && "new password confirmation"}
                  </label>
                  <input
                    type="password"
                    name="passwordConfirmation"
                    placeholder="Password confirmation"
                    autoComplete="new-password"
                    id="password-confirmation"
                    className={`input--standard ${
                      fieldError && fieldError.field === "passwordConfirmation"
                        ? " input-error"
                        : ""
                    }`}
                    ref={mergeRefs(
                      passwordConfirmationRef,
                      passwordConfirmation.ref
                    )}
                    onChange={passwordConfirmation.onChange}
                    onBlur={passwordConfirmation.onBlur}
                    inputRef={passwordConfirmation.ref}
                    onClick={
                      ({ nativeEvent }) =>
                        togglePasswordVisibility(
                          nativeEvent,
                          passwordConfirmationRef.current
                        )
                      // eslint-disable-next-line react/jsx-curly-newline
                    }
                  />
                  {/* eslint-disable-next-line operator-linebreak */}
                  {fieldError && fieldError.field === "passwordConfirmation" && (
                    <p className="validation-error">{fieldError.message}</p>
                    // eslint-disable-next-line indent
                  )}
                </div>
              )}

              <button type="submit" className="button--primary">
                {authMethod === "register" && "register"}
                {authMethod === "login" && "login"}
                {authMethod === "reset" && "reset"}
                {loading && (
                  <FontAwesomeIcon
                    icon={faCircleNotch}
                    className="spinner icon__light"
                  />
                )}
              </button>
            </form>
          </section>

          <section>
            <p>
              {authMethod === "login" && "Don't have an account?"}
              {authMethod === "register" && "Already have an account?"}
              {authMethod === "reset" && "Remembered your password?"}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
              <span
                id="auth-method-toggle"
                role="button"
                tabIndex="0"
                onClick={() => {
                  if (!loading) {
                    setFieldError(null);

                    setAuthMethod((prevState) => {
                      if (prevState === "register" || prevState === "reset") {
                        resetField("passwordConfirmation");
                        return "login";
                      }

                      return "register";
                    });
                  }
                }}
              >
                {" "}
                {authMethod === "login" && "Sign up"}
                {authMethod === "register" && "Log in"}
                {authMethod === "reset" && "Log in"}
              </span>
            </p>
          </section>
        </div>
      </aside>
    </main>
  );
}

export default Authentication;
