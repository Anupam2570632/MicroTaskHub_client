import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider/AuthContext";

const PaymentForm = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    coins: 100,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    try {
      const amount = formData.coins * 1;
      const res = await axios.post("http://localhost:3000/create-payment", {
        email: user.email,
        amount,
        coins: formData.coins,
        cus_name: formData.name,
        cus_phone: formData.phone,
        cus_add1: formData.address,
        cus_city: formData.city,
      });

      console.log(res.data);

      if (res.data?.GatewayPageURL) {
        window.location.href = res.data.GatewayPageURL;
      } else {
        console.error("No Gateway URL received");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2c393c] px-4">
      <div className="w-full max-w-md bg-[#1f2a2d] rounded-lg p-6 text-[#e9eaea]">
        <h2 className="text-xl font-bold mb-4">Buy Coins</h2>

        {/* Name */}
        <div className="mb-3">
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black text-white"
            placeholder="Enter your name"
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="block text-sm mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black text-white"
            placeholder="01XXXXXXXXX"
          />
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="block text-sm mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black text-white"
            placeholder="Your address"
          />
        </div>

        {/* City */}
        <div className="mb-3">
          <label className="block text-sm mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black text-white"
            placeholder="Dhaka"
          />
        </div>

        {/* Coins */}
        <div className="mb-3">
          <label className="block text-sm mb-1">Coins</label>
          <input
            type="number"
            name="coins"
            value={formData.coins}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black text-white"
            min="1"
          />
        </div>

        <p className="mb-4">Total: {formData.coins} BDT</p>

        <button
          onClick={handlePayment}
          className="w-full bg-black/70 py-2 rounded-md hover:bg-black/50"
        >
          Pay with SSLCommerz
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
