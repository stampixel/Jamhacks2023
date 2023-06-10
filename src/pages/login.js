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
      <div className="App bg-dark h-screen h-60 flex items-center justify-center">
        <div class="mx-2 text-center">
          <h1 className="title" class='text-white font-extrabold text-4xl xs:text-5xl md:text-6xl'>Username</h1>
        </div>
        <div className=" absolute top-[417px] left-[200px] w-[724px] h-[77px] pl-[55px] pr-[480px] pt-[22px] pb-[21px] border-[5px] border-white border-solid rounded-[50px] box-border">
          <index 
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          className=" inp border-[#ffffffff] text-2xl leading-6  font-syne  font-[700]">
          </index>
        </div>
        <div className=" absolute top-[417px] left-[955px] w-[125px] h-[77px] px-[29px] pt-[18px] pb-[17px] border-[5px] border-white border-solid rounded-[50px] box-border  bg-[rgba(105,46,231,1)]">
          <button className="btn flex flex-col justify-center  border-[#ffffffff]  text-[32px] leading-8  font-syne  font-[700] text-center" onClick={() => loginUser(username)}>
            GO
          </button>
        </div>
      </div>
    )
  }