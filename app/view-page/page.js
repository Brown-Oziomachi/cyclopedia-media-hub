"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { doc, getDoc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";
import { useAuth } from "@/components/AuthProvider";
import { ArrowLeft, Trash2, Calendar } from "lucide-react";
import Link from "next/link";

export default function PublicProfilePage() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("id");
    const { user: currentUser } = useAuth();

    const [profileUser, setProfileUser] = useState(null);
    const [userFeedback, setUserFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(null);

    useEffect(() => {
        if (!userId) {
            setError("User not found");
            setLoading(false);
            return;
        }

        const fetchProfileData = async () => {
            try {
                setLoading(true);

                // Fetch user profile
                const userDoc = await getDoc(doc(db1, "users", userId));
                if (!userDoc.exists()) {
                    setError("User profile not found");
                    setLoading(false);
                    return;
                }

                const userData = userDoc.data();
                setProfileUser({
                    uid: userId,
                    ...userData,
                });

                // Fetch user's feedback
                const feedbackQuery = query(
                    collection(db1, "feedback"),
                    where("userId", "==", userId)
                );
                const feedbackSnapshot = await getDocs(feedbackQuery);
                const feedbackList = feedbackSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUserFeedback(feedbackList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
                setError(null);
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [userId]);

    const handleDeleteFeedback = async (feedbackId) => {
        if (!confirm("Are you sure you want to delete this feedback?")) return;

        setDeleting(feedbackId);
        try {
            await deleteDoc(doc(db1, "feedback", feedbackId));
            setUserFeedback(userFeedback.filter((f) => f.id !== feedbackId));
            alert("Feedback deleted successfully");
        } catch (err) {
            console.error("Error deleting feedback:", err);
            alert("Failed to delete feedback");
        } finally {
            setDeleting(null);
        }
    };

    const isOwnProfile = currentUser?.uid === userId;
    const userInitial = profileUser?.email?.charAt(0).toUpperCase() || "U";
    const joinedDate = profileUser?.createdAt
        ? new Date(profileUser.createdAt).toLocaleDateString()
        : "Unknown";
    const memberDays = profileUser?.createdAt
        ? Math.floor((new Date() - new Date(profileUser.createdAt)) / (1000 * 60 * 60 * 24))
        : 0;

    if (loading) {
        return (
            <div className="min-h-screen py-8 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center py-20">Loading...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen py-8 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <Link href="/pp-feedbacks" className="flex items-center gap-2 text-blue-600 hover:underline mb-6">
                        <ArrowLeft size={18} />
                        Back to Feedback
                    </Link>
                    <div className="border border-red-500/30 rounded-2xl p-6 text-center text-red-600">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <Link href="/pp-feedbacks" className="flex items-center gap-2 text-blue-600 hover:underline mb-6">
                    <ArrowLeft size={18} />
                    Back to Feedback
                </Link>

                {/* Profile Header */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 mb-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <Link href={`/profile/view?id=${userId}`} className="hover:opacity-80 transition">
                            {profileUser?.profileImage ? (
                                <img
                                    src={profileUser.profileImage}
                                    alt={profileUser.name}
                                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-purple-500 cursor-pointer"
                                />
                            ) : (
                                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-4xl font-bold cursor-pointer">
                                    {userInitial}
                                </div>
                            )}
                        </Link>

                        <div className="text-center sm:text-left flex-1">
                            <h1 className="text-3xl sm:text-4xl font-bold">{profileUser?.name || "User"}</h1>
                            <p className="text-gray-600 break-all">{profileUser?.email}</p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-4 text-sm text-gray-500">
                                <span>Joined {joinedDate}</span>
                                <span className="hidden sm:inline">•</span>
                                <span>Member for {memberDays} days</span>
                            </div>
                        </div>

                        {isOwnProfile && (
                            <Link
                                href="/profile"
                                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition"
                            >
                                Edit Profile
                            </Link>
                        )}
                    </div>
                </div>

                {/* Feedback Section */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-bold mb-6">
                        {isOwnProfile ? "Your Feedback" : `${profileUser?.name}'s Feedback`}
                    </h2>

                    {userFeedback.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                            <p className="text-gray-600 mb-4">No feedback submitted yet</p>
                            {isOwnProfile && (
                                <Link
                                    href="/feedback"
                                    className="inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                                >
                                    Submit Feedback
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {userFeedback.map((item) => (
                                <div key={item.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold break-words">{item.title}</h3>
                                            <span className="inline-block mt-2 px-3 py-1 bg-purple-500/20 text-purple-700 rounded-full text-sm capitalize font-medium">
                                                {item.feedbackType}
                                            </span>
                                        </div>

                                        {isOwnProfile && (
                                            <button
                                                onClick={() => handleDeleteFeedback(item.id)}
                                                disabled={deleting === item.id}
                                                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition disabled:opacity-50 flex-shrink-0"
                                            >
                                                <Trash2 size={18} />
                                                {deleting === item.id ? "Deleting..." : "Delete"}
                                            </button>
                                        )}
                                    </div>

                                    <p className="text-gray-600 mb-3">{item.message}</p>

                                    <div className="flex items-center gap-2 pt-4 border-t text-sm text-gray-500">
                                        <Calendar size={16} />
                                        {new Date(item.createdAt).toLocaleDateString()} at{" "}
                                        {new Date(item.createdAt).toLocaleTimeString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}