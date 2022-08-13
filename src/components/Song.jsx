import React from "react";

function Song({ currentSong: { name, artist, cover } }) {
	return (
		<div className='song-container'>
			<img src={cover} alt={name} />
			<h2>{name}</h2>
			<h3>{artist}</h3>
		</div>
	);
}

export default Song;
