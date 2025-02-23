"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface StarProps {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

const Star: React.FC<StarProps> = ({ x, y, size, opacity }) => (
  <div
    className="absolute rounded-full bg-white"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: `${size}px`,
      height: `${size}px`,
      opacity: opacity,
    }}
  />
);

const Banner = () => {
  const [stars, setStars] = useState<StarProps[]>([]);
  const ref = useRef(null);

  useEffect(() => {
    const newStars = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.5,
    }));
    setStars(newStars);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-900" />
          {stars.map((star, index) => (
            <Star key={index} {...star} />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-20 left-10 w-4 h-4 bg-purple-400 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-40 right-20 w-6 h-6 bg-pink-400 rounded-full blur-sm"
        />
      </div>

      {/* Content */}
      <div className="w-full max-w-4xl mx-auto px-4 py-20 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Discover Research Papers <span className="italic">&</span>{" "}
            <span className="italic">eBooks</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg lg:text-xl font-light max-w-2xl mx-auto mb-6 md:mb-8">
            Explore a collection of research papers and ebooks. Dive into the
            latest findings and research in your field.
          </p>

          <motion.button
            className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white rounded-lg shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 w-full h-full border border-white rounded-lg opacity-10"></span>
            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
            <span className="relative flex items-center">
              Discover
              <ChevronDown className="ml-2 h-4 w-4" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;