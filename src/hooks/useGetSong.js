import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useGetSong() {
  const [accessToken, setAccessToken] = useState("");
  const [lines, setLines] = useState([]);
  const [songs, setSongs] = useState([]);
  const [slocation, setLocation] = useState("")
  const navigate = useNavigate();



  // Fetch access token for Spotify API
  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        process.env.REACT_APP_CLIENT_ID +
        "&client_secret=" +
        process.env.REACT_APP_CLIENT_SECRET,
    };

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  async function search(song) {
    var songId = "";
    var songParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    await fetch(
      `https://api.spotify.com/v1/search?q=${song}&type=track`,
      songParameters
    )
      .then((response) => response.json())
      .then((data) => {
        // songId = data.tracks.items[0].id;
        // console.log(data);

        var _songs = [];
        data.tracks.items.forEach((element) => {
          _songs.push(element);
        });

        setSongs(_songs);
        console.log(_songs);
      });

    // getTimestamps(songId);
  }

  async function getTimestamps(__song, vocals) {
    var authParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    var songId = __song.id;

    var timestamps = await fetch(
      `https://spotify-lyric-api.herokuapp.com/?trackid=${songId}&format=lrc`
    )
      .then((response) => response.json())
      .then((data) => modfiyLines(__song, data, vocals));
  }

  async function modfiyLines(_song, data, vocals) {
    // console.log(data);
    var _lines = data.lines;
    var title = _song.name;
    var length = _song.duration_ms / 1000;
    await _lines.forEach((line, index) => {
      var a = line.timeTag.split(":");
      var seconds = parseInt(a[0]) * 60 + parseInt(a[1]);
      line.timeTag = seconds;
      if (data[index + 1]) {
        var end = data[index + 1]?.timeTag.split(":");
        var endseconds = parseInt(end[0]) * 60 + parseInt(end[1]);
        line.endTag = endseconds;
      }
    });
    data["name"] = title;
    data["length"] = length;
    data["vocals"] = vocals;
    console.log(data);
    setLines(data.lines);
    sendLyrics(data);
  }

  const setTheSong = (__song, vocals) => {
    console.log(__song);
    getTimestamps(__song, vocals);
  };

  async function sendLyrics(data) {
    console.log(data);
    await axios
      .post("/process_music", data)
      .then(function (response) {
      navigateScreen(response.data.fileLocation)
      })

      .catch(function (error) {
        console.log(error);
      });

  }

  function navigateScreen(data){
navigate('/player',{state:{locations:data}});
  }




  return {
    search,
    setTheSong,
    songs,
    lines,

  };
}
