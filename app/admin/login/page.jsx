"use client";
import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/auth";

export default function AdminPage() {
  const [liveVideos, setLiveVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("youtube");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const ref = doc(db, "settings", "liveStream");
      const snap = await getDoc(ref);
      if (snap.exists()) setLiveVideos(snap.data().liveVideos || []);
    }
    fetchData();
  }, []);

  const convertToEmbed = (url, platform) => {
    if (!url) return "";
    if (platform === "youtube") {
      let videoId = "";
      if (url.includes("watch?v=")) videoId = url.split("v=")[1]?.split("&")[0];
      else if (url.includes("/live/"))
        videoId = url.split("/live/")[1]?.split("?")[0];
      else if (url.includes("youtu.be/"))
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return videoId
        ? `https://www.youtube.com/embed/${videoId}?autoplay=1`
        : url;
    }
    return url; // Extend for Twitch, Facebook, Vimeo
  };

  const handleAddVideo = async () => {
    if (!title || !url) return alert("Enter title and URL");
    setLoading(true);
    try {
      const newVideo = {
        id: Date.now().toString(),
        title,
        platform,
        originalUrl: url,
        url: convertToEmbed(url, platform),
      };
      const updatedVideos = [...liveVideos, newVideo];
      const ref = doc(db, "settings", "liveStream");
      await setDoc(ref, { liveVideos: updatedVideos });
      setLiveVideos(updatedVideos);
      setTitle("");
      setUrl("");
      alert("✅ Livestream added!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add livestream");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveVideo = async (id) => {
    const updatedVideos = liveVideos.filter((video) => video.id !== id);
    try {
      const ref = doc(db, "settings", "liveStream");
      await setDoc(ref, { liveVideos: updatedVideos });
      setLiveVideos(updatedVideos);
      alert("🗑️ Livestream removed!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to remove livestream");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4 mt-20 lg:py-20">Manage Livestreams</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />
      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      >
        <option value="youtube">YouTube</option>
        <option value="twitch">Twitch</option>
        <option value="facebook">Facebook</option>
        <option value="vimeo">Vimeo</option>
      </select>
      <input
        type="text"
        placeholder="Livestream URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />
      <button
        onClick={handleAddVideo}
        disabled={loading}
        className={`w-full py-2 rounded text-white ${
          loading ? "bg-gray-500" : "bg-blue-600"
        }`}
      >
        {loading ? "Adding..." : "Add Livestream"}
      </button>

      <div className="mt-6">
        <h2 className="font-bold mb-2">Current Livestreams</h2>
        {liveVideos.map((video) => (
          <div
            key={video.id}
            className="p-2 border-b flex justify-between items-center"
          >
            <p>
              {video.title} ({video.platform})
            </p>
            <button
              onClick={() => handleRemoveVideo(video.id)}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
