import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider/AuthContext";

const MySubmission = () => {
  const [submissions, setSubmissions] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/submissions?email=${user.email}`)
        .then((res) => {
          setSubmissions(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Submissions</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border text-center">
          <thead>
            <tr className="bg-gray-200">
              <th>Task Title</th>
              <th>Creator</th>
              <th>Payable</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((item) => (
              <tr key={item._id}>
                <td>{item.task_title}</td>
                <td>{item.creator_name}</td>
                <td>${item.payable_amount}</td>
                <td>
                  <span className="badge badge-warning">{item.status}</span>
                </td>
                <td>{new Date(item.current_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {submissions.length === 0 && (
        <p className="text-center mt-4">No submissions found.</p>
      )}
    </div>
  );
};

export default MySubmission;
