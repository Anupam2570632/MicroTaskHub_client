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

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  // ✅ NEW STATES (ONLY ADD)
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [requiredCoins, setRequiredCoins] = useState(0);
  const [pendingTask, setPendingTask] = useState(null);

  const navigate = useNavigate();

  const taskQuantity = watch("task_quantity");
  const payableAmount = watch("payable_amount");

  const image_hosting_key = import.meta.env.VITE_API_KEY_IMGBB;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  // ✅ CREATE TASK FUNCTION (NEW)
  const createTask = async (data) => {
    const quantity = Number(data.task_quantity);
    const amount = Number(data.payable_amount);

    const formData = new FormData();
    formData.append("image", data.task_image[0]);

    const imgRes = await axios.post(image_hosting_api, formData);

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

    return axios.post("http://localhost:3000/createTasks", newTask);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const quantity = Number(data.task_quantity);
    const amount = Number(data.payable_amount);
    const totalPayable = quantity * amount;

    // 🔥 FRONTEND CHECK → SHOW MODAL (NO TOAST)
    if (totalPayable > serverUser?.coins) {
      setRequiredCoins(totalPayable - serverUser?.coins);
      setPendingTask(data);
      setShowPaymentModal(true);
      setLoading(false);
      return;
    }

    try {
      await createTask(data);

      toast.success("Task added successfully!");
      reset();
      navigate("/dashboard/allTasks");
    } catch (err) {
      // 🔥 BACKEND CHECK → SHOW MODAL
      if (err.response?.data?.message === "Insufficient coins") {
        setRequiredCoins(totalPayable - serverUser?.coins);
        setPendingTask(data);
        setShowPaymentModal(true);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ AFTER PAYMENT SUCCESS (RETRY)
  const handlePaymentSuccess = async () => {
    setShowPaymentModal(false);

    if (!pendingTask) return;

    try {
      setLoading(true);
      await createTask(pendingTask);

      toast.success("Task added successfully!");
      reset();
      navigate("/dashboard/allTasks");
    } catch {
      toast.error("Failed after payment!");
    } finally {
      setLoading(false);
      setPendingTask(null);
    }
  };

  if (loadUser || loading) return <LoadingPage />;
  if (error) return <p>Error loading user.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Toaster position="top-center" />

      <div className="w-full max-w-6xl bg-[#2c393c] rounded-xl shadow-lg px-6 py-6">
        <h2 className="text-2xl font-bold mb-4 text-[#acb3b6]">Add New Task</h2>

        <div className="mb-4 px-4 py-3 bg-gray-800 text-[#acb3b6] rounded-md flex justify-between text-base">
          <span>Available Balance</span>
          <span className="font-semibold">{serverUser?.coins} Coins</span>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4"
        >
          {/* 🔥 ALL INPUT SAME (UNCHANGED) */}
          <div>
            <label className="block text-sm text-[#e9eaea] font-semibold mb-1">
              Task Title
            </label>
            <input
              {...register("task_title", { required: true })}
              placeholder="e.g. Facebook post engagement"
              className="w-full bg-[#1f2a2d] text-[#e9eaea] px-4 py-2 text-base focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-[#e9eaea] font-semibold mb-1">
              Task Quantity
            </label>
            <input
              type="number"
              {...register("task_quantity", { required: true, min: 1 })}
              placeholder="e.g. 100"
              className="w-full bg-[#1f2a2d] text-[#e9eaea] px-4 py-2 text-base"
            />
          </div>

          <div>
            <label className="block text-sm text-[#e9eaea] font-semibold mb-1">
              Payable Amount (Coins)
            </label>
            <input
              type="number"
              {...register("payable_amount", { required: true })}
              placeholder="e.g. 2"
              className="w-full bg-[#1f2a2d] text-[#e9eaea] px-4 py-2 text-base"
            />
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm text-[#e9eaea] font-semibold mb-1">
              Task Detail
            </label>
            <textarea
              {...register("task_detail", { required: true })}
              placeholder="Describe what users need to do to complete this task"
              rows="2"
              className="w-full bg-[#1f2a2d] text-[#e9eaea] px-4 py-2 text-base resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-[#e9eaea] font-semibold mb-1">
              Completion Date
            </label>
            <input
              type="date"
              {...register("completion_date", { required: true })}
              className="w-full bg-[#1f2a2d] text-[#e9eaea] px-4 py-2 text-base"
            />
          </div>

          <div>
            <label className="block text-sm text-[#e9eaea] font-semibold mb-1">
              Submission Info
            </label>
            <input
              {...register("submission_info", { required: true })}
              placeholder="e.g. Screenshot link or proof"
              className="w-full bg-[#1f2a2d] text-[#e9eaea] px-4 py-2 text-base"
            />
          </div>

          <div>
            <label className="block text-sm text-[#e9eaea] font-semibold mb-1">
              Task Image
            </label>
            <input
              type="file"
              {...register("task_image", { required: true })}
              className="w-full bg-[#1f2a2d] text-[#e9eaea] px-4 py-2 text-base"
            />
          </div>

          {taskQuantity && payableAmount && (
            <div className="lg:col-span-3 text-right text-sm font-semibold text-[#e9eaea]">
              Total Payable: {taskQuantity * payableAmount} Coins
            </div>
          )}

          <div className="lg:col-span-3 flex justify-end mt-2">
            <button
              disabled={loading}
              className="bg-black/70 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-black/20 transition duration-200 disabled:bg-gray-400 w-full sm:w-auto"
            >
              {loading ? "Processing..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>

      {/* ✅ MODAL (SAME STYLE) */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-md bg-[#2c393c] rounded-xl shadow-lg px-6 py-6 text-center">
            <h2 className="text-xl font-bold text-[#acb3b6] mb-3">
              Insufficient Coins
            </h2>

            <p className="text-[#e9eaea] mb-5">
              You need <span className="font-semibold">{requiredCoins}</span>{" "}
              more coins
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="bg-[#1f2a2d] text-[#e9eaea] px-4 py-2 rounded-md"
              >
                Try Again
              </button>

              <button
                onClick={() => navigate("/dashboard/payment")}
                className="bg-black/70 text-white px-4 py-2 rounded-md"
              >
                Buy Coins
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
