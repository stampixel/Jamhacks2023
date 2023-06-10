import "../App.css";
import { useState, useEffect } from "react";
import AudioPlayer from "../components/AudioPlayer";
import axios from "axios";

function App() {
  const [song, setSong] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [lines, setLines] = useState([]);


  function sendLyrics(){
    axios.post('/music_json', lines)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
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

  // Search for a specific song
  async function search() {
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
        songId = data.tracks.items[0].id;
        /*  console.log(data.tracks.items[0]); */
      });

    getTimestamps(songId);
  }

  // Get song timestamps and lyrics
  async function getTimestamps(songId) {
    var authParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    var timestamps = await fetch(
      `https://spotify-lyric-api.herokuapp.com/?trackid=${songId}&format=lrc`
    )
      .then((response) => response.json())
      .then((data) => modfiyLines(data.lines));
  }

  async function modfiyLines(data) {
    await data.forEach((line, index) => {
      var a = line.timeTag.split(":");
      var seconds = parseInt(a[0]) * 60 + parseInt(a[1]);
      line.timeTag = seconds;
      if (data[index + 1]) {
        var end = data[index + 1]?.timeTag.split(":");
        var endseconds = parseInt(end[0]) * 60 + parseInt(end[1]);
        line.endTag = endseconds;
      }
    });
    /* console.log(data) */
    setLines(data);
    sendLyrics()
  }

  return (
    <div className="App">
      <h1>Lyrics Finder ????</h1>

      <input
        className="inp"
        type="text"
        placeholder="Song name"
        onChange={(e) => {
          setSong(e.target.value);
        }}
      />

      <button className="btn" onClick={() => search()}>
        ???? Search
      </button>

      <AudioPlayer lines={lines}  setLines={setLines}/>
    </div>
  );
}

export default App;
