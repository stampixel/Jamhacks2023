import "../App.css";
import { useState, useEffect } from "react";
import useGetSong from "../hooks/useGetSong";
import axios from "axios";

export default function Login() {
    const [username, setUsername] = useState(""); 
    const [wordAccuracy, setWordAccuracy] = useState(0); 
    const [pitchAccuracy, setPitchAccuracy] = useState(0); 
    const [score, setScore] = useState(0); 
  
    const { setUserState, user } = useGetSong();

    function loginUser(username) {
      console.log(username)
        const data = {
            "username": username
        }
        axios
            .post("/login", data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
  
    return (
      <div className="App">
        <h1 className="titleHeading">Login</h1>
  
        <input
          className="inp"
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
  
        <button className="btn" onClick={() => loginUser(username)}>
          Login
        </button>
      </div>
    );
  }