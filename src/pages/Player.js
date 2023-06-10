import React from "react";
import AudioPlayer from "../components/AudioPlayer";
import useGetSong from "../hooks/useGetSong";

export default function Player() {
  
    const { search,setTheSong,songs,lines} = useGetSong()

    return (
    <div>
      <h1>Player</h1>

      <AudioPlayer lines={lines} />
    </div>
  );
}
