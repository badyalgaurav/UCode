import React, { useEffect, useState, useRef } from "react";

import ReactPlayer from 'react-player';

const VideoPalayerFinal = (props) => {
  const playerRef = props.playerRef;
  const handleDuration = (duration) => {
    props.handleDuration();
  };
  const playVideo = () => {
    props.playVideo()
  };
  const pauseVideo = () => {
    props.pauseVideo();
  };

  const handleProgress = (state) => {
    props.handleProgress(state);
  };
  const handleVideoReady = () => {
    props.handleVideoReady();
  };

  useEffect(() => {
    props.handleSetVideoDuration();
  }, [playerRef]);


  return (<>
    <div className="row" onClick={props.pauseVideo}>
      <ReactPlayer
        // ref={(ref) => setPlayerRef(ref)}
        ref={playerRef}
        url="/videos/testVideo.mp4"
        onReady={handleVideoReady}
        onDuration={handleDuration}
        onProgress={handleProgress}
        playing={props.isPlaying}
        controls={false}
        width="100%"
        height="auto"
        onPlay={playVideo}
        onPause={pauseVideo}
      />
    </div>

  </>)
}

export default VideoPalayerFinal;