import React, { useEffect, useState, useRef } from "react";

const ExternalVideoPlayerController = (props) => {

    const handleProgressChange = (e) => {
        props.handleProgressChange(e);
    };
    const handleTagClickEvent = () => {
        props.handleTagClickEvent();
    }
    const handleToggle = () => {
        props.handleToggle();
    };


    return (<>
        <div className="row container_play_progress">
            <div className="d-flex flex-row">
                <button className="btn btn-secondary d-inline-flex align-items-center btn-sm custom-width-play-pause-button" onClick={handleToggle}>{props.isPlayingState ? 'Pause' : 'Play'}</button>
                {/* Render the progress bar */}
                <div className="external-progress-bar">
                    <input
                        className="progress"
                        type="range"
                        min={0}
                        max={100}
                        value={props.progress}
                        onChange={handleProgressChange}
                    />
                    {
                        props.flags.map((flagTime, index) => (
                            <div
                                key={index}
                                className="flag"
                                onClick={handleTagClickEvent}
                                style={{
                                    left: `${(flagTime / props.videoDuration) * 100}%`
                                }}
                            />
                        ))}
                </div>
                {/* <div className=""><button onClick={handleFullScreen} className="btn btn-secondary d-inline-flex align-items-center btn-sm"><Fullscreen ></Fullscreen></button></div> */}

            </div>
        </div>
    </>);
}

export default ExternalVideoPlayerController;