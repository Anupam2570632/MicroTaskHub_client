import { FaCoins } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaCoins className="h-10 w-10 text-green-500" />,
    title: "Earn Coins by Completing Tasks",
    description:
      "Browse a wide variety of micro-tasks, from data entry to surveys. Complete them in your own time and earn coins instantly.",
  },
  {
    icon: <FaListCheck className="h-10 w-10 text-green-500" />,
    title: "Create and Manage Tasks",
    description:
      "Need help with a project? Post your own tasks for our global community of workers to complete quickly and efficiently.",
  },
  {
    icon: <FaShieldAlt className="h-10 w-10 text-green-500" />,
    title: "Secure Payments",
    description:
      "Our robust payment system ensures that you get paid securely for your work, and requesters only pay for quality results.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#20292b]">
      <div className="md:w-10/12 mx-auto w-full container px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl text-[#e9eaea]">
            Everything You Need to Succeed
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A powerful platform for both earners and businesses.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl p-8 shadow-sm hover:shadow-md transition text-center bg-[#2e3536] hover:scale-[1.01] duration-150 cursor-pointer"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full ">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#acb3b6] ">{feature.title}</h3>

              <p className="mt-2 text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
