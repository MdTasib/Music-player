import { useState } from "react";
import "./styles/app.scss";
import Player from "./components/Player";
import Song from "./components/Song";
// DATA
import data from "./data/data";

function App() {
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);

	return (
		<div>
			<Song currentSong={currentSong} />
			<Player />
		</div>
	);
}

export default App;
