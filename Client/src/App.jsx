import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Welcome from "./scenes/welcome";
import Home from "./scenes/home";
import Profile from "./scenes/profile";
import Register from "./scenes/register";
import PostWidget from "./components/postWidget";
import CollectionWidget from "./components/collectionWidget";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <div className="bg-[#1A232E] app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/newsfeed/:mobile" element={<PostWidget />} />
          <Route path="/collection/:mobile" element={<CollectionWidget />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
