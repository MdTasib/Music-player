import React from "react";

function LibrarySong({
	song: { name, artist, cover, active },
	setCurrentSong,
	songs,
	setSongs,
	id,
	audioRef,
	isPlaying,
}) {
	const songSelectHandler = async () => {
		const selectedSong = songs.filter(state => state.id === id);
		await setCurrentSong(selectedSong[0]);

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
		if (isPlaying) audioRef.current.play();
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
