import "../App.css";
import { useState, useEffect } from "react";
import AudioPlayer from "../components/AudioPlayer";
import axios from "axios";
import { redirect } from "react-router-dom";
import useGetSong from "../hooks/useGetSong";

function App() {
  const [song, setSong] = useState("");

  // Get song timestamps and lyrics

  const { search, setTheSong, songs, lines } = useGetSong();

  return (
    <div className="App">
      <h1>Lyrics Finder ????</h1>

      <input
        className="inp"
        type="text"
        placeholder="Song name"
        onChange={(e) => {
          setSong(e.target.value);
        }}
      />

      <button className="btn" onClick={() => search(song)}>
        ???? Search
      </button>

      <div className="song-list">
        {songs.map((_song, i) => {
          return (
            // <p>{_song.name}</p>
            <button key={_song.name} onClick={() => setTheSong(_song)}>
              {_song.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
