import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { setUser, setPosts, setFavoritePosts } from "../state";
import Navbar from "../components/navbar";

export default function profileWidget() {
  const [user, setuser] = useState({});

  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const mainUser = useSelector((state) => state.user);
  const { userId } = useParams();

  const dispatch = useDispatch();

  const date = new Date(user.joinedDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  useEffect(() => {
    const getPosts = async () => {
      const receivedPosts = await fetch(
        `${import.meta.env.VITE_BASE_URL}/posts/${userId}/posts`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const user = await receivedPosts.json();
      setuser(user);
    };
    getPosts();
  }, []);

  const deletePost = async (value) => {
    const deleteResponse = await fetch(
      `${import.meta.env.VITE_BASE_URL}/posts/${value}/delete`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const posts = await deleteResponse.json();
    dispatch(setPosts({ posts }));
  };

  const savePost = async (value) => {
    const savedResponse = await fetch(
      `${import.meta.env.VITE_BASE_URL}/posts/${mainUser._id}/save`,
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

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <div className="w-full py-[100px] flex justify-center border-b-2 border-b-slate-700">
          <div className="rounded-lg shadow-lg shadow-black bg-[#252525] text-white flex flex-col w-[70%]">
            <div className="rounded-full h-[150px] w-[150px] mt-[-70px] self-center">
              <img
                className="rounded-full object-cover h-full w-full shadow-lg shadow-black"
                src={`${import.meta.env.VITE_BASE_URL}/assets/${
                  user.picturePath
                }`}
                alt="profile-picture"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 py-7 justify-evenly mx-5">
              <div className="flex flex-col text-center">
                <h1 className="font-bold text-slate-500">Name</h1>
                <h1 className="font-normal">
                  {user.firstName + " " + user.lastName}
                </h1>
              </div>
              <div className="sm:hidden h-[1px] w-[80%] bg-sky-700 self-center"></div>
              <div className="flex flex-col text-center">
                <h1 className="font-bold text-slate-500">Location</h1>
                <h1 className="font-normal">{user.suburb + " " + user.city}</h1>
              </div>
              <div className="sm:hidden h-[1px] w-[80%] bg-sky-700 self-center"></div>
              <div className="flex flex-col text-center">
                <h1 className="font-bold text-slate-500">Profile Views</h1>
                <h1 className="font-normal">{user.viewedProfile}</h1>
              </div>
              <div className="sm:hidden h-[1px] w-[80%] bg-sky-700 self-center"></div>
              <div className="flex flex-col text-center">
                <h1 className="font-bold text-slate-500">Sales</h1>
                <h1 className="font-normal">{user.numberOfSales}</h1>
              </div>
              <div className="sm:hidden h-[1px] w-[80%] bg-sky-700 self-center"></div>
              <div className="flex flex-col text-center">
                <h1 className="font-bold text-slate-500">Joined</h1>
                <h1 className="font-normal">{formattedDate}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="py-[100px] px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => {
            if (post.userId === user._id) {
              return (
                <div
                  key={post._id}
                  className="bg-[#252525] rounded-lg flex flex-col m-5 mb-[100px] shadow-lg shadow-black p-5 gap-4"
                >
                  <img
                    className="rounded-xl h-[150px] w-[150px] object-cover self-center -mt-[100px] shadow-lg shadow-black"
                    src={`${import.meta.env.VITE_BASE_URL}/assets/${
                      post.picturePath
                    }`}
                    alt="post-picture"
                  />
                  <div className="flex flex-row justify-between">
                    <h1 className="text-white font-bold text-base">
                      {post.car}
                    </h1>
                    <h1 className="text-white font-bold text-base">
                      {post.year}
                    </h1>
                  </div>
                  <p className="text-white font-medium text-sm">
                    {post.description}
                  </p>
                  <h1 className="text-white font-medium">
                    {post.suburb + " " + post.city}
                  </h1>
                  <div className="flex flex-row gap-4">
                    <div className="rounded-full h-[50px] w-[50px] mt-[-5px]">
                      <img
                        className="rounded-full object-cover h-full w-full"
                        src={`${import.meta.env.VITE_BASE_URL}/assets/${
                          post.userPicturePath
                        }`}
                        alt="profile-picture"
                      />
                    </div>
                    <div className="text-white pt-2 font-medium">
                      {post.firstName + " " + post.lastName}
                    </div>
                  </div>
                  <p className="text-white font-medium">
                    {post.saves.length} people has saved this post.
                  </p>

                  {post.userId === mainUser._id ? (
                    <motion.button
                      whileHover={{ scale: 0.95 }}
                      whileTap={{ scale: 0.9 }}
                      className={`text-lg font-bold text-white rounded-lg py-1 bg-red-500`}
                      onClick={() => {
                        deletePost(post._id);
                      }}
                    >
                      Mark as Sold
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 0.95 }}
                      whileTap={{ scale: 0.9 }}
                      className={`text-lg font-bold text-white rounded-lg py-1 ${
                        post.saves.includes(mainUser._id)
                          ? "bg-sky-600"
                          : "bg-green-600"
                      }`}
                      onClick={() => {
                        savePost(post._id);
                      }}
                    >
                      {post.saves.includes(mainUser._id) ? "Remove" : "Save"}
                    </motion.button>
                  )}
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
