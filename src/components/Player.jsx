import React, { useEffect } from "react";
import {
	faAngleLeft,
	faAngleRight,
	faPlay,
	faPause,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { playAudio } from "../util/util";

function Player({
	isPlaying,
	setIsPlaying,
	audioRef,
	setSongInfo,
	songInfo,
	songs,
	setSongs,
	currentSong,
	setCurrentSong,
}) {
	// ADD ACTIVE STATE
	useEffect(() => {
		const newSongs = songs.map(song => {
			if (song.id === currentSong.id) {
				return {
					...song,
					active: true,
				};
			} else {
				return {
					...song,
					active: false,
				};
			}
		});
		setSongs(newSongs);
	}, [currentSong]);

	// PLAYER TIME LINE DRAG HANDLER
	const dragHandler = e => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};

	// TIME FORMAT FUNCTION
	const getTime = time => {
		return (
			Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
		);
	};

	// TOGGLE PLAY BUTTON (PLAY / PAUSE);
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			audioRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};

	// SKIP AND FORWARD TRACK HANDLER
	const skipTrackHandler = direction => {
		const currentIndex = songs.findIndex(song => song.id === currentSong.id);

		if (direction === "skip-forward") {
			setCurrentSong(songs[(currentIndex + 1) % songs.length]);
		}
		if (direction === "skip-back") {
			if ((currentIndex - 1) % songs.length === -1) {
				setCurrentSong(songs[songs.length - 1]);
				// CHECK IF THE SONG IS PLAYING
				playAudio(isPlaying, audioRef);
				return;
			}
			setCurrentSong(songs[(currentIndex - 1) % songs.length]);
		}
		// CHECK IF THE SONG IS PLAYING
		playAudio(isPlaying, audioRef);
	};

	// ADD CSS STYLE
	const trackAnim = {
		transform: `translateX(${songInfo.animationPercentage}%)`,
	};

	return (
		<div className='player'>
			<div className='time-control'>
				<p>{getTime(songInfo.currentTime)}</p>
				<div
					style={{
						background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
					}}
					className='track'>
					<input
						onChange={dragHandler}
						min={0}
						max={songInfo.duration || 0}
						value={songInfo.currentTime}
						type='range'
					/>
					<div style={trackAnim} className='animate-track'></div>
				</div>
				<p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
			</div>
			<div className='play-control'>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler("skip-back")}
					className='skip-back'
					size='2x'
					icon={faAngleLeft}
				/>
				<FontAwesomeIcon
					onClick={playSongHandler}
					className='play'
					size='2x'
					icon={isPlaying ? faPause : faPlay}
				/>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler("skip-forward")}
					className='skip-forward'
					size='2x'
					icon={faAngleRight}
				/>
			</div>
		</div>
	);
}

export default Player;
