"use client";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/auth";

function Loader() {
  return (
    <div className="flex justify-center items-center w-full h-full bg-black">
      <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
    </div>
  );
}

export default function LiveStreamSwitcher() {
  const [platform, setPlatform] = useState("youtube");
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoList, setVideoList] = useState([]);

  const handleLoad = () => setLoading(false);

  // Fetch admin livestream from Firestore
  useEffect(() => {
    async function fetchLinks() {
      try {
        const ref = doc(db, "settings", "liveStream");
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          const liveVideo = {
            id: "admin-live",
            title: "🔴 Cyclopedia Live Stream",
            platform: data.platform,
            url: data.url,
          };

          // Add live video to video list
          setVideoList((prev) => [liveVideo, ...prev]);

          // Set as default if no current video
          if (!currentVideo) setCurrentVideo(liveVideo);
          setPlatform(data.platform);
        }
      } catch (err) {
        console.error("Failed to fetch live stream:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLinks();
  }, []);

  // Sample fallback videos
  useEffect(() => {
    const fallbackVideos = [
      {
        id: 1,
        title:
          "Israeli strikes intensify on Gaza City as forced displacement plan advances",
        platform: "youtube",
        url: "https://www.youtube.com/embed/2-6n7_GxkwA?autoplay=1&mute=1",
      },
      {
        id: 2,
        title:
          "Displaced Palestinians in Gaza City battle hunger as Israeli ground operations intensify",
        platform: "youtube",
        url: "https://www.youtube.com/embed/WptREEgMqI0?autoplay=1&mute=1",
      },
    ];

    // Only add fallback if videoList is empty
    setVideoList((prev) => (prev.length ? prev : fallbackVideos));

    if (!currentVideo && fallbackVideos.length)
      setCurrentVideo(fallbackVideos[0]);
  }, []);

  const embeds = {
    youtube: currentVideo?.url ? (
      <iframe
        className="w-full h-full"
        src={currentVideo.url}
        title="YouTube Live"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={handleLoad}
      />
    ) : null,
    twitch: currentVideo?.url ? (
      <iframe
        className="w-full h-full"
        src={currentVideo.url}
        title="Twitch Live"
        frameBorder="0"
        allow="autoplay"
        allowFullScreen
        onLoad={handleLoad}
      />
    ) : null,
    facebook: currentVideo?.url ? (
      <iframe
        className="w-full h-full"
        src={currentVideo.url}
        title="Facebook Live"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        onLoad={handleLoad}
      />
    ) : null,
    vimeo: currentVideo?.url ? (
      <iframe
        className="w-full h-full"
        src={currentVideo.url}
        title="Vimeo Live"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        onLoad={handleLoad}
      />
    ) : null,
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 py-10 bg-black text-white mt-10">
      <h2 className="text-2xl font-bold mt-20">📺 Live Broadcast</h2>
      <h3 className="text-center text-gray-400 text-xs">
        We’ll notify you through Cyclopedia once the live broadcast starts.
      </h3>

      {/* Platform Dropdown */}
      <select
        value={platform}
        onChange={(e) => {
          const newPlatform = e.target.value;
          setPlatform(newPlatform);

          const selected = videoList.find((v) => v.platform === newPlatform);
          setCurrentVideo(selected || null);
          setLoading(true);
        }}
        className="px-4 py-2 rounded-lg border border-gray-600 bg-black text-white mt-4"
      >
        <option value="youtube">YouTube</option>
        <option value="twitch">Twitch</option>
        <option value="facebook">Facebook</option>
        <option value="vimeo">Vimeo</option>
      </select>

      {/* Main Video Container */}
      <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-lg relative mt-4">
        {loading && <Loader />}
        <div className={loading ? "opacity-0 absolute inset-0" : "relative"}>
          {currentVideo?.url ? embeds[platform] : null}
        </div>
      </div>

      {/* Video List */}
      <div className="w-full max-w-4xl mt-6 flex flex-col gap-2">
        {videoList.map((video) => (
          <button
            key={video.id}
            onClick={() => {
              setCurrentVideo(video);
              setPlatform(video.platform);
              setLoading(true);
            }}
            className={`w-full p-5 text-center text-sm rounded-lg transition ${
              currentVideo?.id === video.id
                ? "bg-purple-700"
                : "bg-gray-900 hover:bg-gray-800"
            }`}
          >
            {video.title}
          </button>
        ))}
      </div>
    </div>
  );
}
