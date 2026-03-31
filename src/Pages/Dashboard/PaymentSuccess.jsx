import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2c393c] px-4">
      <div className="bg-[#1f2a2d] text-[#e9eaea] p-6 rounded-lg text-center w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-green-400 mb-3">
          Payment Successful 🎉
        </h2>

        <p className="mb-5">
          Your coins have been added successfully.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-black/70 px-6 py-2 rounded-md hover:bg-black/50"
        >
          Go to Dashboard
        </button>

      </div>
    </div>
  );
};

export default PaymentSuccess;