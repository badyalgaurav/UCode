import React, { useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditorFinal = ({ onChange, language, code, theme,handleEditorDidMount }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };


  return (
    <div className="row">
      <Editor
        height="87vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme || "vs-dark"}
        defaultValue="// some comment"
        onChange={handleEditorChange}
       onMount={handleEditorDidMount}
      />
    </div>
  );
};
export default CodeEditorFinal;