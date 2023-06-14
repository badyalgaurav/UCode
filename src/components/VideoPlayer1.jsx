import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from 'react-player';
import html2canvas from 'html2canvas';
import Landing from "./Landing";

const VideoPlayer1 = () => {
  // const [playerRef, setPlayerRef] = useState(null);
  const playerRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [flags, setFlags] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingState, setIsPlayingState] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(null);

  const handleDuration = (duration) => {
    setVideoDuration(duration);
  };

  const playVideo = () => {
    setIsPlaying(true);
    if (playerRef) {
      playerRef.current.seekTo(videoProgress);
      playerRef.current.getInternalPlayer().play();

    }
  };

  const pauseVideo = () => {
    debugger;
    setIsPlaying(false);
    setIsPlayingState(false);
    if (playerRef) {
      const currentTime = playerRef.current.getCurrentTime();
      setVideoProgress(currentTime);
      setFlags([...flags, currentTime]);
      playerRef.current.getInternalPlayer().pause();
    }


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

  const handleTagClickEvent = () => {
    alert("test");
  }
  useEffect(() => {
    setVideoDuration(null);
  }, [playerRef]);



  const handleToggle = () => {
    debugger;
    const newState = !isPlayingState;
    setIsPlayingState(newState);
    if (newState) {
      playVideo();
    }
    else {
      pauseVideo();
    }
  };



  return (
    <div>
      {!isPlaying ? (
        <div>
          <Landing />
        </div>
      ) : (
        <div onClick={pauseVideo}>
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
        <div className="container_play_progress">
          <button className="btn" onClick={handleToggle}>{isPlayingState ? 'Pause' : 'Play'}</button>
        
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
        </div>
      </div>

    </div>

  );
};

export default VideoPlayer1;