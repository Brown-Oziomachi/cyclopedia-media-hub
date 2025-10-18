"use client";
import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";
import { Star, MessageCircle, User, Mail, Calendar } from "lucide-react";

export default function TestimonialPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const feedbackCollection = collection(db1, "feedback");
        const q = query(
          feedbackCollection,
          orderBy("createdAt", "desc"),
          limit(20)
        );
        const snapshot = await getDocs(q);

        const feedbackData = snapshot.docs.map((doc) => {
          const data = doc.data();
          const email = data.email || "";
          const name = email.split("@")[0] || "User";
          const initials = name
            .split(".")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

          return {
            id: doc.id,
            ...data,
            name: name.charAt(0).toUpperCase() + name.slice(1),
            initials,
          };
        });

        setFeedbacks(feedbackData);
        setError(null);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        setError("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const getAvatarColor = (name) => {
    const colors = [
      "from-purple-500 to-blue-500",
      "from-pink-500 to-rose-500",
      "from-orange-500 to-yellow-500",
      "from-green-500 to-teal-500",
      "from-red-500 to-pink-500",
      "from-indigo-500 to-purple-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getFeedbackTypeColor = (type) => {
    const typeColors = {
      bug: "bg-red-500/10 text-red-400 border-red-500/20",
      feature: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      improvement: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      praise: "bg-green-500/10 text-green-400 border-green-500/20",
      other: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    };
    return typeColors[type] || typeColors.other;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">
              Community{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Feedback
              </span>
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 animate-pulse"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gray-700"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-32"></div>
                  </div>
                </div>
                <div className="h-20 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4 p-3 lg:mt-30 mt-10 rounded-full shadow border-purple-500/20">
            <MessageCircle className="text-purple-400" size={24} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Community{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Feedback
            </span>
          </h1>
          <p className="text-xl mx-auto text-center">
            See what our readers and community members are saying about
            <span className="text-purple-600 font-black"> The Cyclopedia</span>
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {feedbacks.slice(0, 3).map((feedback) => (
                <div
                  key={feedback.id}
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(
                    feedback.name
                  )} flex items-center justify-center font-bold text-sm shadow`}
                  title={feedback.name}
                >
                  {feedback.initials}
                </div>
              ))}
            </div>
            <span className=" ml-4">
              {feedbacks.length} testimonials from our community
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-12 text-center text-red-400">
            {error}
          </div>
        )}

        {feedbacks.length === 0 ? (
          <div className="text-center py-20">
            <MessageCircle size={48} className="mx-auto mb-4" />
            <p className=" text-lg">
              No testimonials yet. Be the first to share your feedback!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="shadow-2xl rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    {feedback.avater} 
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarColor(
                        feedback.name
                      )} flex items-center justify-center font-bold flex-shrink-0`}
                    >
                      {feedback.initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm truncate">
                        {feedback.name}
                      </h3>
                      {/* <div className="flex items-center gap-1 text-xs">
                        <Mail size={12} />
                        <span className="truncate">{feedback.email}</span>
                      </div> */}
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getFeedbackTypeColor(
                          feedback.feedbackType
                        )} whitespace-nowrap ml-2`}
                      >
                        {feedback.feedbackType === "bug" && "🐛"}
                        {feedback.feedbackType === "feature" && "💡"}
                        {feedback.feedbackType === "improvement" && "⚡"}
                        {feedback.feedbackType === "praise" && "⭐"}
                        {feedback.feedbackType === "other" && "💬"}{" "}
                        {feedback.feedbackType}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-lg font-semibold mb-3 line-clamp-2">
                  {feedback.title}
                </h4>

                {/* Message */}
                <p className=" text-sm leading-relaxed mb-4 line-clamp-4">
                  {feedback.message}
                </p>

                {/* Footer with Date */}
                <div className="flex items-center justify-between pt-4 shadow-2xl">
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Calendar size={14} />
                    {formatDate(feedback.createdAt)}
                  </div>
                 
                </div>
                <p className="text-xs text-center -mt-5 text-purple-500">
                  We will reply you via your email
                </p>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-purple-900/20 to-blue-900/20 shadow-2xl rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Share Your Feedback</h2>
          <p className=" mb-6 max-w-xl mx-auto">
            Join our community and help us improve The Cyclopedia with your
            valuable insights
          </p>
          <a
            href="/feedback"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            <MessageCircle size={20} />
            Leave Your Feedback
          </a>
        </div>
      </div>
    </div>
  );
}
