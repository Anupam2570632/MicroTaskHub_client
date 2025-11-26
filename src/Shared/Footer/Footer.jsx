import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="backdrop-blur-md bg-[#182326] shadow-md pt-10 text-[#acb3b6]">
      <div className="mx-4 md:mx-10">
        <div className="md:flex items-center justify-between pb-6 space-y-6">
          <div className=" flex-1 space-y-4">
            <h1>Micro-Task and Earning Platform</h1>
            <button className="px-6 py-2 text-white bg-[#2b373a] rounded-full font-bold cursor-pointer hover:bg-[#4d5f63] duration-200 ease-in">
              Register
            </button>
          </div>
          <div className="flex gap-4 flex-1 flex-col">
            <div className="flex items-center gap-4">
              <h1>Follow Us :</h1>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-xl font-bold cursor-pointer" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGoogle className="text-xl font-bold cursor-pointer" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-xl font-bold cursor-pointer" />
              </a>
            </div>
            <div className="flex-wrap md:flex gap-4">
              <h2>Contact Us : </h2>
              <div>
                <h1>Dhaka, Bangladesh</h1>
                <h1>5300</h1>
              </div>
              <div>fuu@gmail.com</div>
              <div>+12345678</div>
            </div>
          </div>
        </div>
        <hr />
        <div className="text-center py-4">
          @ all rights reserved MicroTaskHub, 2025
        </div>
      </div>
    </div>
  );
};

export default Footer;
