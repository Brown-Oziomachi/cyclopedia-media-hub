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
      const terms = term
        .split(" ")
        .map((t) => t.trim())
        .filter(Boolean);

      // Search in blogs collection
      const blogsSnapshot = await getDocs(collection(db1, "blogs"));
      const blogResults = blogsSnapshot.docs
        .map((doc) => ({ id: doc.id, type: "article", ...doc.data() }))
        .filter((post) =>
          terms.some(
            (t) =>
              post.title?.toLowerCase().includes(t) ||
              post.subtitle?.toLowerCase().includes(t) ||
              post.tags?.some((tag) => tag.toLowerCase().includes(t))
          )
        );

      // Static pages that can be searched
      const staticPages = [
        {
          id: "director",
          type: "page",
          title: "Director",
          subtitle:
            "Meet Brown Oziomachi, founder and director of The Cyclopedia",
          url: "/director",
          createdAt: new Date("2025-01-01"),
        },
        {
          id: "privacy-policy",
          type: "page",
          title: "Privacy Policy",
          subtitle: "Our commitment to protecting your privacy",
          url: "/privacy-policy",
          createdAt: new Date("2025-01-01"),
        },
        {
          id: "terms-of-service",
          type: "page",
          title: "Terms of Service",
          subtitle: "Terms and conditions for using The Cyclopedia",
          url: "/terms-of-services",
          createdAt: new Date("2025-01-01"),
        },
        {
          id: "feedback",
          type: "page",
          title: "Feedback",
          subtitle: "Share your feedback with us",
          url: "/feedback",
          createdAt: new Date("2025-01-01"),
        },
        {
          id: "support",
          type: "page",
          title: "Support",
          subtitle: "Get help and support from our team",
          url: "/contact",
          createdAt: new Date("2025-01-01"),
        },
      ];

      const pageResults = staticPages.filter((page) =>
        terms.some(
          (t) =>
            page.title.toLowerCase().includes(t) ||
            page.subtitle.toLowerCase().includes(t)
        )
      );

      const allResults = [...blogResults, ...pageResults];
      setResults(allResults);
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
        results.map((item) => (
          <div key={`${item.type}-${item.id}`} className="mb-3">
            <Link
              href={
                item.type === "page"
                  ? item.url
                  : `/news/${createFullSlug(item.title, item.id)}`
              }
            >
              <div className="relative rounded-lg transition overflow-hidden">
                <h2 className="text-lg text-blue-400 hover:underline p-1">
                  {item.title}
                  {item.type === "page" && (
                    <span className="ml-2 text-xs bg-purple-600 text-white px-2 py-1 rounded">
                      Page
                    </span>
                  )}
                </h2>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {item.subtitle || "No description available."}
              </p>
              <p className="text-xs mt-2">
                {item.createdAt?.toDate?.().toDateString() || ""}
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
