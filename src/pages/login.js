import "../App.css";
import { useState, useEffect } from "react";
import useGetSong from "../hooks/useGetSong";

export default function Login() {
    const [username, setUser] = useState("");
  
    const { setUserState, user } = useGetSong();

    function loginUser(username) {
        data = {
            "username": username
        }
        axios
            .post("/login", data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
  
    return (
      <div className="App">
        <h1 className="titleHeading">Login</h1>
  
        <input
          className="inp"
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
  
        <button className="btn" onClick={() => loginUser(username)}>
          Login
        </button>
      </div>
    );
  }