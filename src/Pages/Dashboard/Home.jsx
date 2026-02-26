import React, { useContext } from "react";
import { FaCoins, FaCheckCircle, FaBolt } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider/AuthContext";
import useUsers from "../../hooks/useUsers";
import LoadingPage from "../../Components/Loader/LoadingPage";
import TaskReview from "../../Components/dashboard/Taksreview";

export default function DashboardHome() {
  const { user, loading } = useContext(AuthContext);
  const { serverUser, loading: loadUser } = useUsers(user?.email);

  if (loading || loadUser) return <LoadingPage />;

  const role = serverUser.role;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <div className="bg-white/40 hover:shadow-xl hover:scale-[1.01] duration-200 shadow-md rounded-lg p-4 border">
          <div className="flex items-center justify-between pb-2">
            <p className="text-sm font-medium">Total Earnings</p>
            <FaCoins className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <div className="text-2xl font-bold">
              {serverUser?.coins || 0} Coins
            </div>
            <p className="text-xs text-gray-500">
              Equivalent to ${(serverUser?.coins || 0) * 0.1}
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white/40 hover:shadow-xl hover:scale-[1.01] duration-200 shadow-md rounded-lg p-4 border">
          <div className="flex items-center justify-between pb-2">
            <p className="text-sm font-medium">Tasks Completed</p>
            <FaCheckCircle className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <div className="text-2xl font-bold">+82</div>
            <p className="text-xs text-gray-500">+15% from last month</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white/40 hover:shadow-xl hover:scale-[1.01] duration-200 shadow-md rounded-lg p-4 border">
          <div className="flex items-center justify-between pb-2">
            <p className="text-sm font-medium">Active Tasks</p>
            <FaBolt className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <div className="text-2xl font-bold">+3</div>
            <p className="text-xs text-gray-500">Currently in progress</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6">
        <div className="bg-white/40 hover:shadow-xl hover:scale-[1.01] duration-200 shadow-md rounded-lg p-4 border">
          <div className="mb-2">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <p className="text-sm text-gray-500">
              An overview of your latest task completions and earnings.
            </p>
          </div>
        </div>
      </div>
      <div>{role == "TaskCreator" ? <TaskReview /> : ""}</div>
    </div>
  );
}
