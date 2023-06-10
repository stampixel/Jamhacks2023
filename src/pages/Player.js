import React from "react";
import AudioPlayer from "../components/AudioPlayer";
import useGetSong from "../hooks/useGetSong";

export default function Player() {
  const { search, setTheSong, songs, lines,songLocation } = useGetSong();

  return (
    <div class="flex direction-column content-center justify-center	h-screen align-middle	 w-full "> 
      <h1>Player</h1>

    
      <AudioPlayer lines={lines} location={songLocation}/>
    </div>
  );
}
