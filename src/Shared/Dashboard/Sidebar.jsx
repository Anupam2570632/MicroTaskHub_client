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
import axios from "axios";

export default function DashboardSidebar({ onLinkClick }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  const [openNotification, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/notifications/${user?.email}`
      );

      setNotifications(res.data);

      const unreadExists = res.data.some((n) => !n.isRead);
      setHasUnread(unreadExists);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch on mount
  useEffect(() => {
    if (user?.email) {
      fetchNotifications();
    }
  }, [user?.email]);

  // Bell click
  const handleBellClick = async () => {
    setOpenNotification(true);

    await fetchNotifications();

    try {
      await axios.patch(
        `http://localhost:3000/notifications/mark-all-read/${user?.email}`
      );

      setHasUnread(false);
      console.log("read")

      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    setOpenNotification(false);
  };

  const { serverUser, loading: userLoading, error } = useUsers(user?.email);

  if (loading || userLoading) return <LoadingPage />;
  if (error) return <p>Error loading user.</p>;

  const navConfig = {
    Admin: [
      { href: "/dashboard/profile", icon: <FaUser />, label: "Profile" },
      { href: "/dashboard", icon: <FaHouseMedical />, label: "Dashboard" },
      { href: "/dashboard/allTasks", icon: <FaListCheck />, label: "All Tasks" },
      { href: "/dashboard/withdrawalRequest", icon: <FaMoneyBill />, label: "Withdrawal Requests" },
    ],
    Worker: [
      { href: "/dashboard/profile", icon: <FaUser />, label: "Profile" },
      { href: "/dashboard", icon: <FaHouseMedical />, label: "Dashboard" },
      { href: "/dashboard/allTasks", icon: <FaListCheck />, label: "Available Tasks", badge: 5 },
      { href: "/dashboard/mySubmission", icon: <FaDownload />, label: "My Submission" },
      { href: "/dashboard/withdrawalMoney", icon: <BiMoney />, label: "Withdrawal Money" },
    ],
    TaskCreator: [
      { href: "/dashboard/profile", icon: <FaUser />, label: "Profile" },
      { href: "/dashboard", icon: <FaHouseMedical />, label: "Dashboard" },
      { href: "/dashboard/addTask", icon: <FaBook />, label: "Add Task" },
      { href: "/dashboard/allTasks", icon: <FaListCheck />, label: "My Tasks" },
      { href: "/dashboard/payment", icon: <FaMoneyBill />, label: "Buy Coin" },
    ],
  };

  const navItems = navConfig[serverUser?.role] || [];

  return (
    <>
      <aside className="flex flex-col w-[250px] h-screen overflow-hidden bg-[#182326] border-r">
        {/* HEADER */}
        <div className="flex items-center h-[60px] border-b px-4">
          <div className="flex items-center gap-2 font-semibold text-[#acb3b6] text-lg">
            <FaStar className="text-gray-500 text-xl" />
            <Link to="/" className="text-[#e9eaea]">
              MicroTaskHub
            </Link>
          </div>

          {/* Bell */}
          <button
            onClick={handleBellClick}
            className="ml-auto relative h-8 w-8 flex items-center justify-center 
            border rounded-md bg-gray-400 shadow-sm hover:bg-gray-100"
          >
            <FaBell className="text-gray-600 text-sm" />

            {/* Red dot */}
            {hasUnread && (
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full"></span>
            )}
          </button>
        </div>

        {/* NAV */}
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
                      : "text-[#e9eaea] hover:bg-[#2c393c]"
                  }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* MODAL */}
      {openNotification && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-[#2c393c] w-full max-w-md rounded-lg p-5 shadow-lg max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-4">
              <h2 className="text-white font-semibold">Notifications</h2>
              <button onClick={closeModal} className="text-red-400">✕</button>
            </div>

            {notifications.length === 0 ? (
              <p className="text-gray-400">No notifications</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  className={`p-3 mb-2 rounded ${
                    n.isRead ? "bg-[#1f2a2d]" : "bg-[#3a4a4f]"
                  }`}
                >
                  <p className="font-semibold text-white">{n.type}</p>
                  <p className="text-sm text-gray-300">{n.message}</p>
                  <small className="text-gray-400">
                    {new Date(n.createdAt).toLocaleString()}
                  </small>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}