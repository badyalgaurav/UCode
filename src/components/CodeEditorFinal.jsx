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
  //referenced https://blog.logrocket.com/build-web-editor-with-react-monaco-editor/
  const options = {
    autoIndent: 'full',
    contextmenu: false,
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: 'always',
    minimap: {
      enabled: true,
    },
    scrollbar: {
      horizontalSliderSize: 4,
      verticalSliderSize: 0,
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
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
       options={options}
      />
    </div>
  );
};
export default CodeEditorFinal;

