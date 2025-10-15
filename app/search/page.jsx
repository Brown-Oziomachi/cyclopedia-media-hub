"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { db1 } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const term = searchParams.get("q")?.toLowerCase() || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper functions
  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const createFullSlug = (title, id) => {
    return `${createSlug(title)}--${id}`;
  };

  useEffect(() => {
    if (!term) return;

    const fetchResults = async () => {
      setLoading(true);
      const q = collection(db1, "blogs");
      const snapshot = await getDocs(q);

      const terms = term
        .split(" ")
        .map((t) => t.trim())
        .filter(Boolean);

      const matched = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((post) =>
          terms.some(
            (t) =>
              post.title?.toLowerCase().includes(t) ||
              post.subtitle?.toLowerCase().includes(t) ||
              post.tags?.some((tag) => tag.toLowerCase().includes(t))
          )
        );

      setResults(matched);
      setLoading(false);
    };

    fetchResults();
  }, [term]);

  return (
    <div className="max-w-3xl mx-auto py-2 max-lg:mt-20 mt-25 p-5 lg:mt-30">
      <h1 className="text-lg mb-3 text-center">
        You Searched for: <span className="font-semibold">{term}</span> in{" "}
        <span className="text-purple-700 font-bold">Cyclopedia</span>
      </h1>

      {loading ? (
        <p className="text-center text-lg">
          Searching{" "}
          <span className="font-bold text-purple-600 animate-pulse">
            {term}
          </span>
          ...
        </p>
      ) : results.length > 0 ? (
        results.map((post) => (
          <div key={post.id} className="mb-3">
            <Link href={`/news/${createFullSlug(post.title, post.id)}`}>
              <div className="relative rounded-lg transition overflow-hidden">
                {/* {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-40 object-cover"
                  />
                )} */}
                <h2 className="text-lg text-blue-400 hover:underline p-1">
                  {post.title}
                </h2>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {post.subtitle || "No description available."}
              </p>
              <p className="text-xs mt-2">
                {post.createdAt?.toDate().toDateString()}
              </p>
            </Link>
          </div>
        ))
      ) : (
        <p className="text-center">
          Content not available:{" "}
          <span>
            We are currently expanding our coverage on{" "}
            <span className="font-bold text-xl text-purple-600">{term}</span>.
            Please check back soon for updates. Or check your{" "}
            <span className="text-purple-600 animate-pulse">
              network connection,
            </span>{" "}
            thank you......
          </span>
        </p>
      )}
    </div>
  );
}
