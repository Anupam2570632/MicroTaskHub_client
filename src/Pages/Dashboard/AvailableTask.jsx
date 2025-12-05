import React from "react";

// Example tasks data
const tasks = [
  {
    id: 1,
    title: "Watch a YouTube Video",
    description: "Watch the provided video completely.",
    status: "Open",
    reward: 20,
  },
  {
    id: 2,
    title: "Write a Review",
    description: "Write a detailed review on the product.",
    status: "Pending",
    reward: 30,
  },
  {
    id: "TSK-001",
    title: "Data Entry for Invoices",
    description: "Transcribe data from 20 scanned invoices into a spreadsheet.",
    reward: 150,
    status: "Open",
  },
  {
    id: "TSK-002",
    title: "Image Tagging: Urban Scenes",
    description:
      "Tag objects (cars, pedestrians, buildings) in 50 images of city streets.",
    reward: 200,
    status: "Open",
  },
  {
    id: "TSK-003",
    title: "Short Product Review",
    description: "Write a 100-word review for a new tech gadget.",
    reward: 75,
    status: "In Progress",
  },
  {
    id: "TSK-004",
    title: "Customer Feedback Survey",
    description:
      "Complete a 15-minute survey about your online shopping experience.",
    reward: 120,
    status: "Open",
  },
  {
    id: "TSK-005",
    title: "Audio Transcription (5 mins)",
    description: "Transcribe a 5-minute audio clip of a clear speaker.",
    reward: 250,
    status: "Open",
  },
];

export default function TasksPage() {
  return (
    <div className="w-full mx-auto p-4 rounded-lg border border-blue-500">
      {/* Card */}
      <div className=" rounded-xl p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Available Tasks</h2>
          <p className="text-gray-600">
            Choose a task to complete and earn coins.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Task</th>
                <th className="p-3 hidden md:table-cell">Description</th>
                <th className="p-3 hidden md:table-cell">Status</th>
                <th className="p-3 text-right">Reward</th>
                <th className="p-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b border-gray-400">
                  {/* Task Title */}
                  <td className="p-3">
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-gray-500 md:hidden">
                      {task.description}
                    </div>
                  </td>

                  {/* Description (Desktop Only) */}
                  <td className="p-3 hidden md:table-cell">
                    {task.description}
                  </td>

                  {/* Status */}
                  <td className="p-3 hidden md:table-cell">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        task.status === "Open"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>

                  {/* Reward */}
                  <td className="p-3 text-right font-semibold">
                    {task.reward} Coins
                  </td>

                  {/* Button */}
                  <td className="p-3 text-right">
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                      Start Task
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
