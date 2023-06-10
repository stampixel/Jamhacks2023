import "../App.css";
import { useState, useEffect } from "react";
import useGetSong from "../hooks/useGetSong";
import useUserInfo from "../hooks/useUserInfo";
import axios from "axios";

export default function Login() {
    const [username, setUsername] = useState(""); 
    const [word_accuracy, setWordAccuracy] = useState(0); 
    const [pitch_accuracy, setPitchAccuracy] = useState(0); 
    const [total_score, setScore] = useState(0); 
  
 //   const { user, wordAccuracy, pitchAccuracy, score } = useUserInfo();

    function loginUser(username) {
        const data = {
            "username": username
        }
        axios
            .post("/login", data)
            .then(function (response) {
                setUsername(username); 
                setWordAccuracy(response.word_accuracy); 
                setPitchAccuracy(response.pitch_accuracy)
                setScore(response.score); 
             //   useUserInfo(username, word_accuracy, pitch_accuracy, total_score);
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