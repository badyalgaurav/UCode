import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from 'react-player';
import html2canvas from 'html2canvas';
import Landing from "./Landing";
import Footer from "./Footer";
const VideoPlayer1 = () => {
// const [playerRef, setPlayerRef] = useState(null);
const playerRef = useRef(null);

const [progress, setProgress] = useState(0);
  const [flags, setFlags] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(null);

  const handleDuration = (duration) => {
    setVideoDuration(duration);
  };

  const playVideo = () => {
    setIsPlaying(true);
  if (playerRef ) {
    playerRef.current.seekTo(videoProgress);
    playerRef.current.getInternalPlayer().play();
    
  }
  };
  
  const pauseVideo = () => {
    debugger;
    setIsPlaying(false);
    if (playerRef) {
      const currentTime = playerRef.current.getCurrentTime();
      setVideoProgress(currentTime);
      setFlags([...flags, currentTime]);
      playerRef.current.getInternalPlayer().pause();
    }

    //screenshot
      // Get the video element from the player
      
      // const videoElement = playerRef.current.getInternalPlayer();

      // // Use html2canvas to capture a screenshot of the video element
      // html2canvas(videoElement).then(canvas => {
      //   // Create an image element from the canvas
      //   const img = new Image();
      //   img.src = canvas.toDataURL("image/png");
  
      //   // Open the screenshot in a new window/tab
      //   const win = window.open();
      //   win.document.write('<img src="' + img.src + '"/>');
      // });

  };
  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);

    if (playerRef.current) {
      const duration = playerRef.current.getDuration();
      const newTime = (newProgress / 100) * duration;
      playerRef.current.seekTo(newTime);
    }
  };


  const handleProgress = (state) => {
    const { played } = state;
    setProgress(played * 100);
  };


  const handleVideoReady = () => {
    if (playerRef) {
      setVideoDuration(playerRef.current.getDuration());
    }
  };

  const handleTagClickEvent=()=>{
    alert("test");
  }
  useEffect(() => {
    setVideoDuration(null);
  }, [playerRef]);

  return (
    <div>
      {!isPlaying ? (
        <div>
          <Landing />
        </div>
      ) : (
        <div  onClick={pauseVideo}>
          <ReactPlayer
          // ref={(ref) => setPlayerRef(ref)}
            ref={playerRef}
            url="/videos/testVideo.mp4"
            onReady={handleVideoReady}
            onDuration={handleDuration}
            onProgress={handleProgress}
            playing={isPlaying}
            controls={false}
            width="100%"
            height="92vh"
            onPlay={playVideo}
            onPause={pauseVideo}
          />
        </div>
      )}
<div>

      {/* Render the progress bar */}
      <div className="external-progress-bar">
        {/* <div className="progress" style={{ width: `${progress * 100}%` }} /> */}
        <input
          className="progress"
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={handleProgressChange}
        />
    
        {flags.map((flagTime, index) => (
          <div
            key={index}
            className="flag"
            onClick={handleTagClickEvent}
            style={{
              left: `${(flagTime / videoDuration) * 100}%`
            }}
          />
        ))}
      </div>
<button className="play-button" onClick={playVideo}>
    Play
  </button>
  <button className="pause-button" onClick={pauseVideo}>
    Pause
  </button>
</div>
<Footer />
</div>

);
};

export default VideoPlayer1;