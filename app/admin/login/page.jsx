"use client";
import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/auth";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

export default function AdminPage() {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("youtube");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, [auth]);

  // Fetch existing livestream
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ref = doc(db, "settings", "liveStream");
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setUrl(snap.data().originalUrl || snap.data().url);
          setPlatform(snap.data().platform);
        }
      } catch (err) {
        console.error("Error fetching livestream data:", err);
      }
    };
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

    if (platform === "twitch") {
      const channel = url.split("twitch.tv/")[1]?.split("?")[0];
      if (!channel) return url;
      const parent = window.location.hostname;
      return `https://player.twitch.tv/?channel=${channel}&parent=${parent}`;
    }

    if (platform === "facebook") {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        url
      )}&show_text=false&autoplay=true`;
    }

    if (platform === "vimeo") {
      const id = url.split("/").pop()?.split("?")[0];
      return id ? `https://player.vimeo.com/video/${id}?autoplay=1` : url;
    }

    return url;
  };

  const handleSave = async () => {
    if (!user) return alert("❌ Please log in first.");
    if (!url) return alert("❌ Please enter a valid livestream link.");

    setLoading(true);
    try {
      const embedUrl = convertToEmbed(url, platform);
      const ref = doc(db, "settings", "liveStream");
      await setDoc(ref, { url: embedUrl, originalUrl: url, platform });
      alert("✅ Livestream updated!");
    } catch (err) {
      console.error("Failed to update livestream:", err);
      alert("❌ Failed to update livestream. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Login failed:", err);
      alert("❌ Login failed. Check console.");
    }
  };

  if (!user) {
    return (
      <div className="max-w-lg mx-auto p-5 text-center">
        <h1 className="text-2xl font-bold mt-20 mb-4">Admin Login Required</h1>
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

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
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600"
        }`}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
