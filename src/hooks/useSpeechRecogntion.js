import {useEffect, useState} from "react";

let recognition = null

if ("webkitSpeechRecognition" in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuos = true;
    recognition.lang = "en-US";

}


const useSpeechRecognition = () => {

    const [text, setText] = useState('');
    const [arrayLyrics, setArrayLyrics] = useState()
    const [islistening, setIslistening] = useState(false)
    


    useEffect(() => {
        if (!recognition) return;
        recognition.onresult = (event) => {
            console.log('onresult event: ', event) 
            setText(event.results[0][0].transcript)
            console.log(event)
            var wordsSaid = event.results[0][0].transcript.split(""); 
            setArrayLyrics(wordsSaid)
            stopListening()
        }
    }, [recognition])


    const startlistening = () => {
    console.log("listening")
        setText('')
        setIslistening(true)
        recognition.start()
      /*  console.log("started listening") */
    }


    const stopListening = () => {
                console.log("stop listening")


        setIslistening(false)
        recognition.stop()
    }


    return {
        text,
        arrayLyrics,
        islistening,
        startlistening,
        stopListening,
        hasRecognitionSupport: !!recognition,
    }


}
export default useSpeechRecognition;