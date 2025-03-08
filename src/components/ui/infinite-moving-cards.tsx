"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Framer Motion text animation variants
  const headerVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotate: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 500); // Short delay between animations
    }, 3000); // Repeat every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Compute doubled items for infinite scroll
  const doubledItems = [...items, ...items];

  return (
    <div className="flex flex-col items-center w-full">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.h2
            key="quotes-header"
            className="text-3xl font-bold text-gray-100 mb-8 text-center flex overflow-hidden"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {"Quotes".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
        )}
      </AnimatePresence>

      <div
        className={cn(
          "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
          className
        )}
      >
        <ul
          className={cn(
            "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
          style={{
            animationDirection: direction === "left" ? "normal" : "reverse",
            animationDuration:
              speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s",
          }}
        >
          {doubledItems.map((item, idx) => (
            <li
              className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
              style={{
                background:
                  "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
              }}
              key={`${item.name}-${idx}`}
            >
              <blockquote>
                <div
                  aria-hidden="true"
                  className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                ></div>
                <span className="relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
                  {item.quote}
                </span>
                <div className="relative z-20 mt-6 flex flex-row items-center">
                  <span className="flex flex-col gap-1">
                    <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                      {item.name}
                    </span>
                    <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                      {item.title}
                    </span>
                  </span>
                </div>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
