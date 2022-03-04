import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../../utils/api";

// import "../css/layouts/Forms.css";
import ModelBox from "../../../components/ModelBox";
import { useRouter } from "next/router";
import DashboardTemplate from "../../../components/DashboardTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faCheckDouble,
  faCheck,
  faClock,
  faTrash,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";

function Form({ headerTitleAction }) {
  const [form, setForm] = useState(null);
  const [tableHeader, setTableHeader] = useState([]);

  const route = useRouter();
  const [formId, setFormId] = useState(null);

  useEffect(() => {
    formId && headerTitleAction(`Form Inbox`);
  }, [formId]);

  useEffect(() => {
    if (route.query.params) {
      setFormId(route.query.params[1]);

      const projectId = route.query.params[0];
      const formId = route.query.params[1];

      (async () => {
        if (!projectId && !formId) {
          return;
        }

        try {
          const res = await api.instance.get(`/forms/${projectId}/${formId}`);
          const keys = [];
          if (res.data.inbox) {
            res.data.inbox.map(
              (message) =>
                Object.keys(message.data).map(
                  (key) => !keys.includes(key) && keys.push(key)
                )
              // eslint-disable-next-line function-paren-newline
            );
          }
          setForm(res.data);
          setTableHeader(keys);
          setSelectedFields(keys.slice(0, 3));
        } catch (error) {
          // eslint-disable-next-line no-alert
          alert("An error accured");
        }
      })();
    }
  }, [route]);

  const { register, handleSubmit, setValue } = useForm();

  const [modelBox, setModelBox] = useState(false);

  const [formModel, setFormModel] = useState(false);
  const [selectFieldsModel, setSelectFieldsmModel] = useState(false);
  const [selectedFields, setSelectedFields] = useState([]);
  const [loadingResolveMessage, setLoadingResolveMessage] = useState(false);
  const [loadingDeleteMessage, setLoadingDeleteMessage] = useState(false);

  const onSelectFields = (data) => {
    const filtered = Object.keys(data).filter((key) => data[key]);

    setSelectedFields(filtered.length ? filtered : [tableHeader[0]]);

    setSelectFieldsmModel(false);
    setModelBox(false);
  };

  const openMessage = async (messageId) => {
    try {
      await api.instance.patch(`/forms/${formId}/open/${messageId}`);

      setForm((prevState) => ({
        ...prevState,
        inbox: prevState.inbox.map(
          // eslint-disable-next-line no-confusing-arrow
          (message) =>
            // eslint-disable-next-line no-underscore-dangle
            message._id !== messageId ? message : { ...message, opened: true }
          // eslint-disable-next-line function-paren-newline
        ),
      }));
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert("An error accured");
    }
  };

  const resolveMessage = async (messageId) => {
    try {
      setLoadingResolveMessage(true);

      await api.instance.patch(`/forms/${formId}/resolve/${messageId}`);

      setForm((prevState) => ({
        ...prevState,
        inbox: prevState.inbox.map(
          // eslint-disable-next-line no-confusing-arrow
          (message) =>
            // eslint-disable-next-line no-underscore-dangle
            message._id !== messageId ? message : { ...message, resolved: true }
          // eslint-disable-next-line function-paren-newline
        ),
      }));

      setLoadingResolveMessage(false);
      setFormModel(false);
      setModelBox(false);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert("An error accured");
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      setLoadingDeleteMessage(messageId);

      await api.instance.delete(`/forms/${formId}/${messageId}`);

      setForm((prevState) => ({
        ...prevState,
        // eslint-disable-next-line no-underscore-dangle
        inbox: prevState.inbox.filter((message) => message._id !== messageId),
      }));

      setLoadingDeleteMessage(false);
      setFormModel(false);
      setModelBox(false);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert("An error accured");
    }
  };

  if (!form) {
    return <></>;
  } else {
    return (
      <DashboardTemplate>
        <div id="forms">
          <div id="forms--stats">
            <div>
              <p>received</p>
              <h3>{form ? form.inbox.length : 0}</h3>
            </div>
            <div>
              <p>opened</p>
              <h3>
                {form ? form.inbox.filter((data) => data.opened).length : 0}
              </h3>
            </div>
            <div>
              <p>waiting</p>
              <h3>
                {/* eslint-disable-next-line operator-linebreak */}
                {form
                  ? form.inbox.length -
                    form.inbox.filter((data) => data.opened).length
                  : 0}
              </h3>
            </div>
            <div>
              <p>resolved</p>
              <h3>
                {form ? form.inbox.filter((data) => data.resolved).length : 0}
              </h3>
            </div>
          </div>
          <div id="forms--settings">
            {/* eslint-disable-next-line no-underscore-dangle */}
            <p>https://easy-forms-api.herokuapp.com/forms/{formId}</p>
            <div>
              <button
                className="button--secondary"
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(
                    // eslint-disable-next-line no-underscore-dangle
                    `https://easy-forms-api.herokuapp.com/forms/${formId}`
                  );
                  // eslint-disable-next-line no-alert
                  alert("Your API key was copied to your clipboard");
                }}
              >
                copy
              </button>
              {/* <button className="button--secondary" type="button">
              examples
            </button> */}
              <button
                className="button--primary"
                type="button"
                onClick={() => {
                  // eslint-disable-next-line no-alert
                  alert("This feature is not available yet :)");
                }}
              >
                rules
              </button>
              {/* <button className="button--secondary" type="button">
              select fields
            </button> */}
            </div>
          </div>
          <div id="forms--table-container">
            {form && (
              <table>
                <thead>
                  <tr>
                    {selectedFields
                      .filter((key) => key !== "_id")
                      .map((header) => (
                        <th key={header}>{header}</th>
                      ))}
                    <th>created</th>
                    <th>
                      <button
                        className="button--icon"
                        type="button"
                        onClick={() => {
                          selectedFields.map(
                            (field) =>
                              setValue(field, selectedFields.includes(field))
                            // eslint-disable-next-line function-paren-newline
                          );

                          setSelectFieldsmModel(true);
                          setModelBox(true);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faCog}
                          className="icon__shadow"
                        />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {form.inbox.map((message) => (
                    <tr
                      // eslint-disable-next-line no-underscore-dangle
                      key={message._id}
                      onClick={async () => {
                        // eslint-disable-next-line no-underscore-dangle
                        openMessage(message._id);
                        setFormModel(message);
                        setModelBox(true);
                      }}
                    >
                      {selectedFields
                        .filter((key) => key !== "_id")
                        .map((key) => (
                          <td key={key}>
                            {message.data[key] && String(message.data[key])}
                          </td>
                        ))}
                      <td>
                        {message.created.split("T")[0]}{" "}
                        {message.created.split("T")[1].split(":")[0]}:
                        {message.created.split("T")[1].split(":")[1]}
                      </td>
                      <td className="form__options">
                        <div className="form__status">
                          {/* eslint-disable-next-line no-nested-ternary */}
                          {message.resolved ? (
                            <p className="form__status--resolved">
                              resolved{"  "}
                              <FontAwesomeIcon
                                icon={faCheckDouble}
                                className="icon__light"
                              />
                            </p>
                          ) : message.opened ? (
                            <p className="form__status--opened">
                              opened{"  "}
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="icon__light"
                              />
                            </p>
                          ) : (
                            <p className="form__status--waiting">
                              waiting{"  "}
                              <FontAwesomeIcon
                                icon={faClock}
                                className="icon__light"
                              />
                            </p>
                          )}
                        </div>
                        <button
                          className="button--icon form__action"
                          type="button"
                          onClick={async (event) => {
                            event.stopPropagation();
                            // eslint-disable-next-line no-underscore-dangle
                            deleteMessage(message._id);
                          }}
                        >
                          {/* eslint-disable-next-line no-underscore-dangle */}
                          {loadingDeleteMessage === message._id ? (
                            <FontAwesomeIcon
                              icon={faCircleNotch}
                              className="spinner icon__light"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="icon__shadow"
                            />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <ModelBox
          title="Select Display Fields"
          visible={modelBox && selectFieldsModel}
          setVisible={() => {
            setSelectFieldsmModel(false);
            setModelBox(false);
          }}
        >
          <form onSubmit={handleSubmit(onSelectFields)}>
            {tableHeader
              .filter((key) => key !== "_id")
              .map((key) => (
                <div key={key}>
                  <input
                    type="checkbox"
                    id={key}
                    // name={key}
                    // value={key}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register(key)}
                    // defaultV alue={selectedFields.includes(key)}
                    // defaultValue
                  />
                  <label htmlFor={key}>{key}</label>
                </div>
              ))}
            <button type="submit" className="button--primary">
              Save
            </button>
          </form>
        </ModelBox>

        {formModel && (
          <ModelBox
            id="forms__select-display-fields"
            title="form details"
            visible={modelBox && formModel}
            setVisible={() => {
              setFormModel(false);
              setModelBox(false);
            }}
          >
            <p>
              <span>created:</span> <span>{formModel.created}</span>
            </p>
            {Object.keys(formModel.data)
              .filter((key) => key !== "_id")
              .map((key) => (
                <p key={key}>
                  <span>{key}:</span>{" "}
                  <span>
                    {formModel.data[key] && String(formModel.data[key])}
                  </span>
                </p>
              ))}
            <button
              type="submit"
              className="button--primary"
              // eslint-disable-next-line no-underscore-dangle
              onClick={async () => resolveMessage(formModel._id)}
            >
              mark as resolved{" "}
              {loadingResolveMessage && (
                <FontAwesomeIcon
                  icon={faCircleNotch}
                  className="spinner icon__light"
                />
              )}
            </button>
            <button
              type="submit"
              className="button--danger"
              // eslint-disable-next-line no-underscore-dangle
              onClick={async () => deleteMessage(formModel._id)}
            >
              delete{" "}
              {loadingDeleteMessage && (
                <FontAwesomeIcon
                  icon={faCircleNotch}
                  className="spinner icon__light"
                />
              )}
            </button>
          </ModelBox>
        )}
      </DashboardTemplate>
    );
  }
}

export default Form;
