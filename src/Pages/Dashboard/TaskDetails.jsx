import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider/AuthContext";

const TaskDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [task, setTask] = useState({});
  const [submissionDetails, setSubmissionDetails] = useState("");

  // Fetch Task Details
  useEffect(() => {
    axios
      .get(`http://localhost:3000/tasks/${id}`)
      .then((res) => setTask(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      task_id: task._id,
      task_title: task.task_title,
      task_detail: task.task_detail,
      task_img_url: task.task_image_url,
      payable_amount: task.payable_amount,
      worker_email: user?.email,
      worker_name: user?.displayName,
      submission_details: submissionDetails,
      creator_name: task.creator_name,
      creator_email: task.creator_email,
      current_date: new Date(),
      status: "pending",
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/submissions",
        submissionData
      );

      if (res.data.insertedId) {
        alert("Submission Successful ✅");
        setSubmissionDetails("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Task Details</h2>

      {/* Task Info Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <img
          src={task.task_image_url}
          alt="Task"
          className="w-full h-60 object-cover rounded-lg mb-4"
        />

        <h3 className="text-2xl font-semibold">{task.task_title}</h3>

        <p className="mt-2 text-gray-600">{task.task_detail}</p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <p><strong>Creator:</strong> {task.creator_name}</p>
          <p><strong>Creator Email:</strong> {task.creator_email}</p>
          <p><strong>Completion Date:</strong> {task.completion_date}</p>
          <p><strong>Payable Amount:</strong> ${task.payable_amount}</p>
          <p><strong>Task Quantity:</strong> {task.task_quantity}</p>
          <p><strong>Status:</strong> {task.status}</p>
        </div>
      </div>

      {/* Submission Form */}
      <div className="bg-gray-100 shadow-md rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Submit Your Work</h3>

        <form onSubmit={handleSubmit}>
          <textarea
            name="submission_details"
            required
            value={submissionDetails}
            onChange={(e) => setSubmissionDetails(e.target.value)}
            placeholder="Enter your submission details (screenshot link, username etc)"
            className="w-full p-3 border rounded-lg mb-4 h-32"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Submit Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskDetails;