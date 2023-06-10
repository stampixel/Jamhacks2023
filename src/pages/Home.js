import "../App.css";
import { useState, useEffect } from "react";
import useGetSong from "../hooks/useGetSong";
import "./home.css";
import {BiUserVoice} from "react-icons/bi"
import {BsPerson} from "react-icons/bs"

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
              <div className=" flex flex-row justify-between	w-80  items-center mr-4 text-sm	">
                <button class="	text-white bg-blight  justify-evenly hover:bg-blurple focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-2 py-2 text-center mr-3 md:mr-0 w-smallx flex 	 items-center" onClick={() => setTheSong(_song, true)}>
                   <BiUserVoice />
                  With Vocals
                </button>
                <button class="text-white bg-blight justify-evenly hover:bg-blurple focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-2 py-2 text-center mr-3 md:mr-0  w-40   flex items-center  " onClick={() => setTheSong(_song, false)}>
                 <BsPerson />
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
