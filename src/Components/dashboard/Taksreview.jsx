import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider/AuthContext";

const TaskReview = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/review-requests?email=${user.email}`)
        .then((res) => setReviews(res.data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  const handleUpdateStatus = async (item, newStatus) => {
    await axios.patch(
      `http://localhost:3000/update-submission-status/${item._id}`,
      { status: newStatus },
    );

    // remove from UI after action
    setReviews(reviews.filter((r) => r._id !== item._id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#e9eaea]">Task Review</h2>

      <table className="table w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Worker</th>
            <th>Task</th>
            <th>Payable</th>
            <th>Submission</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className="text-[#e9eaea]">
          {reviews.map((item) => (
            <tr key={item._id}>
              <td>
                {item.worker_name} <br />
                <small>{item.worker_email}</small>
              </td>

              <td>{item.task_title}</td>

              <td>${item.payable_amount}</td>

              <td>
                <button
                  className="btn btn-info btn-sm bg-gray-500 py-1 px-3 cursor-pointer duration-200 m-1 rounded-2xl"
                  onClick={() => setSelectedSubmission(item)}
                >
                  View
                </button>
              </td>

              <td>
                <button
                  className="btn btn-success btn-sm mr-2 bg-green-500 py-1 px-3 cursor-pointer duration-200 m-1 rounded-2xl"
                  onClick={() => handleUpdateStatus(item, "approved")}
                >
                  Approve
                </button>

                <button
                  className="btn btn-error btn-sm bg-red-500 py-1 px-3 cursor-pointer duration-200 m-1 rounded-2xl"
                  onClick={() => handleUpdateStatus(item, "rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-bold mb-2">Submission Details</h3>

            {/* Submission Text */}
            <p className="mb-4">{selectedSubmission.submission_details}</p>

            {/* Screenshot (conditional) */}
            {selectedSubmission.submission_image && (
              <div className="mb-4">
                <h1>Screenshot of task submission</h1>
                <img
                  src={selectedSubmission.submission_image}
                  alt="Submission Screenshot"
                  className="w-full rounded-lg border"
                />
              </div>
            )}

            <button
              className="btn btn-sm mt-2"
              onClick={() => setSelectedSubmission(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskReview;
