import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Welcome from "./scenes/welcome";
import Home from "./scenes/home";
import Profile from "./scenes/profile";
import Register from "./scenes/register";
import PostWidget from "./components/postWidget";
import MobileCollection from "./components/mobileCollection";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <div className="bg-[#1A232E] app inline-block w-[100%]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/newsfeed/:mobile" element={<PostWidget />} />
          <Route path="/collection/:mobile" element={<MobileCollection />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
