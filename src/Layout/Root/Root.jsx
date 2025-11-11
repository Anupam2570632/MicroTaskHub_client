import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/NavBar/Navbar";
import Footer from "../../Shared/Footer/Footer";

const Root = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
