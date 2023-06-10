import "../App.css";
import { useState, useEffect } from "react";
import useGetSong from "../hooks/useGetSong";
import "./home.css"


function App() {
  const [song, setSong] = useState("");

  // Get song timestamps and lyrics

  const { search, setTheSong, songs, lines } = useGetSong();

  return (
    <div className="App">
      <h1 className="titleHeading">JustSing</h1>

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

      <div className="song-list flex-col	flex">
        {songs.map((_song, i) => {
          return (
            // <p>{_song.name}</p>
            <div className=" border-2 border-purple hover:bg-gray-light hover:bg-slate-400	 mt-2 h-12 rounded-lg " key={_song.name} >
              
              <button onClick={() => setTheSong(_song,true)} >With Vocals</button>
              <button onClick={() => setTheSong(_song,false)}>Without Vocals</button>
              {_song.name}

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
