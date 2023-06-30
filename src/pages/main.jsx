import React, { useEffect, useState, useRef } from "react";
import VideoPlayerFinal from "../components/VideoPlayerFinal";
const Main = () => {

    return (<>

        <h1 class="mt">Sticky footer with fixed navbar</h1>
     


        <div class="row row_custom mt">
            <div class="col-md-9">
                <div className="video-player">
                    <VideoPlayerFinal></VideoPlayerFinal>
                </div>
            </div>
            <div class="col-md-3">
                <div className="video-player">

                    <p>Output area</p>
                </div>
            </div>


        </div>


    </>
    )
}

export default Main;