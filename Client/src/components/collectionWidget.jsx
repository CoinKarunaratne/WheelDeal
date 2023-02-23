import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import { motion } from "framer-motion";
import { setUser, setPosts, setFavoritePosts } from "../state";
import { useNavigate } from "react-router-dom";

export default function collectionWidget() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const { mobile } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      const receivedPosts = await fetch(
        `${import.meta.env.VITE_BASE_URL}/posts/${user._id}/saves`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const favoritePosts = await receivedPosts.json();
      dispatch(setFavoritePosts({ favoritePosts }));
    };
    getPosts();
  }, []);

  const savePost = async (value) => {
    const savedResponse = await fetch(
      `${import.meta.env.VITE_BASE_URL}/posts/${user._id}/save`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: value }),
      }
    );
    const data = await savedResponse.json();
    const posts = data.updatedPosts;
    const updatedUser = data.updatedUser;
    const favoritePosts = data.formattedPosts;

    dispatch(setPosts({ posts }));
    dispatch(setUser({ user: updatedUser }));
    dispatch(setFavoritePosts({ favoritePosts }));
  };

  const favoritePosts = useSelector((state) => state.favoritePosts);

  return (
    <>
      {mobile === "mobile" && <Navbar />}
      <div
        className={`${
          mobile !== "mobile" && "basis-1/4"
        } flex justify-end pt-11 min-h-screen`}
      >
        <div className="bg-[#252525] pt-[120px] px-8 flex flex-col w-[90%] h-auto shadow-lg shadow-black rounded-l-[150px] relative">
          <h1
            className={`text-xl font-bold text-white ${
              mobile === "mobile" && "ml-7"
            }`}
          >
            Recently Favorites
          </h1>
          <div className="flex flex-col gap-4 my-8 py-8">
            {favoritePosts.map((post) => {
              return (
                <div
                  key={post._id}
                  className={`flex flex-row ml-10 mb-10 mr-1 ${
                    mobile === "mobile" && "self-center"
                  } bg-gradient-to-r from-[#FF8473] to-[#fff9D2] shadow-lg shadow-black h-[80px] w-[250px] pl-0 rounded-2xl`}
                >
                  <img
                    className="rounded-2xl -ml-10 -mt-2 object-cover shadow-lg shadow-black h-[100px] w-[120px]"
                    src={`${import.meta.env.VITE_BASE_URL}/assets/${
                      post.picturePath
                    }`}
                    alt="post-picture"
                  />
                  <div className="flex flex-col w-full pl-2 pr-4 pt-2 relative">
                    <div className="flex justify-between">
                      <h1 className="text-slate-500 text-sm font-semibold">
                        {post.car}
                      </h1>
                      <h1 className="text-sky-700 text-sm font-semibold">
                        {post.year}
                      </h1>
                    </div>
                    <h1 className="text-slate-500 text-sm font-semibold mt-1">
                      {post.suburb + ", " + post.city}
                    </h1>
                    <a
                      className="text-sky-700 text-sm mt-1 font-medium underline hover:opacity-60 cursor-pointer"
                      onClick={() => navigate(`/profile/${post.userId}`)}
                    >
                      Contact Seller
                    </a>
                    {mobile === "mobile" && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          savePost(post._id);
                        }}
                        className="rounded-full w-[30px] h-[30px] bg-red-500 absolute -right-[50px] top-4 text-lg
                      text-white font-bold shadow-lg shadow-black"
                      >
                        x
                      </motion.button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <h1 className="text-sm absolute self-center bottom-0 text-slate-500 mb-10">
            Copyright © 2023 LuminHub.
          </h1>
        </div>
      </div>
    </>
  );
}
