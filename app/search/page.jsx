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

  useEffect(() => {
    if (!term) return;

    const fetchResults = async () => {
      const q = collection(db1, "blogs");
      const snapshot = await getDocs(q);

      const terms = term.split(" ").map(t => t.trim()).filter(Boolean);

      const matched = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(post =>
          terms.some(t =>
            post.title?.toLowerCase().includes(t) ||
            post.subtitle?.toLowerCase().includes(t) ||
            post.tags?.some(tag => tag.toLowerCase().includes(t))
          )
        );

      setResults(matched);
    };

    fetchResults();
  }, [term]);

  return (
    <div className="max-w-3xl mx-auto py-2 max-lg:mt-50 mt-25 p-5 lg:mt-50">
      <h1 className="text-lg mb-3">
        Search results for: <span className="font-semibold">{term}</span> in <span className="text-purple-700">Cyclopedia</span>
      </h1>

      {results.length > 0 ? (
        results.map(post => (
          <div key={post.id} className="mb-6">
            <Link href={`/blog/${post.id}`}>
              <h2 className="text-lg text-blue-800 hover:underline">{post.title}</h2>
            </Link>
            <p className="text-sm text-gray-600">{post.subtitle || "No description available."}</p>
          </div>
        ))
      ) : (
        <p className="text-center"> <span className="font-semibold text-xl">{term}</span> is not found. We are adding more news. Check it later <br/>
        </p>
      )}
    </div>
  );
}
