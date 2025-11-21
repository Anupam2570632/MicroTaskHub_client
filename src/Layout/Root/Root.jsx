import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/NavBar/Navbar";
import Footer from "../../Shared/Footer/Footer";
import FeaturesSection from "../../Components/home/FeaturedSection";
import HeroSection from "../../Components/home/HeroSection";
import HowItWorksSection from "../../Components/home/HowToStart";

const Root = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />

      <FeaturesSection />
      <HowItWorksSection />

      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
