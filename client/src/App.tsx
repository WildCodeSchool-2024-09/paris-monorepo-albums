import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FormAddTrack from "./FormAddTrack";

function App() {
	const [tracks, setTracks] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		fetch(`http://localhost:3310/tracks?s=${search}`)
			.then((response) => response.json())
			.then((data) => setTracks(data));
	}, [search]);

	function handleSearch(event) {
		setSearch(event.target.value);
	}

	return (
		<>
			Recherche :{" "}
			<input
				type="text"
				onChange={handleSearch}
				value={search}
				placeholder="Votre recherche"
			/>
			<ul>
				{tracks.map((track) => (
					<li key={track.id}>
						{track.id} - {track.title}
					</li>
				))}
			</ul>
			<FormAddTrack setTracks={setTracks} />
		</>
	);
}

export default App;
