import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUsers from "../../hooks/useUsers";
import { AuthContext } from "../../Provider/AuthProvider/AuthContext";
import LoadingPage from "../../Components/Loader/LoadingPage";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  const { serverUser, loading: loadUser, error } = useUsers(user?.email);

  console.log(serverUser);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const taskQuantity = watch("task_quantity");
  const payableAmount = watch("payable_amount");

  const image_hosting_key = import.meta.env.VITE_API_KEY_IMGBB;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    setLoading(true);

    const quantity = Number(data.task_quantity);
    const amount = Number(data.payable_amount);
    const totalPayable = quantity * amount;

    if (totalPayable > serverUser[0]?.coins) {
      toast.error("Not enough coins. Purchase coins.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", data.task_image[0]);

      const imgRes = await axios.post(image_hosting_api, formData);

      if (imgRes.data.success) {
        const task_image_url = imgRes.data.data.display_url;

        const newTask = {
          task_title: data.task_title,
          task_detail: data.task_detail,
          task_quantity: quantity,
          payable_amount: amount,
          completion_date: data.completion_date,
          submission_info: data.submission_info,
          task_image_url,
          creator_email: user.email,
          creator_name: user.displayName,
          created_at: new Date().toISOString(),
        };

        await axios.post("http://localhost:3000/createTasks", newTask);

        toast.success("Task added successfully!");
        reset();
        navigate("/dashboard/allTasks");
      }
    } catch (err) {
      toast.error("Something went wrong!", err);
    } finally {
      setLoading(false);
    }
  };

  if (loadUser || loading) return <LoadingPage />;
  if (error) return <p>Error loading user.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Toaster position="top-center" />

      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg px-6 py-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Task</h2>

        <div className="mb-4 px-4 py-3 bg-blue-50 text-blue-700 rounded-md flex justify-between text-base">
          <span>Available Balance</span>
          <span className="font-semibold">{serverUser[0]?.coins} Coins</span>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4"
        >
          {/* Task Title */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Task Title
            </label>
            <input
              {...register("task_title", { required: true })}
              placeholder="e.g. Facebook post engagement"
              className="w-full px-4 py-2 border rounded-md text-base focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Task Quantity */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Task Quantity
            </label>
            <input
              type="number"
              {...register("task_quantity", { required: true, min: 1 })}
              placeholder="e.g. 100"
              className="w-full px-4 py-2 border rounded-md text-base"
            />
          </div>

          {/* Payable Amount */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Payable Amount (Coins)
            </label>
            <input
              type="number"
              {...register("payable_amount", { required: true })}
              placeholder="e.g. 2"
              className="w-full px-4 py-2 border rounded-md text-base"
            />
          </div>

          {/* Task Detail */}
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-semibold mb-1">
              Task Detail
            </label>
            <textarea
              {...register("task_detail", { required: true })}
              placeholder="Describe what users need to do to complete this task"
              rows="2"
              className="w-full px-4 py-2 border rounded-md text-base resize-none"
            />
          </div>

          {/* Completion Date */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Completion Date
            </label>
            <input
              type="date"
              {...register("completion_date", { required: true })}
              className="w-full px-4 py-2 border rounded-md text-base"
            />
          </div>

          {/* Submission Info */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Submission Info
            </label>
            <input
              {...register("submission_info", { required: true })}
              placeholder="e.g. Screenshot link or proof"
              className="w-full px-4 py-2 border rounded-md text-base"
            />
          </div>

          {/* Task Image */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Task Image
            </label>
            <input
              type="file"
              {...register("task_image", { required: true })}
              className="text-base bg-gray-100 p-2 rounded-sm"
            />
          </div>

          {/* Total Payable */}
          {taskQuantity && payableAmount && (
            <div className="lg:col-span-3 text-right text-sm font-semibold text-gray-600">
              Total Payable: {taskQuantity * payableAmount} Coins
            </div>
          )}

          {/* Submit Button */}
          <div className="lg:col-span-3 flex justify-end mt-2">
            <button
              disabled={loading}
              className="
      bg-blue-600 text-white
      px-6 py-2
      rounded-md
      text-sm font-semibold
      hover:bg-blue-700
      transition
      disabled:bg-gray-400

      w-full
      sm:w-auto
    "
            >
              {loading ? "Processing..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
