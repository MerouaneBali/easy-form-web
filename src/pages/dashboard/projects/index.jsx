import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../../../components/Form";
import ModelBox from "../../../components/ModelBox";
import api from "../../../utils/api";
import Link from "next/link";
import DashboardTemplate from "../../../components/DashboardTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Projects({ headerTitleAction }) {
  useEffect(() => {
    headerTitleAction("Projects");
  }, []);

  const { register, handleSubmit } = useForm();
  const projectName = register("projectName");
  const formName = register("formName");
  const newName = register("newName");

  const [fieldError, setFieldError] = useState(null);
  const [projects, setProjects] = useState([]);

  // FIX: USE REDUX STORE?
  const modelBox = () => {};
  const setModelBox = () => {};

  const [addProject, setAddProject] = useState(false);

  const [editProject, setEditProject] = useState(false);

  const [addForm, setAddForm] = useState(false);

  const onProjectSubmit = async (data) => {
    try {
      const res = await api.instance.post("/projects", {
        name: data.projectName,
      });

      setProjects((prevState) => [...prevState, res.data]);

      setModelBox(false);
      setEditProject(false);
    } catch (error) {
      const res = error.response;

      if (!res) {
        // eslint-disable-next-line no-alert
        alert("An error has accured");
      } else if (res.status === 400) {
        setFieldError({ ...res.data, field: "projectName" });
      } else if (res.status === 409) {
        setFieldError({
          field: "projectName",
          message: "Project with this name already exists",
        });
      } else {
        // eslint-disable-next-line no-alert
        alert(
          "An internal server error has occurred, please try again in few seconds"
        );
      }
    }
  };

  const onProjectUpdateSubmit = async (data) => {
    try {
      await api.instance.post("/projects/update", {
        name: data.newName,
        project: data.project,
      });

      setProjects(
        (prevState) =>
          prevState.map(
            // eslint-disable-next-line no-confusing-arrow
            (project) =>
              // eslint-disable-next-line no-underscore-dangle
              project._id === data.project
                ? { ...project, name: data.newName }
                : project
            // eslint-disable-next-line function-paren-newline
          )
        // eslint-disable-next-line function-paren-newline
      );

      setModelBox(false);
      setEditProject(false);
    } catch (error) {
      const res = error.response;

      if (!res) {
        // eslint-disable-next-line no-alert
        alert("An error has accured");
      } else if (res.status === 400) {
        setFieldError({ ...res.data, field: "newName" });
      } else {
        // eslint-disable-next-line no-alert
        alert(
          "An internal server error has occurred, please try again in few seconds"
        );
      }
    }
  };

  const onProjectDeleteSubmit = async (projectId) => {
    try {
      await api.instance.post("/projects/delete", { project: projectId });

      setProjects(
        // eslint-disable-next-line no-underscore-dangle
        (prevState) => prevState.filter((project) => project._id !== projectId)
        // eslint-disable-next-line function-paren-newline
      );

      // alert("Project has successfully been deleted");

      setModelBox(false);
      setEditProject(false);
    } catch (error) {
      const res = error.response;

      if (!res) {
        // eslint-disable-next-line no-alert
        alert("An error has accured");
      } else if (res.status === 400) {
        setFieldError({ ...res.data, field: "newName" });
      } else {
        // eslint-disable-next-line no-alert
        alert(
          "An internal server error has occurred, please try again in few seconds"
        );
      }
    }
  };

  const onFormSubmit = async (data) => {
    try {
      await api.instance.post("/forms", {
        name: data.formName,
        project: data.project,
      });

      setProjects(
        (prevState) =>
          prevState.map((project) => {
            // eslint-disable-next-line no-underscore-dangle
            if (project._id === data.project) {
              return {
                ...project,
                forms: [...project.forms, { name: data.formName }],
              };
            }
            return project;
          })
        // eslint-disable-next-line function-paren-newline
      );

      setModelBox(false);
      setEditProject(false);
    } catch (error) {
      const res = error.response;

      if (!res) {
        // eslint-disable-next-line no-alert
        alert("An error has accured");
      } else if (res.status === 400) {
        setFieldError({ ...res.data, field: "formName" });
      } else if (res.status === 409) {
        setFieldError({
          field: "formName",
          message: "Form with this name already exists",
        });
      } else {
        // eslint-disable-next-line no-alert
        alert(
          "An internal server error has occurred, please try again in few seconds"
        );
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await api.instance.get("/projects");

        setProjects(res.data);
      } catch (error) {
        // alert("An error accured");
      }
    })();
  }, []);

  return (
    <DashboardTemplate>
      <>
        {projects.length ? (
          <div id="projects">
            {projects.map((project) => (
              // eslint-disable-next-line no-underscore-dangle
              <div key={project._id} className="project">
                <div className="project-header">
                  {/* eslint-disable-next-line no-underscore-dangle */}
                  {/* <Link href={`/projects/${project._id}`} passHref> */}
                  <h3>{project.name}</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setModelBox((prevState) => !prevState);
                      // eslint-disable-next-line no-confusing-arrow
                      setEditProject(
                        // eslint-disable-next-line no-underscore-dangle
                        (prevState) => (!prevState ? project._id : false)
                        // eslint-disable-next-line function-paren-newline
                      );
                    }}
                  >
                    settings
                  </button>
                </div>
                <div className="add-new-form">
                  <p>Create new form</p>
                  <button
                    className="button--icon"
                    type="button"
                    onClick={() => {
                      setModelBox((prevState) => !prevState);
                      // eslint-disable-next-line no-confusing-arrow
                      setAddForm(
                        // eslint-disable-next-line no-underscore-dangle
                        (prevState) => (!prevState ? project._id : false)
                        // eslint-disable-next-line function-paren-newline
                      );
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} className="icon__shadow" />
                  </button>
                </div>
                {/* eslint-disable-next-line operator-linebreak */}
                {project.forms &&
                  project.forms.map((form) => (
                    // eslint-disable-next-line no-underscore-dangle
                    <Link
                      key={form._id}
                      // href={`/form/${project._id}/${form._id}`}
                      href={{
                        pathname: `/dashboard/projects/[projectId]/[formId]`,
                        query: { projectId: project._id, formId: form._id },
                      }}
                      passHref
                    >
                      {/* eslint-disable-next-line no-underscore-dangle */}
                      <p className="form">
                        {form.name}{" "}
                        <span>{form.inbox ? form.inbox.length : 0}</span>
                      </p>
                    </Link>
                  ))}
              </div>
            ))}
            <button
              className="button--add"
              type="button"
              onClick={() => {
                setModelBox((prevState) => !prevState);
                setAddProject((prevState) => !prevState);
              }}
            >
              <FontAwesomeIcon icon={faPlus} className="icon__light" />
            </button>
          </div>
        ) : (
          <>
            <div id="projects__add_new">
              <p>add new project</p>
              <button
                className="button--add"
                type="button"
                onClick={() => {
                  setModelBox((prevState) => !prevState);
                  setAddProject((prevState) => !prevState);
                }}
              >
                <FontAwesomeIcon icon={faPlus} className="icon__light" />
              </button>
            </div>
          </>
        )}

        <ModelBox
          visible={addProject && modelBox}
          setVisible={() => {
            setModelBox(false);
            setAddProject(false);
            setFieldError(false);
          }}
          title="add new project"
        >
          <Form
            handleSubmit={handleSubmit}
            inputs={[
              {
                label: "Project's name",
                type: "name",
                name: "projectName",
                placeholder: "Enter name here...",
                autoComplete: "username",
                id: "name",
                externalRef: null,
                ref: projectName.ref,
                onChange: projectName.onChange,
                onBlur: projectName.onBlur,
              },
            ]}
            fieldError={fieldError}
            setFieldError={setFieldError}
            button={{ value: "create" }}
            onSubmit={(data) => onProjectSubmit(data)}
          />
        </ModelBox>

        <ModelBox
          visible={addForm && modelBox}
          setVisible={() => {
            setModelBox(false);
            setAddForm(false);
            setFieldError(false);
          }}
          title="add new form"
        >
          <Form
            handleSubmit={handleSubmit}
            inputs={[
              {
                label: "Forms's name",
                type: "name",
                name: "formName",
                placeholder: "Enter name here...",
                autoComplete: "username",
                id: "name",
                externalRef: null,
                ref: formName.ref,
                onChange: formName.onChange,
                onBlur: formName.onBlur,
              },
            ]}
            fieldError={fieldError}
            setFieldError={setFieldError}
            button={{ value: "create" }}
            onSubmit={(data) => onFormSubmit({ ...data, project: addForm })}
          />
        </ModelBox>

        <ModelBox
          visible={editProject && modelBox}
          setVisible={() => {
            setModelBox(false);
            setEditProject(false);
            setFieldError(false);
          }}
          title="edit project"
        >
          <Form
            handleSubmit={handleSubmit}
            inputs={[
              {
                label: "new project name",
                type: "name",
                name: "newName",
                placeholder: "New name here...",
                id: "name",
                externalRef: null,
                ref: newName.ref,
                onChange: newName.onChange,
                onBlur: newName.onBlur,
              },
            ]}
            fieldError={fieldError}
            setFieldError={setFieldError}
            button={{ value: "update name" }}
            onSubmit={
              (data) => onProjectUpdateSubmit({ ...data, project: editProject })
              // eslint-disable-next-line react/jsx-curly-newline
            }
          />
          <button
            type="button"
            className="button--danger"
            onClick={() => {
              setModelBox((prevState) => !prevState);
              setEditProject((prevState) => !prevState);
              onProjectDeleteSubmit(editProject);
            }}
          >
            Delete Project
          </button>
        </ModelBox>
      </>
    </DashboardTemplate>
  );
}

export default Projects;
