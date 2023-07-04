import React, { useEffect, useState, useRef } from "react";
import VideoPlayerFinal from "../components/VideoPlayerFinal";
import OutputComponent from "../components/OutputComponent";
const Main = () => {

    return (<>

        <div class="row row_custom mt-1">
            <div class="col-md-10">
                <div className="video-player">
                    <VideoPlayerFinal></VideoPlayerFinal>
                </div>
            </div>
            <div class="col-md-2">
           <OutputComponent props={"Test"}></OutputComponent>
            </div>
        </div>
    </>
    )
}

export default Main;