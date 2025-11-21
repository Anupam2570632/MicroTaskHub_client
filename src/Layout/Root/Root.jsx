import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/NavBar/Navbar";
import Footer from "../../Shared/Footer/Footer";
import FeaturesSection from "../../Components/home/FeaturedSection";

const Root = () => {
  return (
    <div>
      <Navbar />
      <FeaturesSection />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
