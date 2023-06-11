import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useUserInfo() {


    const [userName,setUserName] = useState("")


    useEffect(() => {
       console.log(userName)
    }, [userName]);


    function change(name){
        setUserName(name)
    }




    return {
        change,
        userName

    }
}