import React from "react";
import { Play } from 'react-bootstrap-icons';

import OutputWindowFinal from "../components/OutputWindowFinal";
import CustomInput from "./CustomInput";
const OutputComponent = (props) => {
  const handleCompile = () => {
    props.handleCompile();
  }


  return (<>
    <div class="container-right-block-top">
      <div class="output-div ">
        <div className="d-flex">
        <button className="btn btn-primary btn-sm m-2" onClick={props.toggleFullscreen}>
        {props.isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      </button>
          <button className="btn btn-primary btn-sm m-2"  onClick={handleCompile}>
            {props.processing ? "Processing..." : "Compile and Execute"}
          </button>
          <button className="btn btn-primary btn-sm m-2" onClick={props.handleSaveCode}>
        upload code
      </button>
        </div>
        {/* <div className=""><button className="btn btn-secondary"><Fullscreen size={30}></Fullscreen></button></div> */}
        <OutputWindowFinal outputDetails={props.outputDetails} />
      </div>

    </div>
    </>)
}

export default OutputComponent;