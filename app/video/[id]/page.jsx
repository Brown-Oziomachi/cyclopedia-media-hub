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

<form action="https://yourlist.usX.list-manage.com/subscribe/post?u=YOUR_USER_ID&amp;id=YOUR_LIST_ID" method="post" target="_blank" rel="noopener noreferrer">
  <input type="email" name="EMAIL" placeholder="Your email" required />
  <button type="submit">Subscribe</button>
</form>

     </main>
  )
}

export default VideoPage;
