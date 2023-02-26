import { useState } from "react";
import { motion } from "framer-motion";
import { setLogout } from "../state/index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function NavBar({ page }) {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <>
      {page === "welcome" ? (
        <motion.nav
          initial="hidden"
          whileInView="show"
          media={{ minWidth: 768 }}
          className="w-auto flex justify-between px-[5%] py-6"
        >
          <h1 className="font-bold text-white text-3xl w-[124px] h-[32px]">
            WheelDeal
          </h1>
          <ul className="list-none sm:flex hidden justify-center gap-[50px] items-center">
            <motion.li
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.9 }}
              className="font-normal cursor-pointer text-[16px] text-white mr-10"
            >
              <a
                href="#home"
                className="text-white font-semibold text-lg m-2 text-center"
              >
                Home
              </a>
            </motion.li>
            <motion.li
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.9 }}
              className="font-normal cursor-pointer text-[16px] text-white mr-10"
            >
              <a
                href="#whyUs"
                className="text-white font-semibold text-lg m-2 text-center"
              >
                Why Us?
              </a>
            </motion.li>
            <motion.li
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.9 }}
              className="font-normal cursor-pointer text-[16px] text-white mr-10"
            >
              <a
                href="#footer"
                className="text-white font-semibold text-lg m-2 text-center"
              >
                Contact Us
              </a>
            </motion.li>
          </ul>
          <div className="sm:hidden flex flex-1 justify-end items-center">
            <motion.img
              whileTap={{ scale: 0.7 }}
              src="/menu.svg"
              className="cursor-pointer"
              onClick={() => setToggle((prev) => !prev)}
            />
            <motion.div
              initial="hidden"
              whileInView="show"
              id="glass"
              className={`${
                toggle ? "flex" : "hidden"
              } p-6 pb-0 absolute top-20 right-0 mx-4 min-w-[140px]`}
            >
              <ul className="list-none flex flex-col justify-end items-center flex-1">
                <motion.li
                  whileTap={{ scale: 0.9 }}
                  className="font-normal cursor-pointer text-[16px] text-white mb-10"
                >
                  <a
                    href="#home"
                    className="text-white font-semibold text-lg m-2 text-center"
                  >
                    Home
                  </a>
                </motion.li>
                <div className="bg-white w-[50%] h-[1px] mb-7"></div>
                <motion.li
                  whileTap={{ scale: 0.9 }}
                  className="font-normal cursor-pointer text-[16px] text-white mb-10"
                >
                  <a
                    href="#whyUs"
                    className="text-white font-semibold text-lg m-2 text-center"
                  >
                    Why Us?
                  </a>
                </motion.li>
                <div className="bg-white w-[50%] h-[1px] mb-7"></div>
                <motion.li
                  whileTap={{ scale: 0.9 }}
                  className="font-normal cursor-pointer text-[16px] text-white mb-10"
                >
                  <a
                    href="#footer"
                    className="text-white font-semibold text-lg m-2 text-center"
                  >
                    Contact Us
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          </div>{" "}
        </motion.nav>
      ) : (
        <motion.nav
          initial="hidden"
          whileInView="show"
          media={{ minWidth: 768 }}
          className="w-full flex justify-between px-[5%] py-6 h-[90px]"
        >
          <h1 className="font-bold text-white text-3xl w-[124px] h-[32px] self-center">
            WheelDeal
          </h1>

          <div className="h-full hidden sm:flex flex-row gap-4">
            <div className="rounded-full h-[50px] w-[50px] mt-[-5px]">
              <img
                className="rounded-full object-cover h-full w-full"
                src={`${import.meta.env.VITE_BASE_URL}/assets/${
                  user.picturePath
                }`}
                alt="profile-picture"
              />
            </div>
            <div className="text-white pt-2 font-medium">
              {user.firstName + " " + user.lastName}
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="text-lg bg-green-600 font-bold text-white rounded-lg px-5"
              onClick={() => {
                dispatch(setLogout());
                navigate("/");
              }}
            >
              Logout
            </motion.button>
          </div>
          <div className="sm:hidden flex flex-1 justify-end items-center">
            <motion.img
              whileTap={{ scale: 0.7 }}
              src="/menu.svg"
              className="cursor-pointer"
              onClick={() => setToggle((prev) => !prev)}
            />
            <motion.div
              initial="hidden"
              whileInView="show"
              id="glass"
              className={`${
                toggle ? "flex" : "hidden"
              } p-6 absolute top-20 right-0 mx-4 min-w-[140px] z-10`}
            >
              <ul className="list-none flex flex-col justify-end items-center flex-1">
                <motion.li
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    navigate("/newsfeed/mobile");
                  }}
                  className="font-medium cursor-pointer text-[16px] text-white mb-5"
                >
                  Homepage
                </motion.li>
                <div className="bg-white w-[80%] h-[1px] mb-7"></div>
                <motion.li
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    navigate("/collection/mobile");
                  }}
                  className="font-medium cursor-pointer text-[16px] text-white mb-5"
                >
                  Saved Posts
                </motion.li>
                <div className="bg-white w-[80%] h-[1px] mb-7"></div>
                <motion.li
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    navigate(`/profile/${user._id}`);
                  }}
                  className="font-normal cursor-pointer text-[16px] text-white mb-5 flex flex-col gap-4"
                >
                  <div className="rounded-full h-[50px] w-[50px] self-center">
                    <img
                      className="rounded-full object-cover h-full w-full"
                      src={`${import.meta.env.VITE_BASE_URL}/assets/${
                        user.picturePath
                      }`}
                      alt="profile-picture"
                    />
                  </div>
                  <div className="text-white font-medium">
                    {user.firstName + " " + user.lastName}
                  </div>
                </motion.li>
                <div className="bg-white w-[80%] h-[1px] mb-7"></div>
                <li className="font-normal cursor-pointer text-[16px] text-white">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="text-lg bg-green-600 font-bold text-white rounded-lg px-5 py-1"
                    onClick={() => {
                      dispatch(setLogout());
                      navigate("/");
                    }}
                  >
                    Logout
                  </motion.button>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.nav>
      )}
    </>
  );
}
