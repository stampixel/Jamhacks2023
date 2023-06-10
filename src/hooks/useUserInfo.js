import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useUserInfo() {
    const [inputs, setInputs] = useState({
        name: "",
        word_accuracy: 0,
        pitch_accuracy: 0,
        total_score: 0,
      });

      
     function changeProfile(variables, values){
        setInputs((prev) => ({
            ...prev,
            [variables]:values,
          }));
      } 

      return{
        changeProfile,
        inputs
        
      }
}