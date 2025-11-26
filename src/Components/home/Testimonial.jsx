import React from "react";

const testimonials = [
  {
    quote:
      "ApexCloud's infrastructure has been a game-changer for our business. The performance and reliability are second to none, allowing us to scale effortlessly during peak demand.",
    name: "Sarah Johnson",
    title: "CTO, Innovate Inc.",
    logo: {
      imageUrl: "/person-1.avif",
      description: "Customer Logo 1",
    },
  },
  {
    quote:
      "Migrating to ApexCloud was seamless. Their support team is exceptional, and the platform's security features give us complete peace of mind. We couldn't be happier.",
    name: "Michael Chen",
    title: "Head of Engineering, QuantumLeap",
    logo: {
      imageUrl: "/person-1.avif",
      description: "Customer Logo 2",
    },
  },
  {
    quote:
      "The flexibility of ApexCloud's services allowed us to build a custom solution that perfectly fits our enterprise needs. It's a platform built for the future.",
    name: "Emily Rodriguez",
    title: "CEO, Stellar Solutions",
    logo: {
      imageUrl: "/person-1.avif",
      description: "Customer Logo 3",
    },
  },
];

export default function Testimonials() {
  return (
    <section className="w-full bg-[#20292b] py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Heading */}
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#e9eaea]">
            What Our Users Say
          </h2>
          <p className="max-w-[900px] text-gray-600 md:text-lg">
            Real stories from our amazing community.
          </p>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col justify-between shadow-md rounded-xl p-6  bg-[#2e3536] hover:scale-[1.01] duration-150 cursor-pointer"
            >
              <div>
                <blockquote className="text-lg italic text-[#acb3b67c]">
                  “{testimonial.quote}”
                </blockquote>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex flex-col flex-1">
                  <p className="font-semibold text-[#e9eaea]">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>

                {testimonial.logo && (
                  <img
                    src={testimonial.logo.imageUrl}
                    alt={testimonial.logo.description}
                    className="h-10 w-auto object-contain"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
