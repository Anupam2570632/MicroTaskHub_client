import { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCoinsLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleHamburgerClick = () => {
    setIsOpen((prev) => !prev);
  };
  const { user } = useContext(AuthContext);
  console.log(user?.photoURL);

  const links = (
    <>
      {user ? (
        <>
          <li className="py-3 px-4 font-bold hover:bg-[#2b373a] duration-200 ease-in cursor-pointer rounded-sm hover:text-[#acb3b6]">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="flex items-center justify-center gap-2 py-2 px-3">
            <RiCoinsLine className="text-2xl" />
            <div>0</div>
          </li>
          <li className="h-12 w-12 rounded-full border-3 border-transparent hover:border-3 hover:border-white duration-150 ease-in cursor-pointer">
            <img
              className="h-full w-full rounded-full object-cover"
              src={user?.photoURL}
              alt="user.name"
            />
          </li>
          <li className="py-3 px-4 font-bold hover:bg-[#2b373a] duration-200 ease-in cursor-pointer rounded-sm hover:text-[#acb3b6]">
            Log Out
          </li>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="py-3 px-4 font-bold hover:bg-[#2b373a] duration-200 ease-in cursor-pointer rounded-sm hover:text-[#acb3b6]"
          >
            Login
          </Link>
          <li className="py-3 px-4 font-bold hover:bg-[#2b373a] duration-200 ease-in cursor-pointer rounded-sm hover:text-[#acb3b6]">
            <Link to="/register">Register</Link>
          </li>
          <li className="py-3 px-4 font-bold text-nowrap hover:bg-[#2b373a] duration-200 ease-in cursor-pointer rounded-sm hover:text-[#acb3b6]">
            Watch Demo
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#182326] shadow-md text-[#e9eaea]">
      <div className="max-w-[1100px] flex items-center justify-between mx-auto py-2 px-6 relative">
        <h1 className="text-xl font-bold ">MicroTaskHub</h1>

        <div className="md:hidden relative">
          <GiHamburgerMenu
            onClick={handleHamburgerClick}
            className="text-2xl  cursor-pointer"
          />

          <ul
            className={`absolute right-0 p-2 mt-2 bg-blue-500  items-center rounded-md shadow-md flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {links}
          </ul>
        </div>

        <ul className="gap-6  hidden md:flex">{links}</ul>
      </div>
    </div>
  );
};

export default Navbar;
