import React, {useEffect} from "react";
import AudioPlayer from "../components/AudioPlayer";
import useGetSong from "../hooks/useGetSong";

import {useLocation} from "react-router-dom";

export default function Player() {
    const location = useLocation();

<<<<<<< HEAD
 const { search, setTheSong, songs, lines} = useGetSong();
=======
    const {lines} = useGetSong()
>>>>>>> 07ead7c69bc769fab2f38b8818dd1d844c331e1e

    console.log("Location: ", lines)

  return (
    <div class="flex direction-column content-center justify-center	h-screen align-middle	 w-full "> 
      <h1>Player</h1>
<<<<<<< HEAD

    
      {<AudioPlayer lines={lines} location={location?.state?.locations}/>}
=======
      <AudioPlayer linea={lines} location={location?.state?.locations}/>
>>>>>>> 07ead7c69bc769fab2f38b8818dd1d844c331e1e
    </div>
  );
}
