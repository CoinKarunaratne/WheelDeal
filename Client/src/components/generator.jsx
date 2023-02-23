import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";

export default function Generator() {
  return (
    <motion.div
      whileInView={{ y: 0 }}
      initial={isMobile ? { y: 0 } : { y: "100%" }}
      transition={{ duration: 0.8 }}
      className="flex flex-col sm:flex-row py-[50px] sm:px-10 text-white w-[80%] mt-[-100px] left-[10%] rounded-3xl bg-gradient-to-r from-[#000000] to-[#c309ba] absolute z-20"
    >
      <div className="basis-1/3 mr-10">
        {" "}
        <h1 className="text-3xl text-right font-bold mb-5">Total Sales</h1>
        <p className="text-right text-2xl">
          {Math.floor(Math.random() * 10000)}
        </p>
      </div>
      <div className="bg-white h-[2px] w-[80%] sm:w-[2px] sm:h-[100px] self-end mr-0 my-5 sm:my-0"></div>
      <div className="basis-1/3 pr-10">
        {" "}
        <h1 className="text-3xl text-right font-bold mb-5">Total Users</h1>
        <p className="text-right text-2xl">
          {Math.floor(Math.random() * 10000)}
        </p>
      </div>
      <div className="bg-white h-[2px] w-[80%] sm:w-[2px] sm:h-[100px] self-end mr-0 my-5 sm:my-0"></div>
      <div className="basis-1/3 pr-10">
        {" "}
        <h1 className="text-3xl text-right font-bold mb-5">Today's Count</h1>
        <p className="text-right text-2xl">
          {Math.floor(Math.random() * 1000)}
        </p>
      </div>
    </motion.div>
  );
}
