import { useState } from "react";
import { motion } from "framer-motion";

export default function NavBar({ page }) {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      {page === "welcome" ? (
        <motion.nav
          initial="hidden"
          whileInView="show"
          media={{ minWidth: 768 }}
          className="w-full flex justify-between px-[5%] py-6"
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
          className="w-full flex justify-center px-[5%] py-6"
        >
          <h1 className="font-bold text-white text-3xl w-[124px] h-[32px] self-center">
            WheelDeal
          </h1>
        </motion.nav>
      )}
    </>
  );
}
