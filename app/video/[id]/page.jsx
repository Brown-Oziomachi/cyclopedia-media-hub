"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app1 } from "@/lib/firebaseConfig";

function getYouTubeEmbedURL(url) {
  try {
    const parsedUrl = new URL(url);
    let videoId = null;
    if (parsedUrl.hostname === "youtu.be") {
      videoId = parsedUrl.pathname.slice(1);
    } else if (
      parsedUrl.hostname === "www.youtube.com" ||
      parsedUrl.hostname === "youtube.com"
    ) {
      videoId = parsedUrl.searchParams.get("v");
    }
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return url;
  }
  return url;
}

const VideoPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawUrl = searchParams.get("url") || "";
  const rawTitle = searchParams.get("title") || "";
  const rawDesc = searchParams.get("desc") || "";

  const decodedUrl = decodeURIComponent(rawUrl);
  const decodedTitle = decodeURIComponent(rawTitle);
  const decodedDesc = decodeURIComponent(rawDesc);

  const videoURL = getYouTubeEmbedURL(decodedUrl);
  const isDirectVideo = videoURL.match(/\.(mp4|webm|ogg)$/i);

  const [moreVideos, setMoreVideos] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const db = getFirestore(app1);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const videosCol = collection(db, "videos");
        const videosSnapshot = await getDocs(videosCol);
        const videosList = videosSnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setMoreVideos(videosList);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }
    fetchVideos();
  }, [db]);

  if (!decodedUrl) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white px-4">
        <p className="text-lg font-semibold">Invalid video URL</p>
      </main>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 flex flex-col items-center max-w-4xl mx-auto">
      <div className="flex gap-4 mb-8 mt-20">
        <button
          onClick={() => router.push("/blog")}
          className="px-6 py-2 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition"
          aria-label="Go back to blog"
        >
          ← Back
        </button>
        <button
          onClick={handleCopyLink}
          className="px-6 py-2 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition"
          aria-label="Share video link"
        >
          Share
        </button>
      </div>

      {copySuccess && (
        <div className="mb-4 text-green-400 font-semibold animate-fade-in">
          Link copied to clipboard!
        </div>
      )}

      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-700 mb-8">
        {isDirectVideo ? (
          <video controls className="w-full h-full bg-black">
            <source src={videoURL} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <iframe
            src={videoURL}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            title={decodedTitle}
            frameBorder="0"
          ></iframe>
        )}
      </div>

      <h1 className="text-2xl font-bold mb-4 text-white">{decodedTitle}</h1>
      <p className="text-gray-400 mb-8 leading-relaxed">{decodedDesc}</p>

      <form
        action="https://yourlist.usX.list-manage.com/subscribe/post?u=YOUR_USER_ID&amp;id=YOUR_LIST_ID"
        method="post"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex flex-col sm:flex-row gap-4"
      >
        <input
          type="email"
          name="EMAIL"
          placeholder="Your email"
          required
          className="flex-grow px-4 py-3 rounded-md bg-gray-900 border border-gray-700 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-white transition"
          aria-label="Email address"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-md bg-white text-black font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition"
          aria-label="Subscribe to newsletter"
        >
          Subscribe
        </button>
      </form>
    </main>
  );
};

export default VideoPage;
