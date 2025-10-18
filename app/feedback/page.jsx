"use client";
import { useEffect, useRef, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import {
  Send,
  CheckCircle,
  X,
  MessageSquare,
  AlertCircle,
  Lightbulb,
  Star,
  Zap,
} from "lucide-react";
import { db1 } from "@/lib/firebaseConfig";
import { TextField } from "@mui/material";

export default function FeedbackForm() {
  const [feedbackType, setFeedbackType] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [popup, setPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitData, setSubmitData] = useState(null);
  const popupDataRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupDataRef.current && !popupDataRef.current.contains(e.target))
        setPopup(false);
    };
    if (popup) document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popup]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = {
      feedbackType,
      email,
      title,
      message,
      createdAt: new Date().toISOString(),
    };

    try {
      const feedbackId = `feedback_${Date.now()}`;
      await setDoc(doc(db1, "feedback", feedbackId), data);
      setSubmitData(data);
      setPopup(true);
      setFeedbackType("");
      setEmail("");
      setTitle("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const feedbackOptions = [
    {
      value: "bug",
      label: "Bug Report",
      desc: "Report a technical issue",
      icon: AlertCircle,
      color: "from-red-500 to-red-600",
    },
    {
      value: "feature",
      label: "Feature Request",
      desc: "Suggest a new feature",
      icon: Lightbulb,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      value: "improvement",
      label: "Improvement",
      desc: "Suggest an improvement",
      icon: Zap,
      color: "from-blue-500 to-blue-600",
    },
    {
      value: "praise",
      label: "Praise",
      desc: "Share positive feedback",
      icon: Star,
      color: "from-green-500 to-green-600",
    },
    {
      value: "other",
      label: "Other",
      desc: "Something else",
      icon: MessageSquare,
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="min-h-screen  py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4 p-3 mt-5 lg:mt-30 bg-purple-500/10 rounded-full border border-purple-500/20">
            <MessageSquare className="text-purple-400" size={24} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            We'd Love to Hear from{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              You
            </span>
          </h1>
          <p className="text-lg max-w-xl mx-auto">
            Your feedback helps us create a better experience. Tell us what you
            think!
          </p>
        </div>

        <div className=" rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-lg font-semibold mb-6 text-center">
                What type of feedback?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                {feedbackOptions.map((option) => {
                  const IconComponent = option.icon;
                  const isSelected = feedbackType === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`relative flex flex-col items-center p-5 rounded-2xl cursor-pointer transition-all duration-300 shadow-2xl ${
                        isSelected
                          ? `border-purple-500 bg-gradient-to-br ${option.color} shadow-lg shadow-purple-500/25`
                          : "border-gray-75000 hover:border-gray-600 hover:bg-gray-800/"
                      }`}
                    >
                      <input
                        type="radio"
                        name="feedbackType"
                        value={option.value}
                        checked={isSelected}
                        onChange={(e) => setFeedbackType(e.target.value)}
                        className="sr-only"
                        required
                      />
                      <IconComponent
                        size={24}
                        className={isSelected ? " mb-2" : ""}
                      />
                      <p
                        className={`font-semibold text-center text-sm ${
                          isSelected ? "" : ""
                        }`}
                      >
                        {option.label}
                      </p>
                      <p
                        className={`text-xs text-center mt-1 ${
                          isSelected ? "" : ""
                        }`}
                      >
                        {option.desc}
                      </p>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold mb-3">
                Email Address
              </label>
              <input
                type="email"
                placeholder="thecyclopedia@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 border-neutral-50 shadow-2xl rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-3 ">
                Feedback Title
              </label>
              <input
                type="text"
                fullWidth
                multiline
                minRows={2}
                outlined
                placeholder="Give your feedback a brief title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-5 py-4 border-neutral-50 shadow-2xl rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-3 ">
                Your Message
              </label>
              <TextField
                outlined
                fullWidth
                multiline
                minRows={8}
                placeholder="Share your thoughts, suggestions, or report issues in detail..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className=" px-5 py-4 border rounded-xl  focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 "
                required
              />
            </div>

            <button
              disabled={submitting}
              type="submit"
              className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-800 text-white font-bold text-lg rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-purple-500/25 disabled:shadow-none"
            >
              {submitting ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Feedback
                </>
              )}
            </button>
          </form>
        </div>
      </div>


      {popup && submitData && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div
            ref={popupDataRef}
            className="bg-gradient-to-br from-slate-900 to-black border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in"
          >
            <button
              onClick={() => setPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-2 hover:bg-gray-800/50 rounded-lg"
            >
              <X size={24} />
            </button>

            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-500/15 p-4 border border-green-500/40 shadow-lg shadow-green-500/10">
                <CheckCircle size={48} className="text-green-400" />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
              Thank You!
            </h2>
            <p className="text-gray-400 text-center mb-6 text-sm md:text-base">
              Your feedback has been received and will help us improve The
              Cyclopedia. We genuinely appreciate your input!
            </p>

            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/50 rounded-2xl p-4 md:p-6 mb-6 space-y-3">
              <div className="flex justify-between items-start pb-3 border-b border-gray-700/50 gap-2">
                <span className="text-gray-400 font-medium text-sm">Type:</span>
                <span className="text-white font-semibold capitalize bg-purple-500/20 px-2 py-1 rounded-lg text-xs">
                  {submitData.feedbackType}
                </span>
              </div>

              <div className="pb-3 border-b border-gray-700/50">
                <span className="text-gray-400 font-medium text-sm block mb-1">
                  Email:
                </span>
                <span className="text-white font-semibold text-xs break-all">
                  {submitData.email}
                </span>
              </div>

              <div className="pb-3 border-b border-gray-700/50">
                <span className="text-gray-400 font-medium text-sm block mb-1">
                  Title:
                </span>
                <span className="text-white font-semibold text-xs line-clamp-2">
                  {submitData.title}
                </span>
              </div>

              <div>
                <span className="text-gray-400 font-medium text-sm block mb-2">
                  Message:
                </span>
                <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
                  {submitData.message}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setPopup(false)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                Close
              </button>

              <a
                href="/pp-feedbacks"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/25 text-center"
              >
                View Your Feedback
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
