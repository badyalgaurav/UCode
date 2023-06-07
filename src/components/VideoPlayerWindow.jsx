import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from 'react-player';
import Landing from "./Landing";

const VideoPlayer = () => {
const [playerRef, setPlayerRef] = useState(null);
//   const playerRef = useRef(null);
  const [tags, setTags] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currentTag, setCurrentTag] = useState(null);
  const [flags, setFlags] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(null);

  const handleTagSubmit = (event) => {
    event.preventDefault();
    setTags([...tags, currentTag]);
    setCurrentTag(null);
  };

  const handleProgress = (event) => {
    const { playedSeconds, loadedSeconds } = event;
    const calculatedProgress = playedSeconds / loadedSeconds;
    setProgress(calculatedProgress);
  };

  const handleDuration = (duration) => {
    setVideoDuration(duration);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (playerRef) {
      const currentTime = playerRef.getCurrentTime();
      setFlags([...flags, currentTime]);
    }
  };

  const playVideo = () => {
    setIsPlaying(true);
  if (playerRef ) {
    playerRef.seekTo(videoProgress, 'seconds');
    playerRef.getInternalPlayer().play();
    
  }
  };
  
  const pauseVideo = () => {
    debugger;

    setIsPlaying(false);
    if (playerRef) {
      const currentTime = playerRef.getCurrentTime();
      setVideoProgress(currentTime);
      setFlags([...flags, currentTime]);
      playerRef.current.getInternalPlayer().pause();
    }
  };

  const handleVideoReady = () => {
    if (playerRef) {
      setVideoDuration(playerRef.getDuration());
    }
  };

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
          ref={(ref) => setPlayerRef(ref)}
            // ref={playerRef}
            url="/videos/testVideo.mp4"
            onProgress={handleProgress}
            onReady={handleVideoReady}
            onDuration={handleDuration}
            // playing={isPlaying}
            controls={false}
            width="100%"
            height="auto"
          />
        </div>
      )}

      {/* Render the progress bar */}
      <div className="external-progress-bar">
        <div className="progress" style={{ width: `${progress * 100}%` }} />
        {flags.map((flagTime, index) => (
          <div
            key={index}
            className="flag"
            style={{
              left: `${(flagTime / videoDuration) * 100}%`
            }}
          />
        ))}
      </div>

      {/* Render the tags */}
      <div className="tags">
        {tags.map((tag, index) => (
          <div
            key={index}
            className={`tag ${tag === currentTag ? 'active' : ''}`}
            onClick={() => setCurrentTag(tag)}
          >
            {tag.time}s
          </div>
        ))}
      </div>

      {/* Addtag form */}
<form onSubmit={handleTagSubmit}>
<input
type="number"
step="0.01"
placeholder="Time (in seconds)"
value={currentTag ? currentTag.time : ''}
onChange={(e) =>
setCurrentTag({ ...currentTag, time: parseFloat(e.target.value) })
}
/>
<button type="submit">Add Tag</button>
</form>

<button className="play-button" onClick={playVideo}>
    Play
  </button>
  <button className="pause-button" onClick={pauseVideo}>
    Pause
  </button>
</div>
);
};

export default VideoPlayer;