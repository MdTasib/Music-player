import React from "react";
import { playAudio } from "../util/util";

function LibrarySong({
	song: { name, artist, cover, active },
	setCurrentSong,
	songs,
	setSongs,
	id,
	audioRef,
	isPlaying,
}) {
	const songSelectHandler = () => {
		const selectedSong = songs.filter(state => state.id === id);
		setCurrentSong(selectedSong[0]);

		// ADD ACTIVE STATE
		const newSongs = songs.map(song => {
			if (song.id === id) {
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

		// CHECK IF THE SONG IS PLAYING
		playAudio(isPlaying, audioRef);
	};

	return (
		<div
			onClick={songSelectHandler}
			className={`library-song ${active ? "selected" : ""}`}>
			<img src={cover} alt={name} />
			<div className='song-description'>
				<h3>{name}</h3>
				<h4>{artist}</h4>
			</div>
		</div>
	);
}

export default LibrarySong;
