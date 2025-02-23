"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image"; // Importing Image from next/image
import { Button } from "@/components/ui/button"; // Corrected import statement

import { useScroll, useMotionValueEvent } from "framer-motion";

const ModernNavbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const logoVariants = {
    hover: {
      rotate: 360,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const textVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-6">
        <Link href="/">
          <motion.div
            className="flex items-center gap-1 cursor-pointer"
            whileHover="hover"
          >
            <motion.div
              className="relative flex items-center justify-center"
              variants={logoVariants}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image 
                  src="/bookicon-removebg-preview.png" 
                  alt="Book Icon" 
                  width={40} // Set width
                  height={40} // Set height
                  className="object-contain"
                />
              
              </motion.div>
            </motion.div>
            <motion.span
              variants={textVariants}
              className="text-xl font-bold uppercase tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent"
            >
              Ebarch
            </motion.span>
          </motion.div>
        </Link>

        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="outline"
              className="font-medium hover:scale-105 transition-transform"
            >
              Sign in
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="outline"
              className="font-medium hover:scale-105 transition-transform"
            >
              Sign up
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default ModernNavbar;


