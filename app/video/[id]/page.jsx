"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

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

  // Decode URL params
  const rawUrl = searchParams.get("url") || "";
  const rawTitle = searchParams.get("title") || "";
  const rawDesc = searchParams.get("desc") || "";

  // Decode URI components
  const decodedUrl = decodeURIComponent(rawUrl);
  const decodedTitle = decodeURIComponent(rawTitle);
  const decodedDesc = decodeURIComponent(rawDesc);

  // Convert YouTube watch URLs to embed URLs
  const videoURL = getYouTubeEmbedURL(decodedUrl);

  if (!decodedUrl) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <p>Invalid video URL</p>
      </main>
    );
  }

  const isDirectVideo = videoURL.match(/\.(mp4|webm|ogg)$/i);

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-12 flex flex-col items-center max-w-4xl mx-auto">
      <button
        className="mb-8 px-6 py-2 bg-yellow-500 text-black rounded-lg font-semibold mt-15"
        onClick={() => router.back()}
      >
        ← Back
      </button>

      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
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
        <h1 className="text-xl font-bold mb-4 text-center">{decodedTitle}</h1>
        <p className="text-gray-300 mb-8 text-center">{decodedDesc}</p>
        
    </main>
  );
};

export default VideoPage;
