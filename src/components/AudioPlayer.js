import React, { useState, useEffect, useRef } from "react";
import useSpeechRecognition from "../hooks/useSpeechRecogntion";
import usePitchAnalyser from "../hooks/usePitchAnalyser";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {CgPlayButtonO} from "react-icons/cg"

function AudioPlayer() {
  const location = useLocation()
  const navigate = useNavigate()
  // const audioRef = useRef(new Audio("../../" + props.location));
  const audioRef = useRef(new Audio("../../" + location.state.locations));
  const [currentSecond, setCurrentSecond] = useState(0);
  const intervalRef = useRef(null);
  const [audioEnded, setAudioEnded] = useState(false);
  const [lyrics, setLyrics] = useState("");
  const [previousLyrics, setPreviousLyrics] = useState("");
  const [nextLyrics, setNextLyrics] = useState("");
  const [scrollAnimation, setScrollAnimation] = useState(false); // State for the scroll animation
const [hide,setHide] = useState(false)
const [differences,setDifference] = useState(false)
const [score, setScore] = useState([])
  const audio = audioRef.current;
  const [finalScore,setFinalScore] = useState(false)
  //const { startRecording, analyser, message } = useAudioVisualization();
  const [isRecognitionDelayed, setIsRecognitionDelayed] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentSecond(Math.floor(audio.currentTime));
    };

    const handleAudioEnded = () => {
      setAudioEnded(true);
      const sum = score.reduce((a, b) => a + b, 0);
      const avg = (sum / score.length) || 0;
      console.log(score)


      arrayLyrics.forEach((line,index)=>{
getMatchedWords(line,location.state.lyrics[index].words)
      })
      axios
        .post("/audio_ended")
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    function getMatchedWords(words1, words2) {
      console.log( words1.filter((word) => words2.includes(word)));
    }
    

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleAudioEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleAudioEnded);
    };
  }, []);

  const handlePlay = () => {
    audioRef.current.play();
    setHide(true)
  };

  const handlePause = () => {
    audioRef.current.pause();
  };

  useEffect(() => {
    clearInterval(intervalRef.current);

    if (audioRef.current.paused) {
      setCurrentSecond(Math.floor(audioRef.current.currentTime));
    } else {
      intervalRef.current = setInterval(() => {
        setCurrentSecond(Math.floor(audioRef.current.currentTime));
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [audioRef.current.paused, audioRef.current.currentTime]);

  /*useEffect(() => {
      //console.log(props.lines);
    }, [props.lines]); */

  const lyricsSegments = location.state.lyrics;


  const currentSegment = lyricsSegments.find(
    (segment) =>
      currentSecond >= segment.timeTag && currentSecond < segment.endTag
  );
  const currentIndex = lyricsSegments.findIndex(
    (segment) =>
      currentSecond >= segment.timeTag && currentSecond < segment.endTag
  );


  const {
    text,
    arrayLyrics,
    startlistening,
    stopListening,
    isListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  const { startPitchDetect, stopPitchDetect, linePitch } = usePitchAnalyser();

  useEffect(() => {
    console.log(arrayLyrics)
  }, [arrayLyrics])

  useEffect(() => {
    console.log(linePitch)
  }, [linePitch])

  useEffect(() => {
    var timeBetween =
      (currentSegment?.endTag - currentSegment?.timeTag - 1) * 1000;
    setLyrics(currentSegment);
    setNextLyrics(lyricsSegments[currentIndex + 1]);
    setPreviousLyrics(lyricsSegments[currentIndex - 1]);
    if (currentIndex >0) {
    startlistening();
      setScrollAnimation(true)

    }
    setTimeout(() => {
     stopListening();
      setScrollAnimation(false)

    }, timeBetween); // Adjust the duration as needed
  }, [currentIndex]);

  //useEffect(() => {
    

   // const difference = location.state.timetags[currentIndex] - linePitch[currentIndex]
   // setDifference(difference)
    
   // setScore((prev)=>[
   //   ...prev,difference
   // ])
  //  console.log("Difference: ", difference)
  
  //}, [linePitch]); 


  useEffect(()=>{
    if(currentSecond>= location.state.lyrics[0].timeTag){
    startPitchDetect()
    
    setTimeout(() => {
      stopPitchDetect();

    }, 2000); 

  }

    
  },[currentSecond])

  /*useEffect(()=>{
  
   if( arrayLyrics.length > 0){
    props.setLines((prev) => ({
      ...prev,
      ["speechLyrics"]: arrayLyrics[currentIndex]
    }));
  }
  },[arrayLyrics]) */
function directHome(){
  navigate("/")
}

  return (
    <div class=" bg-dark w-screen h-screen font-syne">

    <div className="audioPlayer direction-column content-center justify-center justify-center mx-20">

      <div class="flex justify-between mt-5 mb-1" >
        <span class="text-base font-medium text-white dark:text-white">{location.state.title}</span>

        <span class="text-sm font-medium text-white dark:text-white">{Math.round(currentSecond / location.state.length * 100)}%</span>

      </div>

      < div class="w-9/12 bg-blurple rounded-full h-2.5 ">
        <div class="bg-white h-2.5 rounded-full border-blurple border-2" style={{ width: `${currentSecond / location.state.length * 100}%` }}></div>
      </div>

      <div className="flex direction-row">
    </div>
      <div>

            <div class="text-center justify-center direction-column flex m-20 p-10">
              <h1 className= 'title' class={` ${
    scrollAnimation ? "subtitle-transition" : ""
  } 0 text-white text-xl font-regular xs:text-5xl md:text-6xl mr-4`}>{currentSegment ? currentSegment.words : ""}</h1>
            {audioEnded? "" : <h2 className="subtitle" class='opacity-50 justify-center text-white font-regular text-2xl xs:text-2xl md:text-3xl leading-tight flex w-1/2 mx-1/2'>{nextLyrics ? nextLyrics.words : ""}</h2> } 
          

 {hide? "":  <button class="mt-36 p-6 h-2 space-between gap-x-4 hover:bg-white hover:text-dark justify-center items-center text-white flex direction-row border-white border-2 rounded-full" onClick={handlePlay}>Start <CgPlayButtonO class="text-[30px] h-30 " /></button>}
            
            </div>
        {audioEnded ? <h1 class="text-white text-3xl">Congratulations on Completing the Song</h1> : ""}
        {audioEnded?   <button class="mt-36 p-6 h-2 space-between gap-x-4 hover:bg-white hover:text-dark justify-center items-center text-white flex direction-row border-white border-2 rounded-full" onClick={directHome}>Go Back Home </button> :""}

        {hasRecognitionSupport ? (
          <>
            {isListening ? <div>Your Browser is currently listening</div> : null}
            {arrayLyrics ? <p>{arrayLyrics}</p> : null}
          </>
        ) : (
          <h1>Your Browser has no speech recognition support</h1>
        )}


{differences? Math.abs(differences) < 30? <h2 class="text-bold text-2xl transition duration-150 ease-out  text-white">Excellent</h2> :Math.abs(differences) > 30 && Math.abs(differences)<70? <h3 class="  text-bold text-xl  transition duration-150 ease-out  text-white">Good</h3> : <h4 class="text-bold  ransition duration-150 ease-out  text-white">Keep Trying</h4> : "" }

      </div>



      {/*  <button onClick={handleButtonClick}>Start Visualizing</button> */}
    </div>
    </div>
  );
}

export default AudioPlayer;
