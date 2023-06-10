import "../App.css";
import { useState, useEffect } from "react";
import AudioPlayer from "../components/AudioPlayer";
import axios from "axios";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function App() {
  const navigate = useNavigate(); 

  const [song, setSong] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [lines, setLines] = useState([]); 
  const [songs, setSongs] = useState([]); 


  function sendLyrics(data){
    console.log(data); 
    axios.post('/music_json', data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    navigate("/player"); 
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
        // songId = data.tracks.items[0].id;
        // console.log(data); 

        var _songs = []; 
        data.tracks.items.forEach(element => {
          _songs.push(element)
        });

        setSongs(_songs); 
        console.log(_songs); 
      });

    // getTimestamps(songId);
  }

  // Get song timestamps and lyrics
  async function getTimestamps(__song) {
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
      .then((data) => modfiyLines(__song, data)); 
  }

  async function modfiyLines(_song, data) {
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
    console.log(data)
    setLines(data.lines);
    sendLyrics(data); 
  }

  const setTheSong = (__song) => {
    console.log(__song); 
    getTimestamps(__song); 
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

      <div className="song-list">
        {songs.map((_song, i) => {
            return (
                // <p>{_song.name}</p>
                <button key={_song.name} onClick={() => setTheSong(_song)}>{_song.name}</button>
            )
        })}
      </div>

      <AudioPlayer lines={lines}  setLines={setLines}/>
    </div>
  );
}

export default App;
