import "../App.css";
import { useState, useEffect } from "react";
import useUserInfo from "../hooks/useUserInfo";
import axios from "axios";

export default function Scoreboard() {

    // playerNames = [], playerScores = [], playerPitches = [], playerWords = []; 
    var playerInfo = []; 
    function displayScoreboard() {
        axios
            .get("/scores")
            .then(function (response) {
                playerInfo = response; 
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
  
    return (
      <div className="App">
        <h1 className="titleHeading">Scoreboard</h1>
  
        <div className="song-list flex-col	flex">
            {playerInfo.map((player, i) => {
                return (
                    <div
                        className="flex  flex-row	 justify-between	 border-2 border-purple hover:bg-gray-light hover:bg-slate-400	 mt-2 h-12 rounded-lg "
                        key={i["username"]}
                        >
                        <div className="flex flex-row content-center	 items-center ml-2">
                            <p> {player["username"]} </p>
                        </div>
                    </div>
                );
            })}
        </div>

        <button onClick={()=> displayScoreboard()}>LOAD DATA</button>
      </div>
    );
  }