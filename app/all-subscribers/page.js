"use client";
import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs, where } from "firebase/firestore";
import { auth, db1 } from "@/lib/firebaseConfig";
import { Users, Crown, Award, Star, TrendingUp, Calendar, Sparkles, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { formatFirestoreDate } from "@/utils/dateUtils";
import { Undo2 } from "lucide-react";

export default function MembersPage() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [sortBy, setSortBy] = useState("recent");
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
            "from-amber-400 to-yellow-600",
            "from-orange-400 to-amber-600",
            "from-yellow-400 to-orange-500",
            "from-amber-500 to-orange-600",
            "from-yellow-500 to-amber-600",
            "from-orange-500 to-yellow-600",
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const getMemberBadge = (feedbackCount) => {
        if (feedbackCount >= 10) {
            return { icon: Crown, label: "Elite", color: "from-amber-400 to-yellow-600", textColor: "text-amber-600" };
        } else if (feedbackCount >= 5) {
            return { icon: Award, label: "Gold", color: "from-yellow-500 to-amber-500", textColor: "text-yellow-600" };
        } else if (feedbackCount >= 2) {
            return { icon: Star, label: "Silver", color: "from-gray-300 to-gray-400", textColor: "text-gray-600" };
        }
        return { icon: Shield, label: "Member", color: "from-blue-400 to-blue-600", textColor: "text-blue-600" };
    };

    const sortedMembers = () => {
        const sorted = [...members];

        if (sortBy === "name") {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "subscribers") {
            sorted.sort((a, b) => (b.subscriberCount || 0) - (a.subscriberCount || 0));
        } else {
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        return sorted;
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push("/pp-feedbacks");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-gray-900 dark:via-amber-950 dark:to-orange-950 py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 mt-10 lg:mt-30">
                        <div className="inline-flex items-center justify-center mb-6 p-4 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 shadow-2xl shadow-amber-500/50">
                            <Crown size={32} className="text-white" />
                        </div>
                        <div className="h-14 bg-gradient-to-r from-amber-200 to-yellow-200 dark:from-amber-900 dark:to-yellow-900 rounded-2xl w-96 mx-auto mb-4 animate-pulse"></div>
                        <div className="h-6 bg-amber-100 dark:bg-amber-900 rounded-lg w-2/3 mx-auto animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white dark:bg-gray-900 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-6 animate-pulse">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-200 to-yellow-200 dark:from-amber-800 dark:to-yellow-800"></div>
                                    <div className="flex-1">
                                        <div className="h-5 bg-amber-100 dark:bg-amber-900 rounded w-32 mb-2"></div>
                                        <div className="h-4 bg-amber-50 dark:bg-amber-950 rounded w-24"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

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
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-orange-900/80 to-yellow-900/80" />
                <div className="relative z-10 bg-white/10 backdrop-blur-xl border-2 border-amber-400/30 rounded-3xl p-12 shadow-2xl">
                    <div className="inline-flex items-center justify-center mb-6 p-6 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 shadow-2xl">
                        <Crown size={48} className="text-white" />
                    </div>
                    <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-2xl">Premium Subscribers Area</h1>
                    <p className="text-xl text-amber-100 mb-8 max-w-md drop-shadow-lg">
                        Sign in to access our exclusive community of elite subscribers
                    </p>
                    <button
                        onClick={() => router.push("/login")}
                        className="px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 hover:from-amber-500 hover:via-yellow-600 hover:to-orange-600 text-white rounded-xl transition-all font-bold text-lg shadow-2xl hover:shadow-amber-500/50 hover:scale-105"
                    >
                        Sign In to Continue
                    </button>
                </div>
            </div>
        );
    }

    const topMembers = sortedMembers().slice(0, 3);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-gray-900 dark:via-amber-950 dark:to-orange-950 py-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 px-6 py-3 mb-8 font-semibold rounded-xl bg-white dark:bg-gray-900 border-2 border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600 text-amber-700 dark:text-amber-400 transition-all hover:shadow-lg hover:scale-105"
                >
                    <Undo2 className="w-5 h-5" />
                    <span>Back to Feedback</span>
                </button>

                {/* Hero Header */}
                <div className="text-center mb-16 mt-10">
                    <div className="inline-flex items-center justify-center mb-6 p-5 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 shadow-2xl shadow-amber-500/50 animate-pulse">
                        <Crown size={40} className="text-white" />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
                        Elite Subscribers
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4 mx-auto">
                        Meet our distinguished community of premium members
                    </p>

                    {/* Stats Bar */}
                    <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
                        <div className="flex items-center gap-3 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/40 border-2 border-amber-300 dark:border-amber-700 px-6 py-3 rounded-2xl shadow-lg">
                            <Users className="text-amber-600 dark:text-amber-400" size={24} />
                            <div className="text-left">
                                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Members</p>
                                <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">{members.length}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/40 dark:to-orange-900/40 border-2 border-yellow-300 dark:border-yellow-700 px-6 py-3 rounded-2xl shadow-lg">
                            <Sparkles className="text-yellow-600 dark:text-yellow-400" size={24} />
                            <div className="text-left">
                                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Elite Status</p>
                                <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{members.filter(m => m.subscriberCount >= 10).length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top 3 Members Showcase */}
                {topMembers.length > 0 && (
                    <div className="mb-16">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent inline-flex items-center gap-2">
                                <TrendingUp size={28} className="text-amber-600" />
                                Top Contributors
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {topMembers.map((member, index) => {
                                const badge = getMemberBadge(member.subscriberCount);
                                const BadgeIcon = badge.icon;
                                const podiumPosition = index === 0 ? "1st" : index === 1 ? "2nd" : "3rd";
                                const podiumHeight = index === 0 ? "md:scale-110" : "";

                                return (
                                    <div key={member.id} className={`relative bg-white dark:bg-gray-900 border-4 ${index === 0 ? 'border-amber-400 shadow-2xl shadow-amber-500/30' : 'border-amber-200 dark:border-amber-800'} rounded-3xl p-8 hover:scale-105 transition-all duration-300 ${podiumHeight}`}>
                                        {/* Position Badge */}
                                        <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br ${index === 0 ? 'from-amber-400 to-yellow-600' : index === 1 ? 'from-gray-300 to-gray-500' : 'from-orange-400 to-amber-600'} flex items-center justify-center font-bold text-white shadow-lg text-lg border-4 border-white dark:border-gray-900`}>
                                            {index + 1}
                                        </div>

                                        <div className="text-center">
                                            <div className="relative inline-block mb-4">
                                                {member.profileImage ? (
                                                    <img
                                                        src={member.profileImage}
                                                        alt={member.name}
                                                        className="w-24 h-24 rounded-full object-cover border-4 border-amber-300 dark:border-amber-700 shadow-xl"
                                                    />
                                                ) : (
                                                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${getAvatarColor(member.name)} flex items-center justify-center font-bold text-3xl text-white border-4 border-amber-300 dark:border-amber-700 shadow-xl`}>
                                                        {member.initials}
                                                    </div>
                                                )}
                                                <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-900`}>
                                                    <BadgeIcon size={20} className="text-white" />
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{member.email}</p>

                                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${badge.color} text-white font-semibold text-sm shadow-lg mb-4`}>
                                                <BadgeIcon size={16} />
                                                {badge.label} 
                                            </div>

                                            <div className="flex items-center justify-center gap-4 text-sm">
                                                <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                                                    <Zap size={16} />
                                                    <span className="font-bold">{member.subscriberCount}</span>
                                                    <span className="text-gray-600 dark:text-gray-400">feedback</span>
                                                </div>
                                            </div>

                                            <Link
                                                href={`/profile/view?id=${member.id}`}
                                                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                                            >
                                                View Profile
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-800 rounded-2xl p-6 mb-12 text-center">
                        <p className="text-red-600 dark:text-red-400 font-semibold">{error}</p>
                    </div>
                )}

                {/* Sort Controls */}
                <div className="bg-white dark:bg-gray-900 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-6 shadow-xl mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/40">
                                <Users className="text-amber-600 dark:text-amber-400" size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                All Subscribers <span className="text-amber-600 dark:text-amber-400">({members.length})</span>
                            </h2>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                            <button
                                onClick={() => setSortBy("recent")}
                                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${sortBy === "recent"
                                        ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg"
                                        : "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-2 border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600"
                                    }`}
                            >
                                <Calendar size={16} className="inline mr-2" />
                                Recent
                            </button>
                            <button
                                onClick={() => setSortBy("name")}
                                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${sortBy === "name"
                                        ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg"
                                        : "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-2 border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600"
                                    }`}
                            >
                                A-Z
                            </button>
                            <button
                                onClick={() => setSortBy("subscribers")}
                                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${sortBy === "subscribers"
                                        ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg"
                                        : "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-2 border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600"
                                    }`}
                            >
                                <TrendingUp size={16} className="inline mr-2" />
                                Top Contributors
                            </button>
                        </div>
                    </div>
                </div>

                {/* Members Grid */}
                {members.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border-2 border-amber-200 dark:border-amber-800 shadow-xl">
                        <Crown size={64} className="mx-auto mb-6 text-amber-400" />
                        <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">No members found</h3>
                        <p className="text-lg text-gray-600 dark:text-gray-400">Be the first to join our elite community!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedMembers().map((member) => {
                            const badge = getMemberBadge(member.subscriberCount);
                            const BadgeIcon = badge.icon;

                            return (
                                <div
                                    key={member.id}
                                    className="bg-white dark:bg-gray-900 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-6 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 group"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="relative flex-shrink-0">
                                            {member.profileImage ? (
                                                <img
                                                    src={member.profileImage}
                                                    alt={member.name}
                                                    className="w-16 h-16 rounded-full object-cover border-3 border-amber-300 dark:border-amber-700 shadow-lg group-hover:scale-110 transition-transform"
                                                />
                                            ) : (
                                                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getAvatarColor(member.name)} flex items-center justify-center font-bold text-xl text-white border-3 border-amber-300 dark:border-amber-700 shadow-lg group-hover:scale-110 transition-transform`}>
                                                    {member.initials}
                                                </div>
                                            )}
                                            <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-900`}>
                                                <BadgeIcon size={14} className="text-white" />
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 dark:text-white truncate text-lg">{member.name}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{member.email}</p>
                                            <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r ${badge.color} text-white text-xs font-semibold mt-2 shadow-md`}>
                                                <BadgeIcon size={12} />
                                                {badge.label}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-1 mb-1">
                                                <Zap size={14} className="text-amber-600 dark:text-amber-400" />
                                                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Feedback</p>
                                            </div>
                                            <p className="text-lg font-bold text-amber-700 dark:text-amber-300">{member.subscriberCount}</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-1 mb-1">
                                                <Calendar size={14} className="text-amber-600 dark:text-amber-400" />
                                                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Joined</p>
                                            </div>
                                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{formatFirestoreDate(member.createdAt)}</p>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/profile/view?id=${member.id}`}
                                        className="block w-full text-center px-4 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Footer CTA */}
                <div className="mt-16 relative overflow-hidden bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 rounded-3xl p-12 text-center shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent)]"></div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center mb-6 p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                            <Sparkles size={40} className="text-white" />
                        </div>
                        <h2 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
                            Join Our Elite Community
                        </h2>
                        <p className="text-xl text-white/90 mb-8 mx-auto drop-shadow">
                            Share your thoughts and become part of our prestigious members circle
                        </p>
                        <a
                            href="/feedback"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-amber-600 font-bold text-lg rounded-xl transition-all shadow-2xl hover:shadow-3xl hover:scale-105"
                        >
                            <Star size={24} />
                            Share Your Feedback
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}