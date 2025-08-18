"use client";
import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/auth";

export default function AdminPage() {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("youtube");

  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, "settings", "liveStream");
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setUrl(snap.data().originalUrl || snap.data().url);
        setPlatform(snap.data().platform);
      }
    };
    fetchData();
  }, []);

  // 🔹 Convert normal URL → embed URL
  const convertToEmbed = (url, platform) => {
    if (!url) return "";

    if (platform === "youtube") {
      let videoId = "";

      if (url.includes("watch?v=")) {
        videoId = url.split("v=")[1]?.split("&")[0];
      } else if (url.includes("/live/")) {
        videoId = url.split("/live/")[1]?.split("?")[0];
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
      }

      if (!videoId) return url; // fallback
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }

    if (platform === "twitch") {
      const channel = url.split("twitch.tv/")[1]?.split("?")[0];
      if (!channel) return url;
      return `https://player.twitch.tv/?channel=${channel}&parent=localhost`; // change parent on deploy
    }

    if (platform === "facebook") {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        url
      )}&show_text=false&autoplay=true`;
    }

    if (platform === "vimeo") {
      const id = url.split("/").pop()?.split("?")[0];
      if (!id) return url;
      return `https://player.vimeo.com/video/${id}?autoplay=1`;
    }

    return url;
  };

  const handleSave = async () => {
    const embedUrl = convertToEmbed(url, platform);
    const ref = doc(db, "settings", "liveStream");
    await setDoc(ref, {
      url: embedUrl,
      originalUrl: url, // keep original for editing later
      platform,
    });
    alert("✅ Livestream updated!");
  };

  return (
    <div className="max-w-lg mx-auto p-5">
      <img src="hid.png" alt="" className="w-full" />
      <h1 className="text-2xl font-bold mb-4 mt-20">Update Livestream</h1>

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
