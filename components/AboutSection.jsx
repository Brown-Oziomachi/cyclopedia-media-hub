"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function AboutSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative bg-black text-white mb-10 px-6 md:px-16">
      {/* Short About Intro */}
      <div className="max-w-3xl mx-auto text-center">
        {/* <p className="text-gray-300 text-lg mb-6">
          The Cyclopedia is a living circle of knowledge — a digital space where
          truth, ideas, and understanding connect. Together with Hidden Truth
          Media, we uncover what others ignore and empower people through
          learning.
        </p> */}
        <button
          onClick={() => setOpen(true)}
          className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all"
        >
          Learn More
        </button>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 px-4"
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="bg-black text-white max-w-4xl w-full rounded-2xl shadow-2xl p-8 relative overflow-y-auto max-h-[80vh]"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
              >
                <X size={26} />
              </button>

              <h2 className="text-3xl font-bold mb-4 text-center">
                The Cyclopedia || Hidden Truth Media
              </h2>

              <div className="space-y-6 text-gray-400 leading-relaxed">
                <p>
                  Welcome to <strong>The Cyclopedia</strong> — a digital universe
                  of knowledge, truth, and discovery. The name Cyclopedia comes
                  from the ancient idea of a <em>“circle of learning”</em> — a
                  continuous flow of knowledge that connects every topic, story,
                  and idea.
                </p>
                <p>
                  Unlike traditional encyclopedias, The Cyclopedia isn’t static.
                  It’s alive — constantly evolving, growing, and redefining how
                  we learn and understand the world.
                </p>
                <p>
                  Every article, video, and insight is part of something bigger
                  — a network of information designed to make people think
                  deeper, learn broader, and see clearer. It’s a space built not
                  just to inform, but to ignite curiosity and encourage critical
                  thought.
                </p>

                <h3 className="text-2xl font-semibold mt-8">
                  Why Hidden Truth Media
                </h3>
                <p>
                  Beneath The Cyclopedia lies our bold investigative voice —
                  <strong> Hidden Truth Media</strong>. We created it to shine a
                  light on the stories, facts, and realities that often stay
                  buried beneath noise and misinformation.
                </p>
                <p>
                  Our mission is simple: to reveal what others ignore — to
                  uncover hidden truths in politics, society, technology, and
                  culture, and to give voice to perspectives that deserve to be
                  heard.
                </p>

                <h3 className="text-2xl font-semibold mt-8">
                  Our Combined Mission
                </h3>
                <p>
                  Together, The Cyclopedia and Hidden Truth Media form a complete
                  vision: a platform that connects knowledge and truth —
                  educating minds while challenging perceptions.
                </p>
                <p>
                  One informs. The other reveals. Both work toward the same goal
                  — to empower people through knowledge and truth.
                </p>

                <blockquote className="italic border-l-4 border-black pl-4 text-gray-700">
                  “At The Cyclopedia, learning never ends. We don’t just tell
                  stories — we connect them. We don’t just share facts — we
                  uncover meaning.”
                </blockquote>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}