import React,{useContext } from "react";
import { MainContextProvider } from "../pages/mainContextProvider";
const OutputWindowFinal = ({ outputDetails }) => {
  debugger
  // Use the useContext hook to access the context data from the parent page
  const contextData = useContext(MainContextProvider);
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="text-red-500">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="text-green-500">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="text-red-500">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  
  
  return (
    <>
     {/* {contextData.test} */}
      <h4 className="font-bold"> Output</h4>
      <div className="output-response">
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </>
  );
};

export default OutputWindowFinal;
