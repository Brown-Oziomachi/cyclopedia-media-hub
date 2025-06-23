"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { LoaderCircle } from "lucide-react";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [platform, setPlatform] = useState("cnn");
  const [error, setError] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      setError("API Key is missing!.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?sources=${platform}&apiKey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setNews(data.articles || []);
      } catch (error) {
        setError(error.message || "Something went wrong");
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [platform, apiKey]);

  const handlePlatformChange = (event) => {
    setPlatform(event.target.value);
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-400/5 gap-6">
          <h1 className="text-xl lg:text-6xl font-extrabold tracking-wide leading-tight text-white relative">
            Fetching News
          </h1>
          <LoaderCircle size={50} speed={1.1} color="orange" className="animate-spin" />
          <img
            src="logo.png"
            alt="My Logo"
            className="h-30 lg:h-30 mt-10 animate-pulse"
          />
        </div>
      ) : (
        <div className="bg-gray-400/5 border-x text-white min-h-screen py-10 px-5">
          {/* Header Section */}
          <div className="text-center mb-10 mt-10">
            <img src="logo.png" alt="Global News Logo" width={100} height={100} className="mx-auto" />
            <h1 className="text-3xl font-bold mt-4 text-white">Global News</h1>
            <p className="text-lg text-gray-400 mt-2">
              Your hub for the latest updates from trusted sources worldwide 🌍
            </p>
          </div>

          {/* Dropdown News Sources */}
          <div className="mb-10 text-center lg:text-left">
            <label htmlFor="news-sources" className="block text-lg font-bold mb-3">
              Select a News Source:
            </label>
            <select
              id="news-sources"
              className="py-2 px-4 bg-gray-400/5 border-x text-black rounded-lg shadow-md hover:bg-gray-700 transition-all"
              value={platform}
              onChange={handlePlatformChange}
            >
              {[
                "reuters",
                "cnn",
                "bbc-news",
                "al-jazeera-english",
                "google-news",
                "the-new-york-times",
                "the-washington-post",
                "the-hill",
                "the-verge",
                "the-economist",
                "the-wall-street-journal",
                "africa-news",
                "mg-africa",
                "all-africa",
                "news24",
                "citizen-digital",
                "the-nation-online-ng",
                "punch-ng",
                "vanguard-ngr",
                "guardian-ng",
                "daily-trust",
              ].map((source) => (
                <option key={source} value={source}>
                  {source.replace(/-/g, " ").toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* News Display */}
          {error ? (
            <div className="text-center text-red-500">
              <p>Error fetching news: {error}</p>
            </div>
          ) : news.length === 0 ? (
            <div className="text-center text-gray-400">
              <p>No news articles available.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((article, index) => (
                <div key={index} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                      loading="lazy"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{article.title || "Untitled"}</h3>
                    <p className="text-gray-400 mt-1">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-500 mt-2">{article.description || "No description available"}</p>
                    {article.url && (
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline mt-4 block"
                      >
                        Read more
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Page;
