import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function getUserInfo() {
    const [username, setUsername] = useState(""); 
    const [wordAccuracy, setWordAccuracy] = useState(0); 
    const [pitchAccuracy, setPitchAccuracy] = useState(0); 
    const [score, setScore] = useState(0); 
}