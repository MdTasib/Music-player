import React, { useRef, useState } from 'react';
import { faAngleLeft, faAngleRight, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Player({currentSong: {audio}, isPlaying, setIsPlaying}) {
    const [songInfo, setSongInfo] = useState({
        duration: null,
        currentTime: null,
    });
    const audioRef = useRef(null);

    //  GET PLAYER TIME
    const playTimeHandler = e => {
        const duration = e.target.duration;
        const currentTime = e.target.currentTime;
        setSongInfo({...songInfo, duration, currentTime});
    };

    // PLAYER TIME LINE DRAG HANDLER
    const dragHandler = e => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    }

    // TIME FORMAT FUNCTION
    const getTime = time => {
        return Math.floor(time/60) + ":" + ("0" + Math.floor(time%60)).slice(-2);
    }

    // TOGGLE PLAY BUTTON (PLAY / PAUSE);
    const playSongHandler = () => {
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying)
        }else {
            audioRef.current.play();
            setIsPlaying(!isPlaying)
        }
    }

    return (
        <div className='player'>
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input 
                    onChange={dragHandler} 
                    min={0} 
                    max={songInfo.duration} 
                    value={songInfo.currentTime} 
                    type="range" 
                />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className='skip-back' size='2x' icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className='play' size='2x' icon={faPlay} />
                <FontAwesomeIcon className='skib-forward' size='2x' icon={faAngleRight} />
            </div>
            <audio onTimeUpdate={playTimeHandler} onLoadedMetadata={playTimeHandler} ref={audioRef} src={audio}></audio>
        </div>
    );
}

export default Player;