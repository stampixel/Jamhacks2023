import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useGetSong() {
  const [accessToken, setAccessToken] = useState("");
  const [lines, setLines] = useState([]);
  const [songs, setSongs] = useState([]);
  const [slocation, setLocation] = useState("")
  const [loading,setLoading] = useState(false)
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
    var lines = data.lines;
    var title = _song.name;
    var length = _song.duration_ms / 1000;
    await lines.forEach((line, index) => {
      var a = line.timeTag.split(":");
      var seconds = parseInt(a[0]) * 60 + parseInt(a[1]);
      line.timeTag = seconds;
      if (lines[index + 1]) {
        var end = lines[index + 1]?.timeTag.split(":");
        var endseconds = parseInt(end[0]) * 60 + parseInt(end[1]);
        line.endTag = endseconds;
      }
    });

    lines.pop()
    console.log(lines)
    data["name"] = title;
    data["length"] = length;
    data["vocals"] = vocals;



    await sendLyrics(data,lines,title,length);

  }

  const setTheSong = (__song, vocals,) => {
    getTimestamps(__song, vocals);
  };

  async function sendLyrics(data,lines,title,length) {
    console.log(data)
    //setLoading(true)
    await axios
      .post("https://n2tz2aw2e6.execute-api.ca-central-1.amazonaws.com/Prod/hello", data)
      .then(function (response) {
            //  setLoading(false)
            console.log(response)
      navigateScreen(response.data.fileLocation,lines,title,length,response.data.timeTags)
      })
      .catch(function (error) {
        alert(error);
      });

      setLoading(false)



  }

  function navigateScreen(data,lines,title,length,timetags){
    console.log(length)
navigate('/player',{state:{locations:data, lyrics:lines,title:title,length:length ,timetags:timetags} });
  }




  return {
    search,
    setTheSong,
    songs,
    lines,
    loading

  };
}
