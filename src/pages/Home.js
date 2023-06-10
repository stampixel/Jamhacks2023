import "../App.css";
import { useState, useEffect } from "react";
import useGetSong from "../hooks/useGetSong";
import "./home.css";

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
            <div
              className="flex  flex-row	 justify-between	 border-2 border-purple hover:bg-gray-light hover:bg-slate-400	 mt-2 h-12 rounded-lg "
              key={_song.name}
            >
              <div className="flex flex-row content-center	 items-center ml-2">
                <p> {_song.name} </p>
              </div>
              <div className=" flex flex-row justify-between w-1/3	  items-center mr-4 text-sm	">
                <button onClick={() => setTheSong(_song, true)}>
                  With Vocals
                </button>
                <button onClick={() => setTheSong(_song, false)}>
                  Without Vocals
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
