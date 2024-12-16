import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

const port = 3310;

const tracks = [
    { id: 1, title: "Bonjour", albumId: 1 },
    { id: 2, title: "Journée", albumId: 1 },
    { id: 3, title: "Coucou", albumId: 2 },
    { id: 4, title: "Bébé", albumId: 3 },
];

const albums = [
    { id: 1, title: "Album 1" },
    { id: 2, title: "Album 2" },
    { id: 3, title: "Album 3" },
    { id: 4, title: "Album 4" },
];

app.use(express.json());

app.get("/tracks", (req, res) => {
    const search = req.query.s

    res.json(tracks.filter((track) => track.title.includes(search)));
});

app.get("/tracks/:id", (req, res) => {
    const trackId = Number(req.params.id);
    const track = tracks.find((element) => element.id === trackId)
    if (track) res.json(track);
    else res.sendStatus(404);
});

app.post("/tracks", (req, res) => {
    const track = req.body;
    const newTrackId = tracks[tracks.length - 1].id + 1;
    track.id = newTrackId;

    tracks.push(track);

    res.status(201).json({ message: "trop bien", track });
});

app.put("/tracks/:id", (req, res) => {
    const trackId = Number(req.params.id);
    const track = tracks.find((element) => element.id === trackId);
    if (!track) return res.sendStatus(404);

    const newTitle = req.body.title;
    if (typeof newTitle === "string") {
        track.title = newTitle;
        res.sendStatus(204);
    }
    else {
        res.sendStatus(400);
    }
});

app.delete("/tracks/:id", (req, res) => {
    const trackId = Number(req.params.id);
    const trackIndex = tracks.findIndex((element) => element.id === trackId)

    if (trackIndex === -1) return res.sendStatus(404);

    tracks.splice(trackIndex, 1);

    res.sendStatus(204);
});

app.get("/albums", (req, res) => {
    res.json(albums);
});

app.get("/albums/:id", (req, res) => {
    const albumId = Number(req.params.id);
    const album = albums.find((element) => element.id === albumId)

    if (album) res.json(album);
    else res.sendStatus(404);
});

app.get("/albums/:id/tracks", (req, res) => {
    const albumId = Number(req.params.id);
    const album = albums.find((element) => element.id === albumId)

    if (album) {
        const albumTracks = tracks.filter((track) => track.albumId === albumId)
        if (albumTracks.length > 0) res.json(albumTracks)
        else res.sendStatus(404);
    }
    else res.sendStatus(404);
})

app.listen(port, () => {
    console.info(`server started at : http://localhost:${port}`);
});