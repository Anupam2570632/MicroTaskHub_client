import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminWithdrawRequests() {
  const [withdrawRequests, setWithdrawRequests] = useState([]);

  useEffect(() => {
    fetchWithdrawRequests();
  }, []);

  const fetchWithdrawRequests = async () => {
    const res = await axios.get(
      "http://localhost:3000/withdraw-requests"
    );
    setWithdrawRequests(res.data);
  };

  const handlePaymentSuccess = async (id) => {
    const confirm = window.confirm(
      "Are you sure payment is completed?"
    );

    if (!confirm) return;

    const res = await axios.patch(
      `http://localhost:3000/withdraw-success/${id}`
    );

    if (res.data.success) {
      alert("Payment Marked as Success!");
      setWithdrawRequests(
        withdrawRequests.filter((item) => item._id !== id)
      );
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Withdraw Requests
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full border text-center">
          <thead>
            <tr className="bg-gray-200">
              <th>Worker Name</th>
              <th>Coins</th>
              <th>Amount ($)</th>
              <th>Payment Number</th>
              <th>Payment System</th>
              <th>Withdraw Time</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {withdrawRequests.map((item) => (
              <tr key={item._id}>
                <td>{item.worker_name}</td>
                <td>{item.withdraw_coin}</td>
                <td>${item.withdraw_amount}</td>
                <td>{item.account_number}</td>
                <td>{item.payment_system}</td>
                <td>
                  {new Date(
                    item.withdraw_time
                  ).toLocaleString()}
                </td>
                <td>
                  <button
                    onClick={() =>
                      handlePaymentSuccess(item._id)
                    }
                    className="btn btn-success btn-sm"
                  >
                    Payment Success
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {withdrawRequests.length === 0 && (
          <p className="text-center mt-4">
            No withdraw requests available.
          </p>
        )}
      </div>
    </div>
  );
}