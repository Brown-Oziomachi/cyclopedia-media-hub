"use client";
import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { auth, db1 } from "@/lib/firebaseConfig";
import { Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

export default function MembersPage() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
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

                const usersData = snapshot.docs.map((doc) => {
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

                    return {
                        id: doc.id,
                        ...data,
                        name: name.charAt(0).toUpperCase() + name.slice(1),
                        initials,
                    };
                });

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

    if (loading) {
        return (
            <div className="min-h-screen py-12 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-8">Cyclopedia Subscribers</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="border rounded-2xl p-6 animate-pulse bg-gray-50 dark:bg-gray-900"
                            >
                                <div className="w-16 h-16 rounded-full bg-gray-200 mb-4 mx-auto" />
                                <div className="h-4 bg-gray-200 w-24 mx-auto mb-2 rounded" />
                                <div className="h-3 bg-gray-200 w-32 mx-auto rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // 🔒 Not logged in view
    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <Users size={48} className="mb-4 text-purple-600" />
                <h1 className="text-3xl font-bold mb-2">Subscribers Area Locked</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
                    You must be signed in to view all Cyclopedia subscribers.
                </p>
                <button
                    onClick={() => router.push("/login")}
                    className="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl transition"
                >
                    Sign In to Continue
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 ">
                    <div className="inline-flex items-center justify-center lg:mt-30 mb-4 p-3 rounded-full shadow-lg bg-gradient-to-br from-purple-600 to-purple-700 text-white">
                        <Users size={24} />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        Cyclopedia Subscribers
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Meet all our amazing community Subscribers in one place.
                    </p>
                    <p className="mt-3 text-sm opacity-70">
                        Total Subscribers: {members.length}
                    </p>
                </div>

                {error && (
                    <div className="border border-red-500/30 rounded-2xl p-6 mb-12 text-center text-red-500">
                        {error}
                    </div>
                )}

                {members.length === 0 ? (
                    <div className="text-center py-20">
                        <Users size={48} className="mx-auto mb-4" />
                        <p className="text-lg">No subscribers found yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {members.map((member) => (
                            <div
                                key={member.id}
                                className="shadow-lg border-purple-500/30 border rounded-2xl p-6 text-center hover:border-purple-500/30 hover:shadow-xl transition-all"
                            >
                                {member.profileImage ? (
                                    <img
                                        src={member.profileImage}
                                        alt={member.name}
                                        className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                                    />
                                ) : (
                                    <div
                                        className={`w-20 h-20 rounded-full bg-gradient-to-br ${getAvatarColor(
                                            member.name
                                        )} flex items-center justify-center font-bold text-xl text-white mx-auto mb-4`}
                                    >
                                        {member.initials}
                                    </div>
                                )}

                                <h3 className="font-semibold text-lg">{member.name}</h3>
                                <p className="text-sm text-gray-500 truncate">
                                    {member.email || "No email"}
                                </p>

                                <div className="mt-3">
                                    <Link
                                        href={`/profile/view?id=${member.id}`}
                                        className="text-blue-600 hover:underline text-sm font-medium"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
