import React, { useState, useEffect, useRef } from "react";
import useSpeechRecognition from "../hooks/useSpeechRecogntion";
import usePitchAnalyser from "../hooks/usePitchAnalyser";

function AudioPlayer(props) {
  console.log(props.location);
  const audioRef = useRef(new Audio(`../audio_output/${props.location}`));
  const [currentSecond, setCurrentSecond] = useState(0);
  const intervalRef = useRef(null);
  const [audioEnded, setAudioEnded] = useState(false);
  const [lyrics, setLyrics] = useState("");
  const [previousLyrics, setPreviousLyrics] = useState("");
  const [nextLyrics, setNextLyrics] = useState("");
  const [scrollAnimation, setScrollAnimation] = useState(false); // State for the scroll animation

  const audio = audioRef.current;
  //const { startRecording, analyser, message } = useAudioVisualization();
  const [isRecognitionDelayed, setIsRecognitionDelayed] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentSecond(Math.floor(audio.currentTime));
    };

    const handleAudioEnded = () => {
      setAudioEnded(true);
      axios
        .post("/audio_ended")
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleAudioEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleAudioEnded);
    };
  }, []);

  const handlePlay = () => {
    audioRef.current.play();
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

  const lyricsSegments = props.lines;

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

   useEffect(()=>{
console.log(arrayLyrics)
    },[arrayLyrics])  

    useEffect(()=>{
console.log(linePitch)
    },[linePitch])

  useEffect(() => {
    var timeBetween =
      (currentSegment?.endTag - currentSegment?.timeTag - 0.5) * 1000;
    setLyrics(currentSegment);
    setNextLyrics(lyricsSegments[currentIndex + 1]);
    setPreviousLyrics(lyricsSegments[currentIndex - 1]);
    if (currentIndex > 0) {
      startlistening();
      startPitchDetect();
    }
    setTimeout(() => {
      stopListening();
      stopPitchDetect();
    }, timeBetween); // Adjust the duration as needed
  }, [currentIndex]);

  /*useEffect(() => {
    console.log(linePitch);
  }, [linePitch]); */

useEffect(()=>{

 if( arrayLyrics.length > 0){
  props.setLines((prev) => ({
    ...prev,
    ["speechLyrics"]: arrayLyrics[currentIndex]
  }));
}
},[arrayLyrics])

    
  return (
    <div className="audioPlayer direction-column content-center justify-center justify-center">
    
      <p>Current Second: {currentSecond}</p>
      <p>{currentSegment ? currentSegment.words : ""}</p>
      <div className="flex direction-row">
      <button className="startButton" onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      </div>

      {audioEnded ? <p>Congratulations on Completing the song</p> : ""}

      {hasRecognitionSupport ? (
        <>
          {isListening ? <div>Your Browser is currently listening</div> : null}
          {arrayLyrics ? <div>{arrayLyrics}</div> : null}
        </>
      ) : (
        <h1>Your Browser has no speech recognition support</h1>
      )}

      

      {/*  <button onClick={handleButtonClick}>Start Visualizing</button> */}
    </div>
  );
}

export default AudioPlayer;
