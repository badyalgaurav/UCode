import React, { useEffect, useState, useRef, createContext } from "react";
import axios from "axios";

import VideoPlayerFinal from "../components/VideoPlayerFinal";
import OutputComponentEditorOnly from "../components/OutputComponentEditorOnly";
import ExternalVideoPlayerController from "../components/ExternalVideoPlayerController";
import CodeEditorWindowFinal from "../components/CodeEditorFinal";
import { Button } from 'react-bootstrap'

import ModalPopup from "../components/ModalPopup";

import { Fullscreen } from 'react-bootstrap-icons';
import { languageOptions } from "../constants/languageOptions";
import pythonapi from "../components/common"

// Create a context object directly within the page
import { MainContextProvider } from "./mainContextProvider";


const EditorOnly = () => {
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
    const [code, setCode] = useState("");
    const [valueEditor, setValueEditor] = useState(code || "");

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

    const handleFullScreen = () => {
        debugger;
        // const visibleCompoent=!props.isPlayingState?"codeEditor":"videoPlayer";
        // if (isPlayingState) {
        var elem = document.getElementById("codeEditor");

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        }
        else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
        else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        // }
    }
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        const element = document.getElementById('fullscreenDiv');

        if (!isFullscreen) {
            enterFullscreen(element);
        } else {
            exitFullscreen();
        }
    };

    const enterFullscreen = (element) => {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }

        // setIsFullscreen(true);
    };

    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

        setIsFullscreen(false);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        




    }

    const handleSave=()=>{
        debugger;
        const fileInput = document.getElementById('videoFileInput');
        const programName = document.getElementById('taskName').value;
        const description = document.getElementById('description').value;
        const classId = document.getElementById('selectClass').value;
        const file = fileInput.files[0];
        var params = {
            "video": file
        }
        //           var params={"model":model,"video":file}


        //           const formData = new FormData();
        // formData.append('userId', 'user123');
        // formData.append('classId', 'class456');
        // formData.append('textFilePath', 'some_path');
        // formData.append('text', 'Some text content');
        // formData.append('video', file);
        debugger;
        axios.post(`${pythonapi}user_content_management/insert_video`, params, {
            headers: {
              'Content-Type': 'multipart/form-data', // Set the correct content type for file upload
            }}).then((response) => {
            // Handle success
            debugger;
            var params = {
                "userId": sessionStorage.getItem("userId"),
                "classId":classId,
                "videoPath": response.data.video_path,
                "text": code,
                "taskName":programName,
                "description":description
            }
            axios.post(`${pythonapi}user_content_management/insert_task_info`, params)
                // , {
                //     headers: {
                //       'Content-Type': 'multipart/form-data', // Set the correct content type for file upload
                //     },
                //   })
                .then((response) => {
                    // Handle success
                    alert("succesfully saved");
                    
                    console.log('POST request successful', response);
                })
                .catch((error) => {
                    // Handle error
                    console.error('Error making POST request', error);
                });
        })
            .catch((error) => {
                // Handle error
                console.error('Error making POST request', error);
            });
    }
    const handleShow = () => setShow(true);
    const handleSaveCode = () => {
        debugger;
        const Content = code;
        setIsModalOpen(true);
        setShow(true);
        return true;
    }
    const test = "tesdfdst";
    const test1 = "test";
    return (<>
        <MainContextProvider.Provider value={{ test: test, test1: test1 }}>
            <div class="row row_custom mt-1">
                <div class="col-md-10" id="fullscreenDiv">
                    <div class="nav-scroller bg-dark shadow-sm mb-0 ">
                        {/* <nav className="nav" aria-label="Secondary navigation">
       
        <div className="ml-auto">
          <button onClick={handleFullScreen} className="btn btn-secondary d-inline-flex align-items-center btn-sm">
            <Fullscreen />
          </button>
        </div>
      </nav> */}

                    </div>

                    <div id="codeEditor" className="code-editor">
                        <CodeEditorWindowFinal code={code}
                          valueEditor={valueEditor}
                          setValueEditor={setValueEditor}
                            height="95vh"
                            onChange={onChange}
                            language={undefined}
                            theme={undefined}
                            handleEditorDidMount={handleEditorDidMount}></CodeEditorWindowFinal>
                    </div>
                   
                </div>
                <div class="col-md-2">
                    <OutputComponentEditorOnly handleCompile={handleCompile}
                        processing={processing}
                        outputDetails={outputDetails}
                        customInput={customInput}
                        setCustomInput={setCustomInput}
                        isFullscreen={isFullscreen}
                        toggleFullscreen={toggleFullscreen}
                        handleSaveCode={handleSaveCode}
                    ></OutputComponentEditorOnly>
                </div>
            </div>
            {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
            <ModalPopup handleClose={handleClose} handleSave={handleSave} handleShow={handleShow} show={show}></ModalPopup>

        </MainContextProvider.Provider>
    </>
    )
}

export default EditorOnly;