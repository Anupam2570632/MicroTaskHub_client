import React, { useState } from "react";
import {
  FaBell,
  FaListCheck,
  FaTrophy,
  FaRobot,
  FaStar,
  FaHouseMedical,
} from "react-icons/fa6";

export default function DashboardSidebar() {
  const [active, setActive] = useState("/dashboard");

  const navItems = [
    { href: "/dashboard", icon: <FaHouseMedical />, label: "Dashboard" },
    {
      href: "/dashboard/tasks",
      icon: <FaListCheck />,
      label: "Available Tasks",
      badge: 5,
    },
    {
      href: "/dashboard/leaderboard",
      icon: <FaTrophy />,
      label: "Leaderboard",
    },
    {
      href: "/dashboard/task-assistant",
      icon: <FaRobot />,
      label: "Task Assistant",
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-full bg-blue-500/30">
      {/* Header */}
      <div className="flex items-center h-[60px] border-b px-4">
        <div className="flex items-center gap-2 font-semibold text-blue-600 text-lg">
          <FaStar className="text-yellow-500 text-xl" />
          TaskSpark
        </div>

        <button
          className="ml-auto h-8 w-8 flex items-center justify-center 
            border rounded-md bg-white shadow-sm hover:bg-gray-100"
        >
          <FaBell className="text-gray-600 text-sm" />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-2">
        <nav className="grid gap-2 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActive(item.href)}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left 
                transition-all
                ${
                  active === item.href
                    ? "bg-gray-200 text-blue-600 font-semibold"
                    : "text-gray-600 hover:text-blue-500"
                }
              `}
            >
              <span className="text-md">{item.icon}</span>
              <span>{item.label}</span>

              {item.badge && (
                <span
                  className="
                  ml-auto bg-blue-600 text-white text-xs 
                  h-6 w-6 rounded-full flex items-center justify-center
                "
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
