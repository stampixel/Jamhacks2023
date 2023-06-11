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
    <div className="App font-syne">
      <div className="bg-dark h-full w-full z-0">
      
      <nav class="bg-dark w-full z-20 top-0 left-0 text-white">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" class="flex items-center">
              <img src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/r8cwveuu3z-8%3A9?alt=media&token=1bf4f878-9242-4cf5-a61f-576db78653a3" class="h-8 mr-3" alt="Flowbite Logo">
              </img>
              <span class="self-center text-2xl font-semibold whitespace-nowrap">VocalAI</span>
          </a>
          <div class="flex md:order-2">
              <button type="button" class="text-white bg-blight hover:bg-blurple focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">Get started</button>
              <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                
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

      <div className='header' class='bg-dark h-screen'>
        <div>
          <div class="h-72 flex items-center justify-center">
            <div class="mx-2 text-center">
              <h1 className="title" class='text-white font-bold text-4xl xs:text-5xl md:text-6xl'>All Your Favourites In One Place</h1>
              <h2 className="subtitle" class='justify-center text-white font-regular text-1xl xs:text-2xl md:text-3xl leading-tight flex w-1/2 mx-1/2'>Don't believe us? Try searching for any song you know!</h2>
            </div>
          </div>
        
        </div>

        <div class="mb-3">
  <div class="relative flex w-full flex-wrap items-stretch mr-40 ml-40">
    <input
      type="search"
      class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto p-4 text-sm text-gray border border-gray rounded-lg bg-white focus:ring-blurple focus:border-blurple" required
      placeholder="Search Song"
      aria-label="Search"
      aria-describedby="button-addon1"
      onChange={(e) => {
        setSong(e.target.value);
      }} />

    <button
    onClick={() => search(song)}
      class="relative z-[2] flex items-center rounded-r bg-blurple px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
      type="button"
      id="button-addon1"
      data-te-ripple-init
      data-te-ripple-color="light">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="h-5 w-5">
        <path
          fill-rule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</div>

     {/*   <div class=" mb-60 ml-40  relative">
        
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
        */}
        <div className="song-list flex-col	flex m-20">
          {songs.map((_song, i) => {
            return (
              // <p>{_song.name}</p>
              <div
                className="p-6 flex  flex-row	 justify-between	 border-2 border-blight text-dark	bg-white  rounded-[25px] m-2"
                key={_song.name}
              >
                <img src={_song.album.images[2].url} class="w-full h-full rounded-[12px]"/>
                <div className="flex flex-row content-center	 items-center ml-20">
                  <b> {_song.name}</b>
                  <p>&nbsp;-&nbsp;</p>
                  <p>{_song.artists[0].name}</p>
                </div>
                <div className=" flex flex-row justify-between	w-full  items-center mr-4 text-sm	">
                  <button class="h-12	text-white bg-blight  justify-between hover:bg-blurple focus:ring-4 focus:outline-none focus:ring-blurple font-medium rounded-lg text-xs px-2 py-2 text-center mr-3 md:mr-0 w-60 flex 	 items-center mx-8 px-5" onClick={() => setTheSong(_song, true)}>
                    <BiUserVoice />
                  With Vocals
                  </button>
                  <button class="h-12 text-white bg-blight justify-evenly hover:bg-blurple focus:ring-4 focus:outline-none focus:ring-blurple font-medium rounded-lg text-xs px-2 py-2 text-center mr-3 md:mr-0  w-60   flex items-center mx-8 px-5" onClick={() => setTheSong(_song, false)}>
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
