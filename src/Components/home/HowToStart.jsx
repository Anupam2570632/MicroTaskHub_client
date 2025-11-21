import { FaUserPlus, FaCheckCircle, FaAward } from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus className="h-12 w-12 text-blue-600" />,
    title: "1. Register",
    description:
      "Create your free account in minutes and set up your profile to get started.",
  },
  {
    icon: <FaCheckCircle className="h-12 w-12 text-blue-600" />,
    title: "2. Complete Tasks",
    description:
      "Browse available tasks, choose the ones that suit you, and submit your work.",
  },
  {
    icon: <FaAward className="h-12 w-12 text-blue-600" />,
    title: "3. Earn Rewards",
    description:
      "Once your work is approved, you receive coins that you can redeem for rewards.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-[#7ae6ac3a] py-16 sm:py-24">
      <div className="md:w-10/12 w-full container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get Started in 3 Easy Steps
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Joining TaskSpark is simple and straightforward.
          </p>
        </div>

        <div className="relative mt-12">
          {/* Vertical Line in the middle */}
          <div
            className="absolute left-1/2 top-8 hidden h-full w-px -translate-x-1/2 bg-gray-300 md:block"
            aria-hidden="true"
          />

          {/* Steps Grid */}
          <div className="grid gap-12 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-md">
                  {step.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
