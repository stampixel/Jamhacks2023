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

    function loginUser() {
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
                changeProfile(response.data.name,'name')
                changeProfile(response.data.word_accuracy,'word_accuracy')
                changeProfile(response.data.pitch_accuracy,'pitch_accuracy')
                changeProfile(response.data.total_score, "total_score")
                console.log(inputs)

            })
            .catch(function (error) {
                console.log(error);
            });
    }
  
    return (
        <div className='App' class='bg-dark h-screen font-syne'>
            <div class="h-96 flex items-center justify-center">
                <div class="mx-2 text-center">
                <h1 className="title" class='text-white font-bold text-4xl xs:text-5xl md:text-6xl'>Log In</h1>
                <h2 className="subtitle" class='text-white font-regular text-1xl xs:text-2xl md:text-3xl leading-tight flex w-1/2 mx-1/2'>
                    Please enter your username for Just Sing below
                </h2>
                </div>
            </div>
            <div class="relative mb-4 flex w-full flex-wrap items-stretch mr-40 ml-40 mb-56	">
                <input
                class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto p-4 text-sm text-gray border border-gray rounded-lg bg-white focus:ring-blurple focus:border-blurple" required
                value={username} onChange={(e) => setUsername(e.target.value)} />
            <button class="relative z-[2] flex items-center rounded-r bg-blurple px-6 py-2.5 text-xs font-bold uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg" onClick={loginUser}>Login</button>
        </div>
      </div>
    );
  }