import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AvailableTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/getTasks");
        // Filter tasks with quantity > 0
        const availableTasks = res.data.filter(
          (task) => task.task_quantity > 0
        );
        setTasks(availableTasks);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Toaster position="top-center" />
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Available Tasks
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="relative h-90 w-70 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:scale-102 duration-200 transform transition"
              // onClick={() => navigate(`/task-details/${task._id}`)}
            >
              {/* Task Image */}
              <img
                src={task.task_image_url}
                alt={task.task_title}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent"></div>

              {/* Text + Badges + Button */}
              <div className="absolute bottom-4 left-4 right-4 text-white p-2">
                <h3 className="text-lg font-bold mb-1">{task.task_title}</h3>
                <p className="text-sm mb-2 text-gray-300 line-clamp-2">
                  {task.task_detail}
                </p>

                <div className="flex gap-4 items-center mb-2 text-xs">
                  <span className="bg-gray-600 px-4 py-2 rounded">
                    {task.payable_amount} Coins
                  </span>
                  <span className="bg-gray-600 px-4 py-2 rounded">
                    Qty: {task.task_quantity}
                  </span>
                </div>

                {/* Smaller Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent parent click
                    navigate(`/task-details/${task._id}`);
                  }}
                  className="w-full bg-white text-black text-sm font-semibold py-2 rounded hover:bg-gray-200 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableTask;
