"use client";
import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function AdminPage() {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("youtube");

  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, "settings", "liveStream");
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setUrl(snap.data().url);
        setPlatform(snap.data().platform);
      }
    };
    fetchData();
  }, []);

  // 🔹 Convert normal URL → embed URL
  const convertToEmbed = (url, platform) => {
    if (platform === "youtube") {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (platform === "twitch") {
      const channel = url.split("twitch.tv/")[1];
      return `https://player.twitch.tv/?channel=${channel}&parent=localhost`; // change parent on deploy
    }
    if (platform === "facebook") {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        url
      )}&show_text=false&autoplay=true`;
    }
    if (platform === "vimeo") {
      const id = url.split("/").pop();
      return `https://player.vimeo.com/video/${id}`;
    }
    return url;
  };

  const handleSave = async () => {
    const embedUrl = convertToEmbed(url, platform);
    const ref = doc(db, "settings", "liveStream");
    await setDoc(ref, { url: embedUrl, platform });
    alert("✅ Livestream updated!");
  };

  return (
    <div className="max-w-lg mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Update Livestream</h1>

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
        className="w-full p-2 border rounded mb-3"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste livestream link"
      />

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}
