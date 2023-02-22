import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFavoritePosts } from "../state";

export default function collectionWidget() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const getPosts = async () => {
      const receivedPosts = await fetch(
        `http://localhost:3001/posts/${user._id}/saves`,
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

  const favoritePosts = useSelector((state) => state.favoritePosts);

  return (
    <div className="basis-1/4 flex justify-end pt-11">
      <div className="bg-[#252525] pt-[120px] px-8 flex flex-col w-[90%] h-auto shadow-lg shadow-black rounded-l-[150px] relative">
        <h1 className="text-xl font-bold text-white">Recently Favorites</h1>
        <div className="flex flex-col gap-4 my-8 py-8">
          {favoritePosts.map((post) => {
            return (
              <div
                key={post._id}
                className="flex flex-row ml-10 mb-10 mr-1 bg-gradient-to-r from-[#FF8473] to-[#fff9D2] shadow-lg shadow-black h-[80px] w-[250px] pl-0 rounded-2xl"
              >
                <img
                  className="rounded-2xl -ml-10 -mt-2 object-cover shadow-lg shadow-black h-[100px] w-[120px]"
                  src={`http://localhost:3001/assets/${post.picturePath}`}
                  alt="post-picture"
                />
                <div className="flex flex-col w-full pl-2 pr-4 pt-2">
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
                    className="text-sky-700 text-sm mt-1 font-medium underline hover:opacity-60"
                    href=""
                  >
                    Contact Seller
                  </a>
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
  );
}
