import React, { useState } from "react";
//reference for editor
// https://www.npmjs.com/package/@monaco-editor/react
//referenced https://blog.logrocket.com/build-web-editor-with-react-monaco-editor/
import Editor from "@monaco-editor/react";

const CodeEditorFinal = ({ onChange, language, code, theme,handleEditorDidMount,height,valueEditor,setValueEditor }) => {
  // const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValueEditor(value);
    onChange("code", value);
  };
  


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
        height={height}
        width={`100%`}
        language={language || "javascript"}
        value={valueEditor}
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
