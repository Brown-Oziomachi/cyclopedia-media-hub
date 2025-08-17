"use client";
import { useState } from "react";
import { db1 } from "@/lib/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function AdminLiveStream() {
  const [platform, setPlatform] = useState("youtube");
  const [value, setValue] = useState("");

  // Generate embed link based on platform
const generateEmbedUrl = () => {
  switch (platform) {
    case "youtube":
      return `https://www.youtube.com/embed/live_stream?channel=${value}`;
    case "twitch":
      return `https://player.twitch.tv/?channel=${value}&parent=yourdomain.com`;
    case "facebook":
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        value
      )}&show_text=false&autoplay=true`;
    case "vimeo":
      return `https://player.vimeo.com/video/${value}`;
    default:
      return "";
  }
};


  const saveStream = async () => {
    const url = generateEmbedUrl();
    if (!url) return alert("Please enter a valid ID/URL");

    await setDoc(doc(db1, "livestream", "current"), { url, platform });
    alert("✅ Livestream updated!");
    setValue("");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Update Live Stream</h2>

      {/* Platform Selector */}
      <label className="block mb-2 font-medium">Select Platform</label>
      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 mb-4"
      >
        <option value="youtube">YouTube</option>
        <option value="twitch">Twitch</option>
        <option value="facebook">Facebook</option>
        <option value="vimeo">Vimeo</option>
      </select>

      {/* Input Field */}
      <label className="block mb-2 font-medium">
        {platform === "youtube" && "YouTube Channel ID"}
        {platform === "twitch" && "Twitch Username"}
        {platform === "facebook" && "Facebook Live Video URL"}
        {platform === "vimeo" && "Vimeo Video ID"}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter ID / URL"
        className="w-full border rounded-lg px-3 py-2 mb-4"
      />

      {/* Save Button */}
      <button
        onClick={saveStream}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
}