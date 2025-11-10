const Navbar = () => {
  const links = (
    <>
      <li className="py-2 px-3 font-bold hover:bg-white duration-200 ease-in cursor-pointer rounded-sm hover:text-blue-500">Login</li>
      <li className="py-2 px-3 font-bold hover:bg-white duration-200 ease-in cursor-pointer rounded-sm hover:text-blue-500">Register</li>
      <li className="py-2 px-3 font-bold hover:bg-white duration-200 ease-in cursor-pointer rounded-sm hover:text-blue-500">Watch Demo</li>
    </>
  );

  return (
    <div className="bg-blue-500">
      <div className="max-w-[1100px] flex items-center justify-between mx-auto py-3 ">
        <h1 className="text-xl font-bold text-white">MicroTaskHub</h1>
        <ul className="flex gap-6 text-white">{links}</ul>
      </div>
    </div>
  );
};

export default Navbar;
