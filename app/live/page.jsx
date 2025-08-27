"use client";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/auth";
import LiveClock from "@/components/LiveClock";

export default function LiveStreamSwitcher() {
  const [liveVideos, setLiveVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLiveVideos() {
      const ref = doc(db, "settings", "liveStream");
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const videos = snap.data().liveVideos || [];
        setLiveVideos(videos);
        if (videos.length > 0) setCurrentVideo(videos[0]);
      }
      setLoading(false);
    }
    fetchLiveVideos();
  }, []);

  if (loading) return <div className="text-center mt-28">Loading...</div>;
  if (!currentVideo)
    return (
      <div className="text-center mt-20">
        No livestream available. Please check your network connection
      </div>
    );

  // Function to clean embed links (removes branding)
  const getEmbedUrl = (video) => {
    if (video.platform === "youtube") {
      return `${video.url}?autoplay=1&modestbranding=1&showinfo=0&rel=0&controls=0`;
    }
    if (video.platform === "facebook") {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        video.url
      )}&show_text=false&autoplay=true`;
    }
    if (video.platform === "vimeo") {
      return `${video.url}?autoplay=1&title=0&byline=0&portrait=0`;
    }
    if (video.platform === "twitch") {
      return `https://player.twitch.tv/?channel=${video.url}&autoplay=true&parent=yourdomain.com`;
    }
    return video.url;
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      {/* Main Video */}
      <h1 className="text-center mb-5 lg:mt-40 mt-20 uppercase underline">Streaming Real Stories as They Happen</h1>
      <LiveClock/>
      <div className="w-full aspect-video overflow-hidden mb-6 relative mt-10 lg:mt-10 bg-black">
        <iframe
          src={getEmbedUrl(currentVideo)}
          title="Live Broadcast"
          class
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; encrypted-media"
          allowFullScreen
        ></iframe>
        {/* LIVE NOW Badge with Dot */}
        <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
          LIVE NOW
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {liveVideos.map((video, index) => (
          <button
            key={video.id}
            onClick={() => setCurrentVideo(video)}
            className={`p-3 rounded flex justify-between py-0 items-center text-center  ${
              currentVideo.id === video.id
                ? ""
                : "bg-purple-900 hover:bg-gray-800"
            }`}
          >
            <span>
              {video.title} {/* 🔹 Removed platform name from here */}
            </span>
            {index === 0 && (
              <div className="flex items-center gap-1 bg-red-500  text-xs px-2 py-1 rounded">
                <span className="w-2 h-2  rounded-full animate-ping"></span>
                CPD
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
