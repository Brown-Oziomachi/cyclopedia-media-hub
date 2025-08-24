"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db1 } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

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

    const filteredPosts = allPosts.filter((post) => {
      if (!post.tags) return false;
      // Assuming post.tags is a string like "politics, nigeria, election"
      const tagsArray = post.tags.split(",").map((t) => t.trim().toLowerCase());
      return tagsArray.includes(tag.toLowerCase());
    });

    return filteredPosts;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (!queryTerm) {
        setResults([]);
        return;
      }

      try {
        const filteredPosts = await searchByTagString(queryTerm);
        setResults(filteredPosts);
      } catch (error) {
        console.error("Error searching posts:", error);
        setResults([]);
      }
    };

    fetchPosts();
  }, [queryTerm]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Search Results for: "{queryTerm}"
      </h2>
      {results.length === 0 ? (
        <p>No matching posts found.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.id}`}
                className="text-white hover:underline"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
