import { useState } from "react";

function FormAddTrack({ setTracks }) {
	const [title, setTitle] = useState("");

	function handleTitleChange(event) {
		setTitle(event.target.value);
	}

	function submitForm(event) {
		event.preventDefault();

		fetch("http://localhost:3310/tracks", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				title: title,
				albumId: 8,
			}),
		})
			.then((response) => response.json())
			.then((data) => setTracks((prevState) => [...prevState, data.track]));
	}

	return (
		<>
			<form onSubmit={submitForm}>
				<input
					type="text"
					value={title}
					placeholder="Nom de votre chanson"
					onChange={handleTitleChange}
				/>

				<input type="submit" value="Envoyer" />
			</form>
		</>
	);
}

export default FormAddTrack;
