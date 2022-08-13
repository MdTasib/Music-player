import { useRef, useState } from "react";
import "./styles/app.scss";
import Player from "./components/Player";
import Song from "./components/Song";
// DATA
import data from "./data/data";
import Library from "./components/Library";

function App() {
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef(null);
	const [songInfo, setSongInfo] = useState({
		duration: 0,
		currentTime: 0,
	});

	//  GET PLAYER TIME UPDATE
	const timeUpdateHandler = e => {
		const duration = e.target.duration;
		const currentTime = e.target.currentTime;
		setSongInfo({ ...songInfo, duration, currentTime });
	};

	return (
		<div>
			<Song currentSong={currentSong} />
			<Player
				audioRef={audioRef}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
				setSongInfo={setSongInfo}
				songInfo={songInfo}
			/>
			<Library
				audioRef={audioRef}
				setCurrentSong={setCurrentSong}
				songs={songs}
				isPlaying={isPlaying}
			/>
			<audio
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio}></audio>
		</div>
	);
}

export default App;
