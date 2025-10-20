"use client";
import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs, where, countDocuments } from "firebase/firestore";
import { auth, db1 } from "@/lib/firebaseConfig";
import { Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { formatFirestoreDate } from "@/utils/dateUtils";

export default function MembersPage() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [sortBy, setSortBy] = useState("recent"); // "recent", "name", "subscribers"
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user === null) {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (!user) return;
        const fetchMembers = async () => {
            try {
                setLoading(true);
                const usersRef = collection(db1, "users");
                const q = query(usersRef, orderBy("createdAt", "desc"));
                const snapshot = await getDocs(q);

                // Fetch feedback counts for each user
                const usersData = await Promise.all(
                    snapshot.docs.map(async (doc) => {
                        const data = doc.data();
                        const name =
                            data.name ||
                            data.displayName ||
                            data.email?.split("@")[0] ||
                            "User";
                        const initials = name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2);

                        // Query feedback collection for this user's ID
                        const feedbackQuery = query(
                            collection(db1, "feedback"),
                            where("userId", "==", doc.id)
                        );
                        const feedbackSnapshot = await getDocs(feedbackQuery);
                        const feedbackCount = feedbackSnapshot.size;

                        return {
                            id: doc.id,
                            ...data,
                            name: name.charAt(0).toUpperCase() + name.slice(1),
                            initials,
                            subscriberCount: feedbackCount,
                        };
                    })
                );

                setMembers(usersData);
                setError(null);
            } catch (err) {
                console.error("Error loading members:", err);
                setError("Failed to load members.");
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, [user]);

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

    const sortedMembers = () => {
        const sorted = [...members];

        if (sortBy === "name") {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "subscribers") {
            sorted.sort((a, b) => (b.subscriberCount || 0) - (a.subscriberCount || 0));
        } else {
            // recent (default)
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        return sorted;
    };

    if (loading) {
        return (
            <div className="min-h-screen py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl font-bold mb-8 text-center">Cyclopedia Subscribers</h1>
                    <div className="border rounded-2xl overflow-hidden animate-pulse bg-gray-50 dark:bg-gray-900">
                        <div className="h-12 bg-gray-200 dark:bg-gray-800" />
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-16 border-t bg-gray-100 dark:bg-gray-800" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // 🔒 Not logged in view
    if (!user) {
        return (
           <div 
            className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative"
            style={{
                backgroundImage: 'url("/thecyclo.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10">
                <div className="mb-4 text-white drop-shadow-lg text-6xl">👥</div>
                <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-lg">Subscribers Area Locked</h1>
                <p className="text-gray-100 mb-6 max-w-md drop-shadow-md">
                    You must be signed in to view all Cyclopedia subscribers.
                </p>
               <button
    onClick={() => router.push("/login")}
    className="px-6 py-3 bg-purple-700 z-[999] cursor-pointer hover:bg-purple-800 text-white rounded-xl transition font-semibold"
>
    Sign In to Continue
</button>
            </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-16 px-4 md:px-8 ">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12 lg:mt-30">
                    <div className="inline-flex items-center justify-center mb-4 p-3 rounded-full shadow-lg bg-gradient-to-br from-purple-600 to-purple-700 text-white">
                        <Users size={24} />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        The Cyclopedia Subscribers
                    </h1>
                    <p className="text-lg">
                        Meet all our amazing community subscribers in one place.
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                        Total Subscribers: <span className="font-semibold">{members.length}</span>
                    </p>
                </div>

                {error && (
                    <div className="border border-red-500/30 rounded-2xl p-6 mb-12 text-center text-red-500 ">
                        {error}
                    </div>
                )}

                {members.length === 0 ? (
                    <div className="text-center py-20  rounded-2xl">
                        <Users size={48} className="mx-auto mb-4 t" />
                        <p className="text-lg t">No subscribers found yet.</p>
                    </div>
                ) : (
                    <div className="rounded-2xl shadow-lg overflow-hidden">
                        {/* Table Header with Sort Controls */}
                        <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 ">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <h2 className="text-sm font-semibold ">
                                    All Subscribers ({members.length})
                                </h2>
                                <div className="flex gap-2 flex-wrap">
                                    <button
                                        onClick={() => setSortBy("recent")}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${sortBy === "recent"
                                                ? "bg-purple-600 text-white"
                                                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                                            }`}
                                    >
                                        Recent
                                    </button>
                                    <button
                                        onClick={() => setSortBy("name")}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${sortBy === "name"
                                                ? "bg-purple-600 text-white"
                                                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                                            }`}
                                    >
                                        Name
                                    </button>
                                    <button
                                        onClick={() => setSortBy("subscribers")}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${sortBy === "subscribers"
                                                ? "bg-purple-600 text-white"
                                                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                                            }`}
                                    >
                                        Feedback
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-800">
                                        <th className="px-6 py-4 text-left text-xs font-semibold  uppercase tracking-wider">
                                            Channel
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                                            Joined
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                                            Feedback Count
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedMembers().map((member, index) => (
                                        <tr
                                            key={member.id}
                                            className="border-b border-gray-200  transition"
                                        >
                                            {/* Channel */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {member.profileImage ? (
                                                        <img
                                                            src={member.profileImage}
                                                            alt={member.name}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div
                                                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(
                                                                member.name
                                                            )} flex items-center justify-center font-semibold text-sm  flex-shrink-0`}
                                                        >
                                                            {member.initials}
                                                        </div>
                                                    )}
                                                    <div className="text-left">
                                                        <p className="font-semibold ">
                                                            {member.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {member.email || "No email"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Date Subscribed */}
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {formatFirestoreDate(member.createdAt)}
                                            </td>

                                            {/* Subscriber Count */}
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200">
                                                    {member.subscriberCount} {member.subscriberCount === 1 ? "feedback" : "feedbacks"}
                                                </span>
                                            </td>

                                            {/* Action */}
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={`/profile/view?id=${member.id}`}
                                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold text-sm transition"
                                                >
                                                    VIEW PROFILE
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}