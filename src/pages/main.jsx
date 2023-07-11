import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import VideoPlayerFinal from "../components/VideoPlayerFinal";
import OutputComponent from "../components/OutputComponent";
import ExternalVideoPlayerController from "../components/ExternalVideoPlayerController";
import CodeEditorWindowFinal from "../components/CodeEditorFinal";
import { languageOptions } from "../constants/languageOptions";
const Main = () => {
    const playerRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [flags, setFlags] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPlayingState, setIsPlayingState] = useState(false);
    const [videoProgress, setVideoProgress] = useState(0);
    const [videoDuration, setVideoDuration] = useState(null);
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(null);
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

    //Code complier
    const checkStatus = async (token) => {
        const options = {
            method: "GET",
            url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
        };
        try {
            let response = await axios.request(options);
            let statusId = response.data.status?.id;

            // Processed - we have a result
            if (statusId === 1 || statusId === 2) {
                // still processing
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
                return;
            } else {
                setProcessing(false);
                setOutputDetails(response.data);
                console.log("response.data", response.data);
                return;
            }
        } catch (err) {
            console.log("err", err);
            setProcessing(false);
        }
    };
    const handleCompile = () => {
        setProcessing(true);
        const formData = {
            language_id: 63,//language.id,
            // encode source code in base64
            source_code: btoa(code),
            stdin: btoa(customInput),
        };
        const options = {
            method: "POST",
            url: process.env.REACT_APP_RAPID_API_URL,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
            data: formData,
        };

        axios
            .request(options)
            .then(function (response) {
                debugger;
                console.log("res.data", response.data);
                const token = response.data.token;
                checkStatus(token);
            })
            .catch((err) => {
                let error = err.response ? err.response.data : err;
                // get error status
                let status = err.response.status;
                console.log("status", status);
                if (status === 429) {
                    console.log("too many requests", status);

                    //   showErrorToast(
                    //     `Quota of 100 requests exceeded for the Day! Please read the blog to learn how to setup your own RAPID API Judge0!`,
                    //     10000
                    //   );
                }
                setProcessing(false);
                console.log("catch block...", error);
            });
    };



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
                <OutputComponent handleCompile={handleCompile}
                    processing={processing}
                    outputDetails={outputDetails}
                    customInput={customInput}
                    setCustomInput={setCustomInput}
                ></OutputComponent>
            </div>
        </div>
    </>
    )
}

export default Main;