import "../App.css";
import { useState, useEffect } from "react";
import useGetSong from "../hooks/useGetSong";
import "./home.css";
import {BiUserVoice} from "react-icons/bi"
import {BsPerson} from "react-icons/bs"
import Loading from "../components/Loading";

function App() {
  const [song, setSong] = useState("");
  const { search, setTheSong, songs, lines,loading } = useGetSong();

  const [isLoading, setIsLoading] = useState(loading)

  // Get song timestamps and lyrics




  useEffect(()=>{
    setIsLoading(loading)
  },[loading])

  return (
    <div className="App">
      <h1 className="titleHeading">JustSing</h1>

      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>

        <input
        
          className="inp"
          type="text"
          placeholder="Song name"
          onChange={(e) => {
            setSong(e.target.value);
          }}
          class="block w-full p-4 pl-10 text-sm text-gray border border-gray rounded-lg bg-white focus:ring-blurple focus:border-blurple" required
          ></input>
        <button type="submit" class="mr-40 text-white absolute right-2.5 bottom-2.5 bg-blurple hover:bg-blurple focus:ring-4 focus:outline-none focus:ring-blurple font-medium rounded-lg text-sm px-4 py-2" onClick={() => search(song)}>Search</button>
      </div> 

        <div className="song-list flex-col	flex">
          {songs.map((_song, i) => {
            return (
              // <p>{_song.name}</p>
              <div
                className="flex  flex-row	 justify-between	 border-2 border-blight text-white	 mt-2 h-12 rounded-lg "
                key={_song.name}
              >
                <img src={_song.album.images[2].url} class="w-full h-full"/>
                <div className="flex flex-row content-center	 items-center ml-2">
                  <p> {_song.name} </p>
                  <p>{_song.artists[0].name}</p>
                </div>
                <div className=" flex flex-row justify-between	w-full  items-center mr-4 text-sm	">
                  <button class="	text-white bg-blight  justify-between hover:bg-blurple focus:ring-4 focus:outline-none focus:ring-blurple font-medium rounded-lg text-xs px-2 py-2 text-center mr-3 md:mr-0 w-60 flex 	 items-center mx-8 px-5" onClick={() => setTheSong(_song, true)}>
                    <BiUserVoice />
                  With Vocals
                  </button>
                  <button class="text-white bg-blight justify-evenly hover:bg-blurple focus:ring-4 focus:outline-none focus:ring-blurple font-medium rounded-lg text-xs px-2 py-2 text-center mr-3 md:mr-0  w-60   flex items-center mx-8 px-5" onClick={() => setTheSong(_song, false)}>
                  <BsPerson />
                    Without Vocals
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>

          </div>
  );
}

export default App;
