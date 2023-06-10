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
      <div className="bg-dark h-full w-full z-0">
      
      <nav class="bg-dark w-full z-20 top-0 left-0 text-white">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" class="flex items-center">
              <img src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/r8cwveuu3z-8%3A9?alt=media&token=1bf4f878-9242-4cf5-a61f-576db78653a3" class="h-8 mr-3" alt="Flowbite Logo">
              </img>
              <span class="self-center text-2xl font-semibold whitespace-nowrap">Just Sing</span>
          </a>
          <div class="flex md:order-2">
              <button type="button" class="text-white bg-blight hover:bg-blurple focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">Get started</button>
              <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
              </button>
          </div>
          <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg bg-dark md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-white rounded md:text-blight md:p-0" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-gray rounded md:hover:text-blurple md:p-0">About</a>
              </li>
              <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-gray rounded md:hover:text-blurple md:p-0">Services</a>
              </li>
              <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-gray rounded md:hover:text-blurple md:p-0">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className='header' class='bg-dark'>
        <div>
          <div class="h-60 flex items-center justify-center">
            <div class="mx-2 text-center">
              <h1 className="title" class='text-white font-extrabold text-4xl xs:text-5xl md:text-6xl'>All Your Favourites In One Place</h1>
            </div>
          </div>
        
        </div>

        <div class=" mb-60 ml-40  relative">
        
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
