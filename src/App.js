import { useRef, useState } from "react";
import "./styles/app.scss";
import Player from "./components/Player";
import Song from "./components/Song";
// DATA
import data from "./data/data";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
	const audioRef = useRef(null);
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [libraryStatus, setLibraryStatus] = useState(false);
	const [songInfo, setSongInfo] = useState({
		duration: 0,
		currentTime: 0,
		animationPercentage: 0,
	});

	//  GET PLAYER TIME UPDATE
	const timeUpdateHandler = e => {
		const duration = e.target.duration;
		const currentTime = e.target.currentTime;

		// CALCULATE PERCENTAGE
		const roundedCurrent = Math.round(currentTime);
		const roundedDuration = Math.round(duration);
		const animation = Math.round((roundedCurrent / roundedDuration) * 100);
		console.log(animation);

		setSongInfo({
			...songInfo,
			duration,
			currentTime,
			animationPercentage: animation,
		});
	};

	return (
		<div>
			<Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
			<Song currentSong={currentSong} />
			<Player
				audioRef={audioRef}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
				setSongInfo={setSongInfo}
				songInfo={songInfo}
				songs={songs}
				setSongs={setSongs}
			/>
			<Library
				audioRef={audioRef}
				setCurrentSong={setCurrentSong}
				songs={songs}
				isPlaying={isPlaying}
				setSongs={setSongs}
				libraryStatus={libraryStatus}
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
