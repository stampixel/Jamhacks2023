import {useEffect, useState} from "react";

let recognition = null

if ("webkitSpeechRecognition" in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuos = true;
    recognition.lang = "en-US";

}


const useSpeechRecognition = () => {

    const [text, setText] = useState('');
    const [arrayLyrics, setArrayLyrics] = useState([])
    const [islistening, setIslistening] = useState('')


    useEffect(() => {
        if (!recognition) return;
        recognition.onresult = (event) => {
            console.log('onresult event: ', event) 
            setText(event.results[0][0].transcript)
            setArrayLyrics(oldArray => [...oldArray, event.results[0][0].transcript]);
            stopListening()
        }
    }, [])


    const startlistening = () => {
        setText('')
        setIslistening(true)
        recognition.start()
      /*  console.log("started listening") */
    }


    const stopListening = () => {
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