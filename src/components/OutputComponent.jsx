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
      <div class="div1">
        <div className="row">
          <button className="btn btn-primary"
            onClick={handleCompile}
          >
            {props.processing ? "Processing..." : "Compile and Execute"}
          </button>
        </div>
        {/* <div className=""><button className="btn btn-secondary"><Fullscreen size={30}></Fullscreen></button></div> */}
        <OutputWindowFinal outputDetails={props.outputDetails} />
      </div>

    </div>
    </>)
}

export default OutputComponent;