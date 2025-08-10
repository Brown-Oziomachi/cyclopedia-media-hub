"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db1 } from "@/lib/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState([]);
  const queryTerm = searchParams.get("q");

  useEffect(() => {
    const fetchPosts = async () => {
      if (!queryTerm) return;
      const q = query(
        collection(db1, "cyclopedia"),
        where("tags", "array-contains", queryTerm.toLowerCase())
      );

      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setResults(posts);
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
                className="text-blue-500 hover:underline"
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
