import "./App.css";
import Home from "./pages/Home"
import Landing from "./pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Player from "./pages/Player";
import Login from "./pages/login"
import Scoreboard from "./pages/scoreboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/landing" element={<Landing />}></Route>
          <Route path="/player" element={<Player />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/scoreboard" element={<Scoreboard />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
