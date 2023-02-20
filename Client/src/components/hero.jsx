import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section id="home" className="flex flex-col sm:flex-row p-11 pt-[80px]">
      <div className="sm:w-1/2 text-left h-full px-10 lg:pt-[50px]">
        <h1 className="text-4xl lg:text-5xl font-bold my-10 text-white">
          Join the WheelDeal Community <br /> for a Smarter Car Trading
          Experience
        </h1>
        <p className="text-lg lg:text-xl font-light mb-10 w-[70%] text-white">
          Whether you're looking to sell your car, truck, or motorcycle, our
          vehicle marketplace has got you covered. With a large community of
          buyers and sellers, you're sure to find the perfect match for your
          vehicle. Post your listing today and start receiving offers!
        </p>

        <button onClick={() => navigate("/register")} id="registerBtn">
          <span className="text-md font-bold">Get Started</span>
        </button>
      </div>
      <div className="sm:w-1/2 flex h-full pt-10">
        <div className="">
          <img
            src="/landing.png"
            className="rounded-lg shadow-xl shadow-black object-contain w-full "
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
