import React, { useRef } from 'react';
import { faAngleLeft, faAngleRight, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Player({currentSong: {audio}, isPlaying, setIsPlaying}) {
    const audioRef = useRef(null);

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
                <p>start time</p>
                <input type="range" />
                <p>end time</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className='skip-back' size='2x' icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className='play' size='2x' icon={faPlay} />
                <FontAwesomeIcon className='skib-forward' size='2x' icon={faAngleRight} />
            </div>
            <audio ref={audioRef} src={audio}></audio>
        </div>
    );
}

export default Player;