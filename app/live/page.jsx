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

  const [youtubeLink, setYoutubeLink] = useState("");
  const [twitchLink, setTwitchLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [vimeoLink, setVimeoLink] = useState("");

  const handleLoad = () => setLoading(false);

  // ✅ Fetch live stream URLs from Firestore on mount
  useEffect(() => {
    async function fetchLinks() {
      const ref = doc(db, "settings", "liveStream");
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setYoutubeLink(data.youtube + "?autoplay=1");
        setTwitchLink(data.twitch + "&autoplay=true&parent=yourdomain.com");
        setFacebookLink(data.facebook + "&autoplay=true");
        setVimeoLink(data.vimeo + "?autoplay=1");
      }
      setLoading(false);
    }
    fetchLinks();
  }, []);

  const embeds = {
    youtube: (
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/BEC41jSWwWM?autoplay=1"
        title="YouTube Live"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={handleLoad}
      ></iframe>
    ),
    twitch: (
      <iframe
        className="w-full h-full"
        src={twitchLink}
        title="Twitch Live"
        frameBorder="0"
        allow="autoplay"
        allowFullScreen
        onLoad={handleLoad}
      ></iframe>
    ),
    facebook: (
      <iframe
        className="w-full h-full"
        src={facebookLink}
        title="Facebook Live"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        onLoad={handleLoad}
      ></iframe>
    ),
    vimeo: (
      <iframe
        className="w-full h-full"
        src={vimeoLink}
        title="Vimeo Live"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        onLoad={handleLoad}
      ></iframe>
    ),
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 py-10 bg-black text-white lg-mt-30 mt-10">
      <h2 className="text-2xl font-bold mt-20">📺 Live Broadcast</h2>
      <h3 className="text-center text-gray-400 text-xs">
        We’ll notify you through Cyclopedia once the live broadcast starts.
      </h3>

      {/* Dropdown Selector */}
      <select
        value={platform}
        onChange={(e) => {
          setLoading(true); // show loader when switching platforms
          setPlatform(e.target.value);
        }}
        className="px-4 py-2 rounded-lg border border-gray-600 bg-black text-white mt-4"
      >
        <option value="youtube">YouTube</option>
        <option value="twitch">Twitch</option>
        <option value="facebook">Facebook</option>
        <option value="vimeo">Vimeo</option>
      </select>

      {/* Video Container */}
      <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-lg relative mt-4">
        {loading && <Loader />}
        <div className={loading ? "opacity-0 absolute inset-0" : "relative"}>
          {embeds[platform]}
        </div>
      </div>
    </div>
  );
}
