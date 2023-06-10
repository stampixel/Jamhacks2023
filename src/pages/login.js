import "../App.css";
import { useState, useEffect } from "react";
import useGetSong from "../hooks/useGetSong";
import useUserInfo from "../hooks/useUserInfo";
import axios from "axios";

export default function Login() {
    const [username, setUsername] = useState(""); 
    // const [word_accuracy, setWordAccuracy] = useState(0); 
    // const [pitch_accuracy, setPitchAccuracy] = useState(0); 
    // const [total_score, setScore] = useState(0); 
  
  const { changeProfile, inputs } = useUserInfo();

    function loginUser(username) {
        const data = {
            "username": username
        }
        axios
            .post("/login", data)
            .then(function (response) {
                // setUsername(username); 
                // setWordAccuracy(response.word_accuracy); 
                // setPitchAccuracy(response.pitch_accuracy)
                // setScore(response.score); 
             
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
  
    return (
      <div className="App">
        <h1 className="titleHeading">Login</h1>

        <div className="song-list flex-col	flex">
            {playerInfo.map((player, i) => {
                return (
                    <div
                        className="flex  flex-row	 justify-between	 border-2 border-purple hover:bg-gray-light hover:bg-slate-400	 mt-2 h-12 rounded-lg "
                        key={i["username"]}
                        >
                        <div className="flex flex-row content-center	 items-center ml-2">
                            <p> {i["username"]} </p>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    );
  }