import React, {useEffect} from "react";
import AudioPlayer from "../components/AudioPlayer";
import useGetSong from "../hooks/useGetSong";

import {useLocation} from "react-router-dom";

export default function Player() {
    const location = useLocation();

 const { search, setTheSong, songs, lines} = useGetSong();


      console.log("Location: ", location?.state?.locations)

  return (
    <div class="flex direction-column content-center justify-center	h-screen align-middle	 w-full "> 
      <h1>Player</h1>

    
      {<AudioPlayer lines={lines} location={location?.state?.locations}/>}
    </div>
  );
}
