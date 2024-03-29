import React from "react";
import { Play } from 'react-bootstrap-icons';

import OutputWindowFinal from "../components/OutputWindowFinal";
import CustomInput from "./CustomInput";
const OutputComponent = (props) => {
  const handleCompile = () => {
    props.handleCompile();
  }
  let uploadButton = null;
  if (sessionStorage.accountId == "S") {
    uploadButton = <button className="btn btn-primary btn-sm m-2" onClick={props.handleSaveCode}> Submit</button>
  }

  return (<>
    <div class="container-right-block-top">
      <div class="output-div ">
        <div className="d-flex">
          <button className="btn btn-primary btn-sm m-2" onClick={handleCompile}>
            {props.processing ? "Processing..." : "Compile and Execute"}
          </button>
          {uploadButton}

        </div>
        {/* <div className=""><button className="btn btn-secondary"><Fullscreen size={30}></Fullscreen></button></div> */}
        <OutputWindowFinal outputDetails={props.outputDetails} />
      </div>

    </div>
  </>)
}

export default OutputComponent;