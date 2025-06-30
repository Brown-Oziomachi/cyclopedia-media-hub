"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app1 } from "@/lib/firebaseConfig";
import Ads from "@/components/community";

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
  const [adShown, setAdShown] = useState(false);

  const db = getFirestore(app1);

  // Fetch videos from Firestore
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

  // Inject Mailchimp script once on mount
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "mcjs";
    script.async = true;
    script.src =
      "https://chimpstatic.com/mcjs-connected/js/users/23e65087a3046b65731008ccb/f3782b3348d3c882f43d3d40e.js";
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById("mcjs");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

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

  const handleBackClick = () => {
    if (!adShown) {
      window.open("https://otieu.com/4/9366150", "_blank");
      setAdShown(true);
      return;
    }
    router.push("/blog");
  };

  const handleSubscribeClick = () => {
    if (!adShown) {
      window.open("https://otieu.com/4/9366150", "_blank");
      setAdShown(true);
      return;
    }
    // Submit the Mailchimp form programmatically
    const form = document.getElementById("mc-embedded-subscribe-form");
    if (form) {
      form.submit();
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 flex flex-col items-center max-w-4xl mx-auto">
      <div className="flex gap-4 mb-8 mt-20">
        <button
          onClick={handleBackClick}
          className="px-6 py-2 bg-green-600 text-black font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition"
          aria-label="Go back to blog"
        >
          ← Back
        </button>

        <button
          onClick={handleCopyLink}
          className="px-6 py-2 bg-green-600 text-black font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition"
          aria-label="Share video link"
        >
          Share
        </button>
      </div>
      <Ads />
      {copySuccess && (
        <div className="mb-4 text-green-400 font-semibold animate-fade-in">
          Link copied to clipboard!
        </div>
      )}

      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-green-600 mb-8">
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
      <p className="mt-4 space-y-20 rounded-lg text-gray-400 leading-relaxed tracking-widest">{decodedDesc}</p>

      {/* Mailchimp subscription form */}
      <form
        action="https://app.us13.list-manage.com/subscribe/post?u=43a30bccc98acfbb16a52d1eb&amp;id=4f4f321a7e&amp;f_id=00bb5fe1f0"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate"
        target="_blank"
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
  type="button"
  onClick={handleSubscribeClick}
  className="flex items-center gap-2 px-8 py-3 rounded-md bg-black text-white font-semibold hover:bg-white hover:text-black border-2 border-white transition focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
  aria-label="Subscribe for updates"
>
  Subscribe for Updates
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
</button>

      </form>
    </main>
  );
};

export default VideoPage;
