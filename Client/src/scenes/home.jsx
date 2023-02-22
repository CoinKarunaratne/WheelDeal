import Navbar from "../components/navbar";
import ProfileWidget from "../components/profileWidget";
import PostWidget from "../components/postWidget";
import CollectionWidget from "../components/collectionWidget";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.user);
  const date = new Date(user.joinedDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
  return (
    <div>
      <Navbar />
      <div className="flex flex-row min-h-screen">
        <ProfileWidget />
        <PostWidget />
        <CollectionWidget />
      </div>
    </div>
  );
}
