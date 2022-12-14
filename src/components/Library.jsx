import React from "react";
import LibrarySong from "./LibrarySong";

function Library({
	songs,
	setCurrentSong,
	audioRef,
	isPlaying,
	setSongs,
	libraryStatus,
}) {
	return (
		<div className={`library ${libraryStatus ? "active-library" : ""}`}>
			<h2>Library</h2>
			<div className='library-songs'>
				{songs.map(song => (
					<LibrarySong
						isPlaying={isPlaying}
						audioRef={audioRef}
						setCurrentSong={setCurrentSong}
						id={song.id}
						songs={songs}
						key={song.id}
						song={song}
						setSongs={setSongs}
					/>
				))}
			</div>
		</div>
	);
}

export default Library;
