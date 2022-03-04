import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ModelBox({ visible, setVisible, title, children, id, className }) {
  return visible ? (
    <div className="modal-container">
      <div id={id} className={`model${className || ""}`}>
        <div className="model__header">
          <h3>{title || "Dialog"}</h3>
          <button type="button" onClick={() => setVisible()}>
            <FontAwesomeIcon icon={faTimes} className="icon__dark" />
          </button>
        </div>
        <div className="model__body">{children}</div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default ModelBox;
