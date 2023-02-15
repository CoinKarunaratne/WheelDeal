import { motion } from "framer-motion";

export default function whyUs() {
  return (
    <section id="whyUs" className="flex flex-col py-10 text-center">
      <h1 className="font-bold mt-10 mb-[80px] text-4xl text-white">
        Why Choose WheelDeal?
      </h1>
      <div className="flex flex-col md:flex-row px-[8%] gap-7">
        <motion.div
          whileInView={{ scale: 1 }}
          initial={{ scale: 0 }}
          transition={{ duration: 0.5 }}
          id="whiteGlass"
          className="basis-1/3 p-10 rounded-lg"
        >
          <div className="w-full">
            <h1 className=" text-white text-xl mb-10 text-center font-bold">
              Simplifying the Car Trading Process
            </h1>
            <p className=" text-white text-lg text-left">
              At Wheeldeal, we've designed our platform to make the process of
              buying or selling a car as simple and stress-free as possible.
              With our user-friendly interface and streamlined process, you can
              search for your dream car, compare vehicles, and post your car for
              sale with ease.
            </p>
          </div>
        </motion.div>
        <motion.div
          whileInView={{ scale: 1 }}
          initial={{ scale: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          id="whiteGlass"
          className="basis-1/3 p-10 rounded-lg"
        >
          <div className="w-full">
            <h1 className=" text-white mb-10 text-xl text-center font-bold">
              User-Friendly Interface for an Effortless Experience
            </h1>
            <p className="text-lg text-white text-left">
              We know that buying or selling a car can be a complex process,
              which is why we've made Wheeldeal as user-friendly as possible.
              With easy-to-use filters, comparison tools, and the ability to
              schedule test drives, you'll be able to find the right car for you
              in no time. Whether you're a first-time buyer or a seasoned
              seller, Wheeldeal has everything you need to make the process
              effortless and enjoyable.
            </p>
          </div>
        </motion.div>
        <motion.div
          whileInView={{ scale: 1 }}
          initial={{ scale: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          id="whiteGlass"
          className="basis-1/3 p-10 rounded-lg"
        >
          <div className="w-full">
            <h1 className=" text-white mb-10 text-xl text-center font-bold">
              Connecting Buyers and Sellers Safely
            </h1>
            <p className="text-lg text-white text-left">
              At Wheeldeal, we believe that safety should always be a top
              priority. That's why we've taken steps to ensure that all
              transactions on our platform are secure and that our users'
              personal information is always protected. Whether you're buying or
              selling a car, you can have peace of mind knowing that Wheeldeal
              has got you covered.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
