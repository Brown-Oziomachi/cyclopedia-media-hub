"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db1 } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

// Helper: Get first 150 chars of content as snippet, ending cleanly
const getExcerpt = (text, maxLength = 150) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  let snippet = text.slice(0, maxLength);
  // Cut off at last space for neatness
  snippet = snippet.slice(0, snippet.lastIndexOf(" "));
  return snippet + "...";
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState([]);
  const queryTerm = searchParams.get("q")?.toLowerCase() || "";

  const searchByTagString = async (tag) => {
    const snapshot = await getDocs(collection(db1, "cyclopedia"));
    const allPosts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return allPosts.filter((post) => {
      if (!post.tags) return false;
      const tagsArray = post.tags.split(",").map((t) => t.trim().toLowerCase());
      return tagsArray.includes(tag.toLowerCase());
    });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (!queryTerm) {
        setResults([]);
        return;
      }
      const filteredPosts = await searchByTagString(queryTerm);
      setResults(filteredPosts);
    };
    fetchPosts();
  }, [queryTerm]);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Search results for &quot;{queryTerm}&quot;
      </h1>

      {results.length === 0 ? (
        <p className="text-gray-600">No matching posts found.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {results.map((post) => (
            <li key={post.id} className="py-6">
              <Link
                href={`/blog/${post.id}`}
                className="text-blue-700 text-xl font-semibold hover:underline"
              >
                {post.title}
              </Link>
              <p className="mt-1 text-gray-800 leading-relaxed">
                {getExcerpt(post.content || "", 200)}
              </p>
              {post.tags && (
                <p className="mt-1 text-sm text-gray-500 italic">
                  Tags: {post.tags}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
