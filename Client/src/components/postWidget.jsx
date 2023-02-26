import { useSelector, useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import { motion } from "framer-motion";
import * as yup from "yup";
import { useFormik } from "formik";
import { setPosts, setUser, setFavoritePosts } from "../state/index.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";

const postSchema = yup.object().shape({
  car: yup.string().required("Required"),
  year: yup.number().required("Required"),
  description: yup.string().min(10).max(100).required("Required"),
  picture: yup.string().required("Required"),
});

const filterSchema = yup.object().shape({
  city: yup.string().required("Required"),
  suburb: yup.string().required("Required"),
});

const postInitial = {
  car: "",
  year: "",
  description: "",
  picture: "",
};

const filterInitial = {
  city: "",
  suburb: "",
};

export default function profileWidget() {
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const { mobile } = useParams();
  const navigate = useNavigate();

  const [isFilter, setisFilter] = useState(false);
  useEffect(() => {
    const getPosts = async () => {
      const receivedPosts = await fetch(
        `${import.meta.env.VITE_BASE_URL}/posts/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const posts = await receivedPosts.json();
      dispatch(setPosts({ posts }));
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

  const onSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("userId", user._id);
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("suburb", user.suburb);
    formData.append("city", user.city);
    formData.append("userPicturePath", user.picturePath);
    formData.append("picturePath", values.picture.name);

    const savedPostResponse = await fetch(
      `${import.meta.env.VITE_BASE_URL}/posts/create`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );
    const posts = await savedPostResponse.json();
    onSubmitProps.resetForm();
    dispatch(setPosts({ posts }));
  };

  const submitFilter = async (values) => {
    setisFilter(!isFilter);
  };

  const formik = useFormik({
    initialValues: postInitial,
    validationSchema: postSchema,
    onSubmit,
  });

  const filter = useFormik({
    initialValues: filterInitial,
    validationSchema: filterSchema,
    onSubmit: submitFilter,
  });

  return (
    <>
      {mobile === "mobile" && <Navbar />}
      <div
        className={`flex flex-col grow w-[100%] px-5 ${
          mobile !== "mobile" && "border-r-2"
        } border-sky-900 ${mobile === "mobile" && "overflow-x-hidden"} ${
          mobile === "mobile" && "mt-[100px]"
        }`}
      >
        <div className="flex flex-col sm:flex-row justify-between rounded-lg p-5 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-black mb-5">
          <div className="px-5">
            <h1 className="text-white font-bold text-3xl">Post your Ad Here</h1>
            <form
              className="pt-5 pb-0 flex flex-col gap-7 my-2"
              onSubmit={formik.handleSubmit}
            >
              <div className="relative">
                <input
                  id="car"
                  type="text"
                  className="border-b-2 bg-transparent focus:outline-none py-1 border-sky-700 focus:border-sky-700 placeholder-shown:border-white peer placeholder-transparent"
                  autoComplete="off"
                  placeholder="Car Type :"
                  value={formik.values.car}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="car"
                  className="absolute left-0 cursor-text text-xs -top-4 text-sky-700 peer-focus:left-0 peer-focus:text-xs peer-focus:-top-4 peer-focus:text-sky-700
                       peer-placeholder-shown:text-white transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-1 font-bold"
                >
                  Car Type :
                </label>

                {formik.errors.car && formik.touched.car && (
                  <p className="text-[#fc8181] text-[0.75rem] text-left">
                    {formik.errors.car}
                  </p>
                )}
              </div>
              <div className="relative">
                <input
                  id="year"
                  type="number"
                  className="border-b-2 bg-transparent placeholder-transparent focus:outline-none py-1 border-sky-700 focus:border-sky-700 placeholder-shown:border-white peer"
                  autoComplete="off"
                  placeholder="Year"
                  value={formik.values.year}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="year"
                  className="absolute left-0 cursor-text text-xs -top-4 text-sky-700 peer-focus:left-0 peer-focus:text-xs peer-focus:-top-4 peer-focus:text-sky-700
                       peer-placeholder-shown:text-white transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-1 font-bold"
                >
                  Car Year :
                </label>
                {formik.errors.year && formik.touched.year && (
                  <p className="text-[#fc8181] text-[0.75rem] text-left">
                    {formik.errors.year}
                  </p>
                )}
              </div>
              <div className="relative">
                <textarea
                  id="description"
                  type="text"
                  className="h-[100px] w-full border-b-2 placeholder-transparent bg-transparent focus:outline-none py-1 border-sky-700 focus:border-sky-700 placeholder-shown:border-white peer"
                  autoComplete="off"
                  placeholder="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="description"
                  className="absolute left-0 cursor-text text-xs -top-4 text-sky-700 peer-focus:left-0 peer-focus:text-xs peer-focus:-top-4 peer-focus:text-sky-700
                       peer-placeholder-shown:text-white transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-1 font-bold"
                >
                  Description :
                </label>
                {formik.errors.description && formik.touched.description && (
                  <p className="text-[#fc8181] text-[0.75rem] text-left">
                    {formik.errors.description}
                  </p>
                )}
              </div>
              <div>
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(files) => formik.setFieldValue("picture", files[0])}
                >
                  {({ getRootProps, getInputProps }) => (
                    <motion.div
                      {...getRootProps()}
                      whileTap={{ scale: 0.9 }}
                      className="border-dashed border-[2px] border-white p-[1rem] hover:cursor-pointer h-[3rem] w-[100%] py-[0.65rem] px-[1rem] text-[1rem]"
                    >
                      <input {...getInputProps()} />
                      {!formik.values.picture ? (
                        <p className="text-center text-white mb-0">
                          Add Picture Here
                        </p>
                      ) : (
                        <p className="text-center text-white mb-0">
                          {formik.values.picture.name}
                        </p>
                      )}
                    </motion.div>
                  )}
                </Dropzone>
                {formik.errors.picture && formik.touched.picture && (
                  <p className="text-[#fc8181] text-[0.75rem] text-left">
                    {formik.errors.picture}
                  </p>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 0.95 }}
                disabled={formik.isSubmitting}
                className="disabled:opacity-[0.35] py-[0.35rem] px-[0.5rem] bg-gradient-to-r from-lime-500 to-green-500 text-white border-none rounded-[3px] text-[1rem] font-bold cursor-pointer"
                type="submit"
              >
                Submit
              </motion.button>
            </form>
          </div>
          <div className="relative w-[30%] px-5">
            <img
              className="rounded-xl w-[150px] h-[150px] hidden lg:inline-block absolute top-[190px] right-0 shadow-lg shadow-black"
              src="/postCar.jpg"
              alt=""
            />
            <img
              className="rounded-xl w-[150px] h-[150px] hidden lg:inline-block absolute top-[50px] left-0 shadow-lg shadow-black"
              src="/postCar2.jpg"
              alt=""
            />
          </div>
        </div>
        <form
          onSubmit={filter.handleSubmit}
          className="flex flex-row justify-end gap-4 mt-10"
        >
          <select
            id="city"
            value={filter.values.city}
            onChange={filter.handleChange}
            onBlur={filter.handleBlur}
            className={`mb-[0.5rem] w-[150px] py-[0.65rem] px-[1rem] text-[1rem] text-white border-solid border-[#4a5568] bg-[#2d3748] rounded-[10px] border-[2px] focus:border-[#4299e1] outline-none placeholder:text-[#a0aec0]`}
          >
            <option value="">City</option>
            <option value="Auckland">Auckland</option>
            <option value="Wellington">Wellington</option>
            <option value="Christchurch">Christchurch</option>
            <option value="Dunedin">Dunedin</option>
            <option value="Hamilton">Hamilton</option>
            <option value="Tauranga">Tauranga</option>
          </select>
          <select
            id="suburb"
            value={filter.values.suburb}
            onChange={filter.handleChange}
            onBlur={filter.handleBlur}
            className={`mb-[0.5rem] w-[150px] py-[0.65rem] px-[1rem] text-[1rem] text-white border-solid border-[#4a5568] bg-[#2d3748] rounded-[10px] border-[2px] focus:border-[#4299e1] outline-none placeholder:text-[#a0aec0]`}
          >
            <option value="">Suburb</option>
            <option value="CBD">CBD</option>
            <option value="North">North</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="South">South</option>
          </select>
          <motion.button
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.9 }}
            className="mb-[0.5rem] w-[100px] py-[0.65rem] text-[1rem] text-slate-700 font-medium bg-gradient-to-r from-lime-500 to-green-500 rounded-[10px]"
            type="submit"
          >
            {isFilter ? "Clear" : "Filter"}
          </motion.button>
        </form>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5 p-5 pt-[100px]">
          {isFilter
            ? posts.map((post) => {
                if (
                  post.city === filter.values.city &&
                  post.suburb === filter.values.suburb
                )
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
                      <p className="text-white text-sm font-medium">
                        {post.description}
                      </p>
                      <h1 className="text-white font-medium">
                        {post.suburb + " " + post.city}
                      </h1>
                      <motion.div
                        whileTap={{ scale: 0.8 }}
                        whileHover={{ scale: 0.95 }}
                        onClick={() => navigate(`/profile/${post.userId}`)}
                        className="flex flex-row gap-4 cursor-pointer hover:opacity-60"
                      >
                        <div className="rounded-full flex flex-col md:flex-row justify-start h-[50px] w-[50px] mt-[-5px]">
                          <img
                            className="rounded-full object-cover h-full w-full"
                            src={`${import.meta.env.VITE_BASE_URL}/assets/${
                              post.userPicturePath
                            }`}
                            alt="profile-picture"
                          />
                        </div>
                        <div className="text-sky-700 pt-2 font-semibold text-xs md:text-sm">
                          {post.firstName + " " + post.lastName}
                        </div>
                      </motion.div>
                      <p className="text-white font-medium">
                        {post.saves.length} people has saved this post.
                      </p>
                      {post.userId === user._id ? (
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
                            post.saves.includes(user._id)
                              ? "bg-sky-600"
                              : "bg-green-600"
                          }`}
                          onClick={() => {
                            savePost(post._id);
                          }}
                        >
                          {post.saves.includes(user._id) ? "Remove" : "Save"}
                        </motion.button>
                      )}
                    </div>
                  );
              })
            : posts.map((post) => {
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
                    <p className="text-white text-sm font-medium">
                      {post.description}
                    </p>
                    <h1 className="text-white font-medium">
                      {post.suburb + " " + post.city}
                    </h1>
                    <motion.div
                      whileTap={{ scale: 0.8 }}
                      whileHover={{ scale: 0.95 }}
                      onClick={() => navigate(`/profile/${post.userId}`)}
                      className="flex flex-row gap-4 cursor-pointer hover:opacity-60"
                    >
                      <div className="rounded-full h-[50px] w-[50px] mt-[-5px]">
                        <img
                          className="rounded-full object-cover h-full w-full"
                          src={`${import.meta.env.VITE_BASE_URL}/assets/${
                            post.userPicturePath
                          }`}
                          alt="profile-picture"
                        />
                      </div>
                      <div className="text-sky-700 pt-2 font-semibold">
                        {post.firstName + " " + post.lastName}
                      </div>
                    </motion.div>
                    <p className="text-white font-medium">
                      {post.saves.length} people has saved this post.
                    </p>
                    {post.userId === user._id ? (
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
                          post.saves.includes(user._id)
                            ? "bg-sky-600"
                            : "bg-green-600"
                        }`}
                        onClick={() => {
                          savePost(post._id);
                        }}
                      >
                        {post.saves.includes(user._id) ? "Remove" : "Save"}
                      </motion.button>
                    )}
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
}
