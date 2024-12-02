"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { FaCheckCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export const AnimatedTestimonials = ({ testimonials, autoplay = false }) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };
  return (
    <div className="max-w-sm md:max-w-6xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
      <div className="relative grid grid-cols-1 md:grid-cols-2  gap-20">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.brand}
                    width={600}
                    height={600}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-fill object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold dark:text-white text-black">
              <span>{testimonials[active].year}</span> {testimonials[active].brand}
            </h3>
            <span className="text-sm text-gray-500 dark:text-neutral-500">
              {testimonials[active].vehicleType}
            </span>

            {/* main area */}

            <div className="my-6 p-8 shadow-lg rounded-lg border">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
                {/* Features Section */}
                <div className="flex-1 space-y-4 text-gray-800">
                  <h3 className="text-base font-semibold text-emerald-600">
                    Features and Agent Details
                  </h3>
                  <ul className="list-none space-y-2">
                    {[
                      { text:  testimonials[active].fuelType, icon: FaCheckCircle },
                      { text:  testimonials[active].transmissionType, icon: FaCheckCircle },
                      { text: testimonials[active].ownership, icon: FaCheckCircle },
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <feature.icon
                          className="text-emerald-500 mr-3"
                          size={18}
                        />
                        <span>{feature.text}</span>
                      </li>
                    ))}
                    <h3 className="text-sm my-3 font-medium text-gray-500">
                      Asking Price
                    </h3>
                    <li className="flex items-center text-sm">
                      <FcMoneyTransfer
                        className="text-emerald-500 mr-3"
                        size={18}
                      />
                      <span className="text-2xl font-bold">₹{testimonials[active].price}</span>
                    </li>
                  </ul>
                </div>

                {/* Price and Contact Section */}
                <div className="flex flex-col lg:flex-col lg:items-center lg:justify-between text-left lg:text-right">
                  <div className="flex-1">
                    <span className="text-base text-gray-900 mt-2 block">
                      {testimonials[active].agentName}
                    </span>
                    <span className="text-base mt-2 block">{testimonials[active].contact}</span>
                    <span className="text-base text-emerald-700 mt-2 block hover:underline transition duration-300">
                    +91 {testimonials[active].primaryContact}
                    </span>
                   {testimonials[active].secondaryContact &&  <span className="text-base text-emerald-700 mt-2 block hover:underline transition duration-300">
                      +91 {testimonials[active].secondaryContact}
                    </span>}
                    {testimonials[active].district && <span className="text-base mt-2 flex justify-center items-center">
                      {" "}
                      <FaLocationDot className="text-emerald-500" size={16} />
                      {testimonials[active].district} {testimonials[active].place || ""}
                    </span>}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
            >
              <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
            >
              <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
