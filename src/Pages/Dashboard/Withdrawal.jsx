import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider/AuthContext";
import useUsers from "../../hooks/useUsers";

export default function Withdraw() {
  const { user } = useContext(AuthContext);
  const { serverUser } = useUsers(user?.email);

  const coins = serverUser?.coins || 0;
  const maxDollar = Math.floor(coins / 20);

  const [withdrawCoin, setWithdrawCoin] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("Bkash");
  const [accountNumber, setAccountNumber] = useState("");

  const handleCoinChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setWithdrawCoin(value);
    setWithdrawAmount((value / 20).toFixed(2));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (withdrawAmount > maxDollar) {
      alert("Amount exceeds maximum withdraw limit!");
      return;
    }

    const withdrawData = {
      worker_email: user.email,
      worker_name: user.displayName,
      withdraw_coin: withdrawCoin,
      withdraw_amount: Number(withdrawAmount),
      payment_system: paymentSystem,
      account_number: accountNumber,
    };

    const res = await axios.post(
      "http://localhost:3000/withdraw",
      withdrawData
    );

    if (res.data.success) {
      alert("Withdraw Request Sent Successfully!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Withdraw</h2>

      <p className="mb-2">
        <strong>Maximum Withdraw Amount:</strong> $
        {maxDollar}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Coin Input */}
        <div>
          <label>Coin To Withdraw</label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={withdrawCoin}
            onChange={handleCoinChange}
            required
          />
        </div>

        {/* Withdraw Amount */}
        <div>
          <label>Withdraw Amount ($)</label>
          <input
            type="number"
            className="input input-bordered w-full bg-gray-100"
            value={withdrawAmount}
            readOnly
          />
        </div>

        {/* Payment System */}
        <div>
          <label>Select Payment System</label>
          <select
            className="select select-bordered w-full"
            value={paymentSystem}
            onChange={(e) =>
              setPaymentSystem(e.target.value)
            }
          >
            <option>Bkash</option>
            <option>Rocket</option>
            <option>Nagad</option>
          </select>
        </div>

        {/* Account Number */}
        <div>
          <label>Account Number</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={accountNumber}
            onChange={(e) =>
              setAccountNumber(e.target.value)
            }
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          Withdraw
        </button>
      </form>
    </div>
  );
}