import React, { useEffect, useState, useRef } from "react";

import ReactPlayer from 'react-player';

const VideoPalayerFinal=()=>{


    return (<>
       <ReactPlayer
            // ref={(ref) => setPlayerRef(ref)}
           
            url="/videos/testVideo.mp4"
        
            controls={true}
            width="100%"
            height="auto"
          />
        
    </>)
}

export default VideoPalayerFinal;