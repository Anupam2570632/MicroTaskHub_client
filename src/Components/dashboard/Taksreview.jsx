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
      <h2 className="text-2xl font-bold mb-4">Task Review</h2>

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

        <tbody>
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
                  className="btn btn-info btn-sm"
                  onClick={() => setSelectedSubmission(item)}
                >
                  View
                </button>
              </td>

              <td>
                <button
                  className="btn btn-success btn-sm mr-2"
                  onClick={() => handleUpdateStatus(item, "approved")}
                >
                  Approve
                </button>

                <button
                  className="btn btn-error btn-sm"
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

            <p>{selectedSubmission.submission_details}</p>

            <button
              className="btn btn-sm mt-4"
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
