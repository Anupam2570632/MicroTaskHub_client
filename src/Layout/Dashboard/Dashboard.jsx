import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import DashboardSidebar from "../../Shared/Dashboard/Sidebar";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed md:static z-50
        top-0 left-0
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        <DashboardSidebar />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col w-full">
        
        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center p-4 bg-white shadow">
          <button
            onClick={() => setOpen(true)}
            className="text-xl"
          >
            <FaBars />
          </button>

          <h2 className="ml-4 font-semibold">Dashboard</h2>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 bg-[#20292b]">
          <Outlet />
        </main>

      </div>
    </div>
  );
}