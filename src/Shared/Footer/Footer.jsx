import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-blue-500 pt-10 text-white">
      <div className="mx-10">
        <div className="flex items-center justify-between pb-6">
          <div className=" flex-1 space-y-4">
            <h1>Micro-Task and Earning Platform</h1>
            <button className="px-6 py-2 text-blue-500 bg-white rounded-full font-bold hover:bg-gray-300 duration-300 ease-in">
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
            <div className="flex gap-4">
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
