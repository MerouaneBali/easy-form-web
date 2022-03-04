import React, { useEffect } from "react";
import Prism from "prismjs";
// import "prismjs/themes/prism-tomorrow.css";
// import "../css/components/Code.css";

function Code({ code, language }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="code">
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}

export default Code;
