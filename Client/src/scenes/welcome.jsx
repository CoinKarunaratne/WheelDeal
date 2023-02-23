import Navbar from "../components/navbar";
import Hero from "../components/hero";
import WhyUs from "../components/whyUs";
import Reviews from "../components/reviews";
import Generator from "../components/generator";
import Footer from "../components/footer";

function Welcome() {
  return (
    <div className="bg-[#1A232E] overflow-hidden app">
      <Navbar page="welcome" />
      <Hero />
      <WhyUs />
      <Reviews />
      <Generator />
      <Footer />
    </div>
  );
}

export default Welcome;
