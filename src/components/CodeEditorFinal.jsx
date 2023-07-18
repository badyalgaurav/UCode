import React, { useState } from "react";
//reference for editor
// https://www.npmjs.com/package/@monaco-editor/react
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
        height="88vh"
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

