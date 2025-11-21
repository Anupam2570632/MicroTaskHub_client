import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const heroSlides = [
  {
    id: "hero-1",
    title: "Unlock Your Earning Potential",
    subtitle: "Complete simple tasks and earn rewards from anywhere, anytime.",
    imageUrl: "/hero-1.avif",
  },
  {
    id: "hero-2",
    title: "Get Quality Work Done, Fast",
    subtitle: "Post your micro-tasks and get them completed by a global workforce.",
    imageUrl: "/hero-2.avif",
  },
  {
    id: "hero-3",
    title: "Join a Thriving Community",
    subtitle: "Connect with earners and requesters in our growing ecosystem.",
    imageUrl: "/hero-3.avif",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

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
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                {slide.title}
              </h1>

              <p className="mt-4 max-w-2xl text-lg md:text-xl">
                {slide.subtitle}
              </p>

              <div className="mt-8 flex gap-4">
                <a
                  href="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg"
                >
                  Get Started
                </a>

                <a
                  href="/tasks"
                  className="bg-white text-black px-6 py-3 rounded-lg text-lg hover:bg-gray-200"
                >
                  Browse Tasks
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 text-white rounded-full hover:bg-black/60 transition"
      >
        <FaChevronLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 text-white rounded-full hover:bg-black/60 transition"
      >
        <FaChevronRight />
      </button>

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
