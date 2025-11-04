"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CyclopediaConnection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-8 md:py-16 px-4 bg-black">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Container */}
      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 text-white">
            Connected Sources of{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Knowledge
            </span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            The evolution of information sharing
          </p>
        </motion.div>

        {/* Desktop Layout - Horizontal */}
        <div className="hidden md:flex items-center justify-between gap-4">
          {/* Encyclopedia Node */}
          <motion.div variants={itemVariants} className="flex-1">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 md:p-8 text-center transform group-hover:scale-105 transition-all duration-300">
                <div className="text-4xl md:text-6xl mb-3">📚</div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Encyclopedia
                </h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  Traditional Source
                </p>
              </div>
            </div>
          </motion.div>

          {/* Connection Lines 1 */}
          <div className="flex-shrink-0 w-16 md:w-32 relative h-24 flex items-center">
            <div className="absolute inset-0 flex flex-col justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="relative h-0.5 overflow-hidden">
                  <div
                    className="absolute h-full w-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
                    style={{
                      animation: `flow ${2 + i * 0.3}s linear infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <div
                  key={`particle-${i}`}
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full"
                  style={{
                    animation: `moveRight ${1.5 + i * 0.5}s linear infinite`,
                    animationDelay: `${i * 0.5}s`,
                    boxShadow: "0 0 10px #06b6d4",
                  }}
                ></div>
              ))}
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-purple-500 animate-pulse">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14m-7-7l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* The Cyclopedia Node */}
          <motion.div variants={itemVariants} className="flex-1">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl blur-2xl opacity-40 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 md:p-10 text-center transform group-hover:scale-110 transition-all duration-500 shadow-2xl">
                <div className="text-5xl md:text-7xl mb-3 animate-bounce">
                  👁️
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-white mb-2 bg-gradient-to-br from-gray-900 to-gray-800 bg-clip-text text-transparent">
                  THE CYCLOPEDIA
                </h2>
                <p className="text-cyan-300 text-xs md:text-sm font-semibold mb-3">
                  Modern Evolution
                </p>
                <div className="flex justify-center gap-1 md:gap-2 flex-wrap">
                  <span className="px-2 md:px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-xs font-bold">
                    Independent
                  </span>
                  <span className="px-2 md:px-3 py-1 bg-cyan-500/30 text-cyan-200 rounded-full text-xs font-bold">
                    Real-Time
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connection Lines 2 */}
          <div className="flex-shrink-0 w-16 md:w-32 relative h-24 flex items-center">
            <div className="absolute inset-0 flex flex-col justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="relative h-0.5 overflow-hidden">
                  <div
                    className="absolute h-full w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500"
                    style={{
                      animation: `flow ${2 + i * 0.3}s linear infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <div
                  key={`particle-${i}`}
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full"
                  style={{
                    animation: `moveRight ${1.5 + i * 0.5}s linear infinite`,
                    animationDelay: `${i * 0.5}s`,
                    boxShadow: "0 0 10px #a855f7",
                  }}
                ></div>
              ))}
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-cyan-500 animate-pulse">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14m-7-7l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Wikipedia Node */}
          <motion.div variants={itemVariants} className="flex-1">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-l from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 md:p-8 text-center transform group-hover:scale-105 transition-all duration-300">
                <div className="text-4xl md:text-6xl mb-3">🌐</div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Wikipedia
                </h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  Collaborative Source
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Layout - Vertical with Framer Motion */}
        <div className="md:hidden flex flex-col items-center gap-6">
          {/* Encyclopedia Node */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="w-full max-w-xs"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-30"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-center">
                <div className="text-5xl mb-2">📚</div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Encyclopedia
                </h3>
                <p className="text-gray-400 text-xs">Traditional Source</p>
              </div>
            </div>
          </motion.div>

          {/* Vertical Connection */}
          <div className="relative h-16 w-24 flex justify-center">
            <div className="absolute inset-0 flex flex-row justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="relative w-0.5 overflow-hidden">
                  <div
                    className="absolute w-full h-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500"
                    style={{
                      animation: `flowDown ${2 + i * 0.3}s linear infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <div
                  key={`particle-mobile-${i}`}
                  className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full"
                  style={{
                    animation: `moveDown ${1.5 + i * 0.5}s linear infinite`,
                    animationDelay: `${i * 0.5}s`,
                    boxShadow: "0 0 10px #06b6d4",
                  }}
                ></div>
              ))}
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-purple-500 animate-pulse">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14m-7-7l7 7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* The Cyclopedia Node */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.08 }}
            className="w-full max-w-xs"
          >
            <div className="relative">
              <div className="absolute inset-0  rounded-2xl blur-xl opacity-40 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-md p-6 text-center shadow-2xl">
                <div className="text-5xl mb-2 animate-bounce">👁️</div>
                <h2 className="text-2xl font-black text-white mb-1 bg-gradient-to-br from-gray-900 to-gray-800 bg-clip-text text-transparent">
                  THE CYCLOPEDIA
                </h2>
                <p className="text-cyan-300 text-xs font-semibold mb-2">
                  Modern Evolution
                </p>
                <div className="flex justify-center gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-purple-500/30 text-purple-200 rounded-full text-xs font-bold">
                    Independent
                  </span>
                  <span className="px-2 py-1 bg-cyan-500/30 text-cyan-200 rounded-full text-xs font-bold">
                    Real-Time
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vertical Connection */}
          <div className="relative h-16 w-24 flex justify-center">
            <div className="absolute inset-0 flex flex-row justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="relative w-0.5 overflow-hidden">
                  <div
                    className="absolute w-full h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-blue-500"
                    style={{
                      animation: `flowDown ${2 + i * 0.3}s linear infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <div
                  key={`particle-mobile2-${i}`}
                  className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full"
                  style={{
                    animation: `moveDown ${1.5 + i * 0.5}s linear infinite`,
                    animationDelay: `${i * 0.5}s`,
                    boxShadow: "0 0 10px #a855f7",
                  }}
                ></div>
              ))}
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-cyan-500 animate-pulse">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14m-7-7l7 7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Wikipedia Node */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="w-full max-w-xs"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-l from-cyan-500 to-blue-500 rounded-xl blur-lg opacity-30"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-center">
                <div className="text-5xl mb-2">🌐</div>
                <h3 className="text-lg font-bold text-white mb-1">Wikipedia</h3>
                <p className="text-gray-400 text-xs">Collaborative Source</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Description */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-8 md:mt-12"
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-sm md:text-lg mb-2 md:mb-3 text-white">
              <span className="text-purple-400 font-semibold">
                The Cyclopedia
              </span>{" "}
              bridges traditional and modern knowledge sources
            </p>
            <p className="text-xs md:text-sm text-gray-600">
              Drawing from the reliability of encyclopedias and the
              collaborative spirit of Wikipedia, we deliver independent,
              real-time journalism without bias.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes flow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes flowDown {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(200%);
          }
        }

        @keyframes moveRight {
          0% {
            left: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        @keyframes moveDown {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
