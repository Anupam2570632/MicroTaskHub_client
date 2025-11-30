import React, { useState } from "react";
import { FaEnvelope, FaLock, FaMagic } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Data:", { email, password });
    alert("Login Successful! (Check console)");
  };

  return (
    <div className="bg-[#20292b] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#2b373a] shadow-xl rounded-xl p-6 text-white">
        
        {/* Header */}
        <div className="text-center mb-6">
          <FaMagic className="mx-auto h-10 w-10 text-blue-400" />
          <h2 className="text-2xl font-semibold mt-2">Welcome Back</h2>
          <p className="text-sm text-gray-300">
            Enter email & password to log in.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="grid gap-4">
          
          {/* Email */}
          <div className="grid gap-1">
            <label className="text-sm font-medium flex items-center gap-2">
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              required
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-400 rounded-lg p-2 bg-[#20292b] text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="grid gap-1">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium flex items-center gap-2">
                <FaLock /> Password
              </label>

              {/* forgot password - dummy */}
              <Link
                to="#"
                className="text-sm underline text-blue-300 hover:text-blue-400"
              >
                Forgot password?
              </Link>
            </div>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-400 rounded-lg p-2 bg-[#20292b] text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
          >
            Log in
          </button>

          {/* Google disabled */}
          <button
            disabled
            className="w-full bg-gray-600 text-white p-2 rounded-lg opacity-50 cursor-not-allowed"
          >
            Log in with Google
          </button>
        </form>

        {/* Bottom Link */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="underline text-blue-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
