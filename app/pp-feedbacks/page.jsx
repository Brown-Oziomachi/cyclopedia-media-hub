"use client";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";
import {
  MessageCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp,
  Users,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function TestimonialPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [feedbackCountMap, setFeedbackCountMap] = useState({});
  const [stats, setStats] = useState({ total: 0, types: {} });

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const feedbackCollection = collection(db1, "feedback");
        const q = query(feedbackCollection, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const countMap = {};
        const typeCount = {};

        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          const email = data.email;
          countMap[email] = (countMap[email] || 0) + 1;

          const type = data.feedbackType || "other";
          typeCount[type] = (typeCount[type] || 0) + 1;
        });

        setFeedbackCountMap(countMap);
        setStats({ total: snapshot.docs.length, types: typeCount });

        const uniqueFeedbacks = {};

        const feedbackData = await Promise.all(
          snapshot.docs.map(async (feedbackDoc) => {
            const data = feedbackDoc.data();
            const userId = data.userId;
            const email = data.email;
            let userProfile = null;

            if (userId) {
              try {
                const userDoc = await getDoc(doc(db1, "users", userId));
                userProfile = userDoc.data();
              } catch (err) {
                console.error("Error fetching user profile:", err);
              }
            }

            const name =
              userProfile?.name || data.name || email?.split("@")[0] || "User";
            const initials = name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

            const feedbackItem = {
              id: feedbackDoc.id,
              ...data,
              name: name.charAt(0).toUpperCase() + name.slice(1),
              initials,
              profileImage: userProfile?.profileImage || null,
            };

            if (!uniqueFeedbacks[email]) {
              uniqueFeedbacks[email] = feedbackItem;
            }

            return feedbackItem;
          })
        );

        setFeedbacks(Object.values(uniqueFeedbacks));
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

  const getFeedbackTypeConfig = (type) => {
    const configs = {
      bug: {
        color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
        icon: "🐛",
        label: "Bug Report",
      },
      feature: {
        color:
          "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
        icon: "💡",
        label: "Feature",
      },
      improvement: {
        color:
          "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
        icon: "⚡",
        label: "Improvement",
      },
      praise: {
        color:
          "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
        icon: "⭐",
        label: "Praise",
      },
      other: {
        color:
          "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
        icon: "💬",
        label: "Other",
      },
    };
    return configs[type] || configs.other;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFeedbacks = feedbacks.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen  py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 mt-10 ">
            <div className="inline-flex items-center justify-center mb-6 p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg">
              <MessageCircle size={32} className="text-white" />
            </div>
            <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-lg w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-lg w-2/3 mx-auto animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className=" rounded-2xl p-6 animate-pulse"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-32"></div>
                  </div>
                </div>
                <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-20 mt-10 lg:mt-30">
          <div className="inline-flex items-center justify-center mb-6 p-4 rounded-2xl bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 shadow-2xl shadow-purple-500/30 transform hover:scale-105 transition-transform">
            <MessageCircle size={32} className="text-white" />
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Subscribers Feedback
          </h1>

          <p className="text-xl md:text-2xl mx-auto mb-10 leading-relaxed">
            Discover what our subscribers are saying about The Cyclopedia
          </p>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <div className="flex -space-x-3">
              {feedbacks.slice(0, 8).map((feedback) => (
                <div key={feedback.id} className="relative group">
                  {feedback.profileImage ? (
                    <img
                      src={feedback.profileImage}
                      alt={feedback.name}
                      className="w-12 h-12 rounded-full object-cover border-purple-500 border-3 shadow-lg group-hover:scale-110 transition-transform"
                      title={feedback.name}
                    />
                  ) : (
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarColor(
                        feedback.name
                      )} flex items-center justify-center font-bold text-sm border-4 border-white dark:border-gray-900 shadow-lg group-hover:scale-110 transition-transform`}
                      title={feedback.name}
                    >
                      {feedback.initials}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2  px-6 py-3 rounded-full shadow-lg ">
              <Star className="text-yellow-500 fill-yellow-500" size={20} />
              <span className="font-semibold ">
                {feedbacks.length}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                testimonials
              </span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className=" rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="text-purple-600" size={20} />
                <span className="text-2xl font-bold">
                  {feedbacks.length}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Subscribers
              </p>
            </div>

            <div className=" rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MessageCircle className="text-blue-600" size={20} />
                <span className="text-2xl font-bold">
                  {stats.total}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Feedback
              </p>
            </div>

            <div className=" rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="text-green-600" size={20} />
                <span className="text-2xl font-bold">
                  {stats.types.praise || 0}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Praise</p>
            </div>

            <div className=" rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="text-indigo-600" size={20} />
                <span className="text-2xl font-bold ">
                  {stats.types.improvement || 0}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Suggestions
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 mb-12 text-center">
            <p className="text-red-600 dark:text-red-400 font-medium">
              {error}
            </p>
          </div>
        )}

        {feedbacks.length === 0 ? (
          <div className="text-center py-2 rounded-2xl border shadow-sm">
            <MessageCircle size={64} className="mx-auto mb-6 text-gray-400" />
            <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
              No testimonials yet
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Be the first to share your feedback!
            </p>
            <a
              href="/feedback"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              <MessageCircle size={20} />
              Leave Your Feedback
            </a>
          </div>
        ) : (
          <>
            {/* Feedback Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentFeedbacks.map((feedback) => {
                const typeConfig = getFeedbackTypeConfig(feedback.feedbackType);

                return (
                  <div
                    key={feedback.id}
                    className=" rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 group"
                  >
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <Link
                        href={`/profile/view?id=${feedback.userId}`}
                        className="flex-shrink-0"
                      >
                        {feedback.profileImage ? (
                          <img
                            src={feedback.profileImage}
                            alt={feedback.name}
                            className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-800 group-hover:ring-purple-500 transition-all"
                          />
                        ) : (
                          <div
                            className={`w-14 h-14 rounded-full bg-gradient-to-br ${getAvatarColor(
                              feedback.name
                            )} flex items-center justify-center font-bold shadow-md ring-2 ring-gray-200 dark:ring-gray-800 group-hover:ring-purple-500 transition-all`}
                          >
                            {feedback.initials}
                          </div>
                        )}
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/profile/view?id=${feedback.userId}`}
                          className="block"
                        >
                          <h3 className="font-semibold  hover:text-purple-600 dark:hover:text-purple-400 transition-colors truncate">
                            {feedback.name}
                          </h3>
                          <p className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1">
                            View Profile →
                          </p>
                        </Link>

                        <div
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${typeConfig.color} mt-2`}
                        >
                          <span>{typeConfig.icon}</span>
                          <span>{typeConfig.label}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 line-clamp-2">
                        {feedback.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                        {feedback.message}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
                        <Calendar size={14} />
                        <span>{formatDate(feedback.createdAt)}</span>
                      </div>

                      {feedbackCountMap[feedback.email] > 1 && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
                          <MessageCircle size={12} />
                          <span>
                            {feedbackCountMap[feedback.email]} feedback
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-6 py-3  border border-gray-200 dark:border-gray-800 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-md transition-all font-medium"
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    let page;
                    if (totalPages <= 7) {
                      page = i + 1;
                    } else if (currentPage <= 4) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 3) {
                      page = totalPages - 6 + i;
                    } else {
                      page = currentPage - 3 + i;
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-11 h-11 rounded-xl border font-medium transition-all ${
                          currentPage === page
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent shadow-lg"
                            : " border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-500"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-800 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-md transition-all font-medium"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            {/* All Subscribers Link */}
            <div className="flex justify-center mb-16">
              <Link
                href="/all-subscribers"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800 rounded-xl hover:shadow-lg transition-all"
              >
                <Users
                  size={20}
                  className="text-purple-600 dark:text-purple-400"
                />
                <span className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  View All Subscribers
                </span>
                <ChevronRight
                  size={20}
                  className="text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </>
        )}

        {/* CTA Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center mb-6 p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Sparkles size={32} className="text-white" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Share Your Feedback
            </h2>

            <p className="text-lg md:text-xl text-white/90 mb-8 mx-auto">
              Join our community and help us improve The Cyclopedia with your
              valuable insights
            </p>

            <a
              href="/feedback"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-purple-600 font-semibold rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <MessageCircle size={20} />
              Leave Your Feedback
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
