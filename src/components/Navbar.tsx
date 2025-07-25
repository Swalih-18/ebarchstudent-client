"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search, ChevronLeft } from "lucide-react";

const ModernNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    // Handle clicks outside of search box
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchQuery("");
        setSearchResults([]);
        if (window.innerWidth < 768) {
          setIsSearchExpanded(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const [booksRes, papersRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/publicbooks`),
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/researchpapers/publicpapers`
          ),
        ]);

        const books = await booksRes.json();
        const papers = await papersRes.json();

        const combinedResults = [...books, ...papers].filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSearchResults(combinedResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (searchQuery.length > 2) {
      fetchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchSelect = (result: any) => {
    const route = result.field ? "researchpaper" : "book";
    router.push(`/${route}/${result._id}`);
    setSearchQuery(""); // Reset search box after selection
    setSearchResults([]); // Clear results
    setIsSearchExpanded(false);
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-4 relative">
        {/* Logo - hidden when search is expanded on mobile */}
        <Link href="/">
          <motion.div
            className={`flex items-center gap-1 cursor-pointer ${
              isSearchExpanded ? "hidden sm:flex" : "flex"
            }`}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5 },
            }}
          >
            <motion.div
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 1],
                repeatDelay: 5,
                repeat: Infinity,
              }}
            >
              <Image
                src="/bookicon-removebg-preview.png"
                alt="Book Icon"
                width={40}
                height={40}
                className="object-contain"
              />
            </motion.div>
            <motion.span
              className="text-xl font-bold uppercase tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Ebarch
            </motion.span>
          </motion.div>
        </Link>

        {/* Mobile search icon - FIXED POSITION */}
        <div
          className={`sm:hidden cursor-pointer text-white ${
            isSearchExpanded ? "hidden" : "block"
          }`}
          onClick={() => setIsSearchExpanded(true)}
        >
          <Search size={20} />
        </div>

        {/* Right side navigation elements */}
        <div
          className={`flex items-center gap-2 md:gap-4 ${
            isSearchExpanded ? "w-full" : ""
          }`}
        >
          {/* Search bar */}
          <div
            className={`relative ${
              isSearchExpanded
                ? "w-full"
                : "hidden sm:block w-40 sm:w-64 md:w-80 lg:w-96"
            }`}
            ref={searchRef}
          >
            <div className="flex items-center">
              {isSearchExpanded && (
                <div
                  className="mr-2 text-white cursor-pointer sm:hidden"
                  onClick={() => setIsSearchExpanded(false)}
                >
                  <ChevronLeft size={20} />
                </div>
              )}
              <Input
                type="text"
                placeholder="Search books or papers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 text-white bg-transparent text-sm"
              />
            </div>
            {searchResults.length > 0 && (
              <div className="absolute bg-black/90 shadow-2xl rounded-lg mt-2 w-full z-50 text-white overflow-y-auto max-h-[500px] border border-gray-700">
                {searchResults.map((result) => (
                  <div
                    key={result._id}
                    className="flex items-center p-2 sm:p-4 border-b border-gray-700 last:border-0 hover:bg-gray-800 cursor-pointer transition-colors duration-200 space-x-2 sm:space-x-4"
                    onClick={() => handleSearchSelect(result)}
                  >
                    {/* Cover Image */}
                    <div className="flex-shrink-0 hidden sm:block">
                      <Image
                        src={result.coverImage || "/placeholder-book-cover.png"}
                        alt={`${result.title} cover`}
                        width={60}
                        height={90}
                        className="object-cover rounded-md"
                        onError={(e) => {
                          const imgElement = e.target as HTMLImageElement;
                          imgElement.onerror = null;
                          imgElement.src = "/placeholder-book-cover.png";
                        }}
                      />
                    </div>

                    {/* Text Content */}
                    <div className="flex-grow overflow-hidden">
                      <span className="text-sm sm:text-base font-semibold block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        {result.title}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-400">
                        {result.field ? "Research Paper" : "eBook"}
                      </span>
                      {result.author && (
                        <span className="text-xs text-gray-500 block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                          by {result.author}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons - hidden when search is expanded on mobile */}
          <div
            className={`${
              isSearchExpanded ? "hidden sm:flex" : "flex"
            } items-center gap-2`}
          ></div>
        </div>
      </div>
    </motion.nav>
  );
};

export default ModernNavbar;
