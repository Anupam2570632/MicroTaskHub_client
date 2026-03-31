import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const heroSlides = [
  {
    id: "hero-1",
    title: "Unlock Your Earning Potential",
    subtitle: "Complete simple tasks and earn rewards from anywhere, anytime.",
    imageUrl: "/hero-4.avif",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);


  return (
    <section className="relative w-full overflow-hidden">
      
      {/* Slider Wrapper */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
          width: `${heroSlides.length * 100}%`,
        }}
      >
        {heroSlides.map((slide) => (
          <div
            key={slide.id}
            className="w-full h-[500px] sm:h-[600px] flex relative"
            style={{ width: "300%" }}
          >
            {/* Background Image */}
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/70"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#e9eaea] px-4">
              <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                {slide.title}
              </h1>

              <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-500">
                {slide.subtitle}
              </p>

              <div className="mt-8 flex gap-4">
                <a
                  href="/register"
                  // className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg"
                   className="py-2 px-3 font-bold bg-[#55695c] hover:bg-[#2b373a] duration-200 ease-in cursor-pointer rounded-sm text-[#e7e7d8] hover:text-[#acb3b6]"
                >
                  Get Started
                </a>

                <Link
                  to="/dashboard/"
                  // className="bg-white text-black px-6 py-3 rounded-lg text-lg hover:bg-gray-200"
                   className="py-2 px-3 font-bold bg-[#55695c] hover:bg-[#2b373a] duration-200 ease-in cursor-pointer rounded-sm text-[#e7e7d8] hover:text-[#acb3b6]"
                >
                  Browse Tasks
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition ${
              current === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
