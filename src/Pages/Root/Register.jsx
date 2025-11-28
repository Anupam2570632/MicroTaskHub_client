import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaImage, FaEnvelope, FaLock, FaUserTag } from "react-icons/fa";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
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
      } else {
        console.error("Upload failed:", result);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (data) => {
    const finalData = { ...data, profileImage: uploadedImageUrl || "" };
    console.log("Form Data:", finalData);
    alert("Form submitted! Check console for data.");
    reset();
    setPreview(null);
    setUploadedImageUrl(null);
  };

  return (
    <div className="bg-[#20292b] flex items-center justify-center min-h-screen">
      <div className="w-full max-w-3xl bg-[#2b373a] shadow-md rounded-xl p-6 text-white">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-medium flex items-center gap-2">
                <FaUser /> Full Name
              </label>
              <input
                type="text"
                {...register("fullName", { required: "Full name is required" })}
                className="w-full border border-gray-400 rounded-lg p-2 mt-1 bg-[#20292b] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

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
                className="w-full border border-gray-400 rounded-lg p-2 mt-1 bg-[#20292b] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-medium flex items-center gap-2">
                <FaLock /> Password
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full border border-gray-400 rounded-lg p-2 mt-1 bg-[#20292b] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-medium flex items-center gap-2">
                <FaUserTag /> Select Role
              </label>
              <select
                {...register("role", { required: "Role is required" })}
                className="w-full border border-gray-400 rounded-lg p-2 mt-1 bg-[#20292b] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose role</option>
                <option value="Worker">Worker</option>
                <option value="TaskCreator">TaskCreator</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>
          </div>

          {/* Profile Picture */}
          <div className="mt-6">
            <label className="font-medium flex items-center gap-2 mb-2">
              <FaImage /> Profile Picture
            </label>

            <div className="w-40 h-40 border rounded-lg overflow-hidden bg-gray-100 mb-3">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image Selected
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              {...register("profileImage")}
              onChange={handleImageSelect}
              className="w-full border border-gray-400 rounded-lg p-2 bg-[#20292b] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {uploading && (
              <p className="text-sm text-blue-400">Uploading image...</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
