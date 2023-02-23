import Navbar from "../components/navbar";
import ProfileWidget from "../components/profileWidget";
import PostWidget from "../components/postWidget";
import CollectionWidget from "../components/collectionWidget";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/register");
    }
  }, []);

  return (
    <div>
      {user !== null && <Navbar />}
      {user !== null && (
        <div className="flex flex-row min-h-screen scale-[0.95]">
          <ProfileWidget />
          <PostWidget />
          <CollectionWidget />
        </div>
      )}
    </div>
  );
}
