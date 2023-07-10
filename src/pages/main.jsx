import React, { useEffect, useState, useRef } from "react";
import VideoPlayerFinal from "../components/VideoPlayerFinal";
import OutputComponent from "../components/OutputComponent";
import ExternalVideoPlayerController from "../components/ExternalVideoPlayerController";
import CodeEditorWindowFinal from "../components/CodeEditorFinal";

const Main = () => {
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
        var element = document.getElementById("videoPlayer");
        element.classList.remove("d-none");
        element = document.getElementById("codeEditor");
        element.classList.add("d-none");
        setIsPlaying(true);
        if (playerRef) {
            playerRef.current.seekTo(videoProgress);
            playerRef.current.getInternalPlayer().play();

        }
    };

    const pauseVideo = () => {
        var element = document.getElementById("codeEditor");
        element.classList.remove("d-none");
        element = document.getElementById("videoPlayer");
        element.classList.add("d-none");
        setIsPlaying(false);
        setIsPlayingState(false);
        if (playerRef) {
            const currentTime = playerRef.current.getCurrentTime();
            setVideoProgress(currentTime);
            setFlags([...flags, currentTime]);
            playerRef.current.getInternalPlayer().pause();
        }


    };
    const handleProgress = (state) => {
        const { played } = state;
        setProgress(played * 100);
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

    const handleVideoReady = () => {
        if (playerRef) {
            setVideoDuration(playerRef.current.getDuration());
        }
    };

    const handleTagClickEvent = () => {
        alert("test");
    }

    const handleToggle = () => {
        const newState = !isPlayingState;
        setIsPlayingState(newState);
        if (newState) {
            playVideo();
        }
        else {
            pauseVideo();
        }
    };

    const handleSetVideoDuration = () => {
        setVideoDuration(null);
    }

    //code editor information
    const javascriptDefault = `// Function to calculate the factorial
    function add(a, b) {
      let result = a + b;
      console.log("result",result)
    }
    add(9, 9)
    `;
    const [code, setCode] = useState(javascriptDefault);
    const editorRef = useRef(null);
    const onChange = (action, data) => {
        switch (action) {
            case "code": {
                setCode(data);
                break;
            }
            default: {
                console.warn("case not handled!", action, data);
            }
        }
    };
    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    return (<>
        <div class="row row_custom mt-1">
            <div class="col-md-10">
                <div id="codeEditor" className="code-editor d-none">
                    <CodeEditorWindowFinal code={code}
                        onChange={onChange}
                        language={undefined}
                        theme={undefined}
                        handleEditorDidMount={handleEditorDidMount}></CodeEditorWindowFinal>
                </div>
                <div id="videoPlayer" className="video-player">
                    <VideoPlayerFinal
                        playerRef={playerRef}
                        handleProgress={handleProgress}
                        handleProgressChange={handleProgressChange}
                        handleDuration={handleDuration}
                        playVideo={playVideo}
                        pauseVideo={pauseVideo}
                        handleVideoReady={handleVideoReady}
                        handleSetVideoDuration={handleSetVideoDuration}
                    ></VideoPlayerFinal>
                </div>

                <div className="external-video-player-controller">
                    <ExternalVideoPlayerController
                        handleToggle={handleToggle}
                        isPlaying={isPlaying}
                        isPlayingState={isPlayingState}
                        flags={flags}
                        progress={progress}
                        videoDuration={videoDuration}
                        handleTagClickEvent={handleTagClickEvent}
                        handleProgressChange={handleProgressChange}
                    ></ExternalVideoPlayerController>
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