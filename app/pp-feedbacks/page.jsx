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
} from "lucide-react";
import Link from "next/link";

export default function TestimonialPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [feedbackCountMap, setFeedbackCountMap] = useState({});

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const feedbackCollection = collection(db1, "feedback");
        const q = query(feedbackCollection, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        // Count feedbacks per email
        const countMap = {};
        snapshot.docs.forEach((doc) => {
          const email = doc.data().email;
          countMap[email] = (countMap[email] || 0) + 1;
        });
        setFeedbackCountMap(countMap);

        // Group by email to get one feedback per user
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

            // Keep only the latest feedback per email
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

  // Pagination
  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFeedbacks = feedbacks.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Community Feedback</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border rounded-2xl p-6 animate-pulse">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gray-200"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
                <div className="h-20 bg-gray-200 rounded"></div>
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
          <div className="inline-flex items-center justify-center mb-4 p-3 lg:mt-30 mt-10 rounded-full shadow-lg bg-gradient-to-br from-purple-600 to-purple-700 text-white">
            <MessageCircle size={24} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Community Feedback
          </h1>
          <p className="text-xl mx-auto text-center">
            See what our readers and community members are saying about The
            Cyclopedia
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {feedbacks.slice(0, 3).map((feedback) => (
                <div key={feedback.id} className="relative">
                  {feedback.profileImage ? (
                    <img
                      src={feedback.profileImage}
                      alt={feedback.name}
                      className="w-10 h-10 rounded-full object-cover shadow border-2 border-white"
                      title={feedback.name}
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(
                        feedback.name
                      )} flex items-center justify-center font-bold text-sm shadow border-2 border-white`}
                      title={feedback.name}
                    >
                      {feedback.initials}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <span className="ml-4">
              {feedbacks.length} testimonials from our community
            </span>
          </div>
        </div>

        {error && (
          <div className="border border-red-500/30 rounded-2xl p-6 mb-12 text-center">
            {error}
          </div>
        )}

        {feedbacks.length === 0 ? (
          <div className="text-center py-20">
            <MessageCircle size={48} className="mx-auto mb-4" />
            <p className="text-lg">
              No testimonials yet. Be the first to share your feedback!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentFeedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className="shadow-2xl rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1">
                      {feedback.profileImage ? (
                        <img
                          src={feedback.profileImage}
                          alt={feedback.name}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarColor(
                            feedback.name
                          )} flex items-center justify-center font-bold flex-shrink-0`}
                        >
                          {feedback.initials}
                          {feedbackCountMap[feedback.email] > 1 && (
                            <div className="flex items-center gap-1 px-2 py-1 border rounded-full text-xs font-medium mt-2 w-fit">
                              <MessageCircle size={12} />
                              {feedbackCountMap[feedback.email]} feedback
                            </div>
                          )}
                        </div>
                      )}

                      <div className="min-w-0">
                        <Link href={`/profile/view?id=${feedback.userId}`}>
                          {feedback.name}
                          <h1 className="text-sm text-blue-600">
                            View Profile
                          </h1>
                        </Link>

                        <div
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getFeedbackTypeColor(
                            feedback.feedbackType
                          )} whitespace-nowrap mt-1`}
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

                  <h4 className="font-semibold mb-3 line-clamp-2">
                    {feedback.title}
                  </h4>

                  <p className="text-sm leading-relaxed mb-4 line-clamp-4">
                    {feedback.message}
                  </p>
                  
                  <div className="flex items-center gap-2 pt-4 text-xs justify-around">
                    {feedbackCountMap[feedback.email] > 1 && (
                      <div className="flex items-center gap-1 px-2 py-1 border rounded-full text-xs font-medium mt-2 w-fit">
                        <MessageCircle size={12} className="text-blue-400"/>
                        {feedbackCountMap[feedback.email]} feedback
                      </div>
                    )}
                    <div className="flex items-center gap-1 px-2 py-1 border rounded-full text-xs font-medium mt-2 w-fit">
                      <Calendar size={14} className="text-blue-400"/>
                      {formatDate(feedback.createdAt)}
                    </div>
                  </div>
                  <hr className="mt-5"/>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mb-12">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-900 transition"
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg border transition ${
                          currentPage === page
                            ? "bg-blue-600 text-white border-blue-600"
                            : "hover:bg-gray-100 dark:hover:bg-gray-900"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-900 transition"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}

        {/* CTA Section */}
        <div className="border rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Share Your Feedback</h2>
          <p className="mb-6 max-w-xl mx-auto">
            Join our community and help us improve The Cyclopedia with your
            valuable insights
          </p>
          <a
            href="/feedback"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
          >
            <MessageCircle size={20} />
            Leave Your Feedback
          </a>
        </div>
      </div>
    </div>
  );
}
