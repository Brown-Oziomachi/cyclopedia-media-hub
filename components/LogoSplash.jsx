"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const LogoSplash = ({ onFinish }) => {
  const [step, setStep] = useState("logo"); // 'logo' -> 'text' -> 'done'

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setStep("text");
    }, 2000); // logo visible for 4s

    const finishTimer = setTimeout(() => {
      setStep("done");
      if (onFinish) onFinish();
    }, 2000); // total splash duration = 10s

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  if (step === "done") return null;

  return (
    <AnimatePresence mode="wait">
      {step === "logo" && (
        <motion.div
          key="logo"
          className="fixed inset-0 flex items-center justify-center bg-black z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="relative"
          >
            <Image
              src="/truth.png"
              alt="Cyclopedia Logo"
              width={300}
              height={300}
              priority
            />
            {/* Eye blink animation */}
            <div className="absolute top-[38%] left-[45.10%] w-[10%] h-[10%] overflow-hidden z-20">
              <motion.div
                className="bg-black w-full h-full rounded-full origin-top"
                animate={{ scaleY: [0, 1, 0, 1, 0] }}
                transition={{
                  duration: 2.2,
                  times: [0, 0.2, 0.4, 0.6, 0.8],
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      {step === "text" && (
        <motion.div
          key="text"
          className="fixed inset-0 flex items-center justify-center bg-black text-white px-6 lg:px-48 text-center z-[9998]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.1 }}
            className="text-sm lg:text-xl leading-relaxed max-w-3xl"
          >
            This website explores the rise of fake news, uncovering its history,
            motives and the stories driving its global impact.<br />
            <strong className="text-purple-600 text-xl">The War on Truth</strong> examines the transformative effect
            of misinformation in the digital age, tracing its roots from
            propaganda to its rapid spread via social media algorithms.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoSplash;
