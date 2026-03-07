import React, { useContext, useEffect, useState } from "react";
import {
  FaBell,
  FaListCheck,
  FaStar,
  FaHouseMedical,
  FaBook,
  FaMoneyBill,
  FaUser,
  FaDownload,
} from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider/AuthContext";
import useUsers from "../../hooks/useUsers";
import LoadingPage from "../../Components/Loader/LoadingPage";
import { BiMoney } from "react-icons/bi";

export default function DashboardSidebar({ onLinkClick }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const navConfig = {
    Admin: [
      {
        href: "/dashboard/profile",
        icon: <FaUser />,
        label: "Profile",
      },
      {
        href: "/dashboard",
        icon: <FaHouseMedical />,
        label: "Dashboard",
      },
      {
        href: "/dashboard/allTasks",
        icon: <FaListCheck />,
        label: "All Tasks",
      },
      {
        href: "/dashboard/withdrawalRequest",
        icon: <FaMoneyBill />,
        label: "Withdrawal Requests",
      },
    ],

    Worker: [
      {
        href: "/dashboard/profile",
        icon: <FaUser />,
        label: "Profile",
      },
      {
        href: "/dashboard",
        icon: <FaHouseMedical />,
        label: "Dashboard",
      },
      {
        href: "/dashboard/allTasks",
        icon: <FaListCheck />,
        label: "Available Tasks",
        badge: 5,
      },
      {
        href: "/dashboard/mySubmission",
        icon: <FaDownload />,
        label: "My Submission",
      },
      {
        href: "/dashboard/withdrawalMoney",
        icon: <BiMoney />,
        label: "Withdrawal Money",
      },
    ],

    TaskCreator: [
      {
        href: "/dashboard/profile",
        icon: <FaUser />,
        label: "Profile",
      },
      {
        href: "/dashboard",
        icon: <FaHouseMedical />,
        label: "Dashboard",
      },
      {
        href: "/dashboard/addTask",
        icon: <FaBook />,
        label: "Add Task",
      },
      {
        href: "/dashboard/allTasks",
        icon: <FaListCheck />,
        label: "My Tasks",
      },
      {
        href: "/dashboard/withdrawalRequest",
        icon: <FaMoneyBill />,
        label: "Withdraw Earnings",
      },
    ],
  };

  const { serverUser, loading: userLoading, error } = useUsers(user?.email);

  if (loading || userLoading) return <LoadingPage />;
  if (error) return <p>Error loading user.</p>;

  const navItems = navConfig[serverUser?.role] || [];

  return (
    <aside className="flex flex-col w-[250px] h-screen overflow-hidden bg-[#182326] border-r">
      {/* ================= HEADER ================= */}
      <div className="flex items-center h-[60px] border-b px-4">
        <div className="flex items-center gap-2 font-semibold text-[#acb3b6] text-lg">
          <FaStar className="text-gray-500 text-xl" />
          <Link to="/" className="text-[#e9eaea]">MicroTaskHub</Link>
        </div>

        <button
          className="ml-auto h-8 w-8 flex items-center justify-center 
          border rounded-md bg-gray-400 shadow-sm hover:bg-gray-100"
        >
          <FaBell className="text-gray-600 text-sm" />
        </button>
      </div>

      {/* ================= NAVIGATION ================= */}
      <div className="flex-1 py-4 px-2">
        <nav className="grid gap-2 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => {
                setActive(item.href);
                if (onLinkClick) onLinkClick();
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg w-full transition-all
                ${
                  active === item.href
                    ? "bg-[#2b373a] text-[#acb3b6] font-semibold"
                    : "text-[#e9eaea] hover:text-[#e9eaea] hover:bg-[#2c393c]"
                }`}
            >
              <span className="text-md">{item.icon}</span>
              <span>{item.label}</span>

              {item.badge && (
                <span
                  className="ml-auto bg-blue-600 text-white text-xs 
                  h-6 w-6 rounded-full flex items-center justify-center"
                >
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}