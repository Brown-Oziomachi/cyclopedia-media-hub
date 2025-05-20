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
  const db = getFirestore(app1);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const videosCol = collection(db, "videos");
        const videosSnapshot = await getDocs(videosCol);
        const videosList = videosSnapshot.docs.map((doc) => {
          console.log("Video doc:", doc.id, doc.data()); // Debug output
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
      <main className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <p>Invalid video URL</p>
      </main>
    );
  }

   const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Blog link copied to clipboard!");
  };
  
  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-12 flex flex-col items-center max-w-4xl mx-auto">
      <div className="flex gap-4 mb-8 mt-20">
        <button
          className="px-6 py-2 bg-gray-600 text-black rounded-lg font-semibold"
          onClick={() => router.push("/blog")}
        >
          ← Back
        </button>
        <button
          className="px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold"
          onClick={() => {
           {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }
          }}
        >
          Share
        </button>
      </div>

      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg mb-8">
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

      <h1 className="text-xl font-bold mb-4">{decodedTitle}</h1>
      <p className="text-gray-300 mb-8">{decodedDesc}</p>

      <section className="w-full mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">More Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {moreVideos.length === 0 && (
            <p className="text-center col-span-full text-gray-400">No videos found</p>
          )}
          {moreVideos.map(({ id, url, title, desc }) => {
            if (!url) return null;
            if (url === decodedUrl) return null; // Skip current video
            const embedUrl = getYouTubeEmbedURL(url);

            return (
              <div
                key={id}
                className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-500 transition-shadow bg-gray-800"
                onClick={() =>
                  router.push(
                    `/video?url=${encodeURIComponent(url)}&title=${encodeURIComponent(
                      title || "No title"
                    )}&desc=${encodeURIComponent(desc || "")}`
                  )
                }
              >
                <div className="aspect-video w-full relative">
                  <iframe
                    src={embedUrl}
                    title={title || "Video"}
                    className="w-full h-full pointer-events-none"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
                <h3 className="p-3 text-center text-white font-semibold">{title || "Untitled"}</h3>
                <p className="px-3 pb-4 text-gray-400 text-sm text-center">{desc || ""}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default VideoPage;
