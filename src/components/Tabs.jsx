import React, { useState } from "react";
// import "../css/components/Tabs.css";

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(children[0]);

  const onClickTabItem = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      <ol className="tab-list">
        {children.map((child) => (
          <button
            key={child.props.label}
            type="button"
            className={`tab-list-item ${
              activeTab.props.label === child.props.label
                ? "tab-list-active"
                : ""
            }`}
            onClick={() => onClickTabItem(child)}
          >
            {child.props.label}
          </button>
        ))}
      </ol>
      <div className="tab-content">
        {children.map(
          // eslint-disable-next-line no-confusing-arrow
          (Child) =>
            Child.props.label === activeTab.props.label ? Child : null
          // eslint-disable-next-line function-paren-newline
        )}
      </div>
    </div>
  );
}

export default Tabs;
