import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Welcome from "./scenes/welcome";
import Home from "./scenes/home";
import Profile from "./scenes/profile";
import Register from "./scenes/register";

function App() {
  return (
    <div className="bg-[#1A232E] app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
