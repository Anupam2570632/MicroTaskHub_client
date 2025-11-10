import { RiCoinsLine } from "react-icons/ri";

const Navbar = () => {
  const user = true;
  const links = (
    <>
      {user ? (
        <>
          <li className="py-2 px-3 font-bold hover:bg-white duration-200 ease-in cursor-pointer rounded-sm hover:text-blue-500">
            Dashboard
          </li>
          <li className="flex items-center justify-center gap-2">
            <RiCoinsLine className="text-2xl" />
            <div>0</div>
          </li>
          <li className="rounded-full border-3 border-transparent hover:border-3 hover:border-white duration-150 ease-in cursor-pointer">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974"
              alt=""
            />
          </li>
          <li className="py-2 px-3 font-bold hover:bg-white duration-200 ease-in cursor-pointer rounded-sm hover:text-blue-500">
            Log Out
          </li>
        </>
      ) : (
        <>
          <li className="py-2 px-3 font-bold hover:bg-white duration-200 ease-in cursor-pointer rounded-sm hover:text-blue-500">
            Login
          </li>
          <li className="py-2 px-3 font-bold hover:bg-white duration-200 ease-in cursor-pointer rounded-sm hover:text-blue-500">
            Register
          </li>
          <li className="py-2 px-3 font-bold hover:bg-white duration-200 ease-in cursor-pointer rounded-sm hover:text-blue-500">
            Watch Demo
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-blue-500">
      <div className="max-w-[1100px] flex items-center justify-between mx-auto py-2">
        <h1 className="text-xl font-bold text-white">MicroTaskHub</h1>
        <ul className="flex gap-6 text-white">{links}</ul>
      </div>
    </div>
  );
};

export default Navbar;
