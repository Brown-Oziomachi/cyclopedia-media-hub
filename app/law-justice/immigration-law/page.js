"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";

export default function ImmigrationLawPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsRef = collection(db1, "blogs");
                const q = query(
                    postsRef,
                    where("category", "==", "immigration-law"),
                    orderBy("createdAt", "desc"),
                    limit(30)
                );
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPosts(data);
            } catch (error) {
                console.error("Error loading immigration-law posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const createSlug = (title, id) =>
        `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}--${id}`;

    return (
        <main className="w-full  min-h-screen">
            <section className="relative w-full lg:mt-30 h-[400px] flex items-center justify-center text-center bg-gradient-to-r from-amber-700 via-orange-700 to-red-800 overflow-hidden">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative z-10 px-4 lg:mt-20">
                    <p className="inline-block text-amber-600 bg-white/90 font-semibold text-sm px-4 py-1 rounded-full mb-4 uppercase">
                        Immigration Law
                    </p>
                    <h1 className="text-white font-extrabold text-5xl md:text-6xl uppercase mb-3">
                        Truth Behind Immigration
                    </h1>
                    <p className="text-gray-100 text-center mx-auto text-sm md:text-lg">
                        Real stories, migration policies, and the untold sides of movement across borders.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-20">
                {loading ? (
                    <p className="text-center text-gray-500">Loading immigration-law articles...</p>
                ) : posts.length === 0 ? (
                    <p className="text-center text-gray-500">No posts found in Immigration Law category.</p>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {posts.map(post => (
                            <Link
                                key={post.id}
                                href={`/news/${createSlug(post.title, post.id)}`}
                                className="group relative rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                            >
                                {post.imageUrl && (
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                )}
                                <div className="p-6">
                                    <p className="text-sm text-amber-700 font-semibold mb-2">
                                        {post.createdAt?.toDate().toDateString()}
                                    </p>
                                    <h2 className="text-lg font-bold  mb-2 group-hover:text-amber-600 line-clamp-3">
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                                        {post.subtitle}
                                    </p>
                                </div>
                                <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-md">
                                    Immigration
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
