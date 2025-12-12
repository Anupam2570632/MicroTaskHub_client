import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaImage, FaEnvelope, FaLock, FaUserTag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

export default function RegisterForm() {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [preview, setPreview] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setPreview(null);
      return;
    }

    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_API_KEY_IMGBB
        }`,
        { method: "POST", body: formData }
      );

      const result = await response.json();
      if (result.success) {
        setUploadedImageUrl(result.data.url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };
  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating your account...");

    try {
      await createUser(
        data.email,
        data.password,
        data.fullName,
        uploadedImageUrl
      );

      // Prepare final user data WITHOUT PASSWORD
      const finalData = {
        fullName: data.fullName,
        email: data.email,
        role: data.role,
        profileImage: uploadedImageUrl || "",
      };

      // Save user in your backend
      await axios.post("http://localhost:3000/register", finalData);

      toast.success("Account created successfully!", { id: toastId });

      reset();
      setPreview(null);
      setUploadedImageUrl(null);

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong!",
        { id: toastId }
      );
    }
  };

  return (
    <div className="bg-[#20292b] flex items-center justify-center min-h-screen">
      <div className="w-full max-w-3xl bg-[#2b373a] shadow-md rounded-xl p-6 text-white">
        {/* Header */}
        <h2 className="text-xl font-semibold mb-1 text-center">
          Create an Account
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Enter the required information to complete your registration.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="font-medium flex items-center gap-2">
                <FaUser /> Full Name
              </label>
              <input
                type="text"
                {...register("fullName", { required: "Full name is required" })}
                className="w-full border border-gray-400 rounded-lg p-2 mt-1 bg-[#20292b] text-white"
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="font-medium flex items-center gap-2">
                <FaEnvelope /> Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
                })}
                className="w-full border border-gray-400 rounded-lg p-2 mt-1 bg-[#20292b] text-white"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="font-medium flex items-center gap-2">
                <FaLock /> Password
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full border border-gray-400 rounded-lg p-2 mt-1 bg-[#20292b] text-white"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="font-medium flex items-center gap-2">
                <FaUserTag /> Select Role
              </label>
              <select
                {...register("role", { required: "Role is required" })}
                className="w-full border border-gray-400 rounded-lg p-2 mt-1 bg-[#20292b] text-white"
              >
                <option value="">Choose role</option>
                <option value="Worker">Worker</option>
                <option value="TaskCreator">TaskCreator</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </div>
          </div>

          {/* Profile Image */}
          <div className="mt-6">
            <label className="font-medium flex items-center gap-2 mb-2">
              <FaImage /> Profile Picture
            </label>

            <div className="w-40 h-40 border rounded-md overflow-hidden bg-gray-200 mb-3">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image Selected
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              {...register("profileImage")}
              onChange={handleImageSelect}
              className="w-full border border-gray-400 rounded-lg p-2 bg-[#20292b] text-white"
            />

            {uploading && (
              <p className="text-blue-400 text-sm mt-1">Uploading image...</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
          >
            Create Account
          </button>
        </form>

        {/* Google Login */}
        <div className="mt-4">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white text-black p-2 rounded-lg hover:bg-gray-200 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm mt-4 text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
