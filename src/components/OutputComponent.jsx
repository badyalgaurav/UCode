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
            {props.processing ? "Processing..." : <Play size={30}/>}
          </button>
        </div>
        {/* <div className=""><button className="btn btn-secondary"><Fullscreen size={30}></Fullscreen></button></div> */}
        <OutputWindowFinal outputDetails={props.outputDetails} />
      </div>

    </div>
    <div class="container-right-block-top">
      <div class="div2">Div 1</div>
      <div class="div2">Div 2</div>
    </div>
    <div class="container-right-block-output">
      OUTPUT
      Garry
    </div></>)
}

export default OutputComponent;