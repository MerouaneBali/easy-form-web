import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import DashboardTemplate from "../../components/DashboardTemplate";
import Form from "../../components/Form";
import api from "../../utils/api";
// import "../css/layouts/Profile.css";

function Profile({ headerTitleAction }) {
  // useEffect(() => {
  //   headerTitleAction("Profile");
  // }, []);

  const route = useRouter();

  const { register, handleSubmit } = useForm();
  const email = register("email");
  const password = register("password");
  const passwordConfirmation = register("passwordConfirmation");
  const [fieldError, setFieldError] = useState(null);

  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const onSubmit = async (data) => {
    try {
      const res = await api.instance.post("/profile/update", {
        email: data.email,
        password: data.password ? data.password : undefined,
        passwordConfirmation: data.passwordConfirmation
          ? data.passwordConfirmation
          : undefined,
      });

      if (res.data) {
        // eslint-disable-next-line no-alert
        alert(
          `Profile has been successfully updated!${
            res.data.newEmail
              ? "\n\nPlease check your new email inbox and click the verification link to apply the changes"
              : ""
          }${res.data.newPassword ? "\n\nYour password has been updated" : ""}`
        );
      }
    } catch (error) {
      const res = error.response;

      if (!res) {
        // eslint-disable-next-line no-alert
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
  };

  const logout = async () => {
    try {
      await api.instance.get("/authentication/logout");

      Cookies.remove("session");

      route.push("/authentication");
    } catch (error) {
      const res = error.response;

      if (!res) {
        // eslint-disable-next-line no-alert
        alert("An error has accured");
      } else {
        // eslint-disable-next-line no-alert
        alert(
          "An internal server error has occurred, please try again in few seconds"
        );
      }
    }
  };

  return (
    <DashboardTemplate>
      <div id="profile">
        <h1>Edit Profile</h1>
        <Form
          handleSubmit={handleSubmit}
          inputs={[
            {
              label: "new email",
              type: "email",
              name: "email",
              placeholder: "Email address",
              autoComplete: "username",
              id: "email",
              externalRef: null,
              ref: email.ref,
              onChange: email.onChange,
              onBlur: email.onBlur,
            },
            {
              label: "new password",
              type: "password",
              name: "password",
              placeholder: "Password",
              autoComplete: "new-password",
              id: "password",
              externalRef: passwordRef,
              ref: password.ref,
              onChange: password.onChange,
              onBlur: password.onBlur,
            },
            {
              label: "new password confirmation",
              type: "password",
              name: "passwordConfirmation",
              placeholder: "Password address",
              autoComplete: "new-password",
              id: "password-confirmation",
              externalRef: passwordConfirmationRef,
              ref: passwordConfirmation.ref,
              onChange: passwordConfirmation.onChange,
              onBlur: passwordConfirmation.onBlur,
            },
          ]}
          fieldError={fieldError}
          setFieldError={setFieldError}
          button={{ value: "save" }}
          onSubmit={(data) => onSubmit(data)}
        />
        <button className="button--danger" type="button" onClick={logout}>
          Logout
        </button>
      </div>
    </DashboardTemplate>
  );
}

export default Profile;
