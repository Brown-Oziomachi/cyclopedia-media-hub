"use client";
import { useState, useEffect } from "react";


const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = "UCS3wBQ7EPJtg0T55Zpw34xg"; 
const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&key=${API_KEY}`;


export default function VideoList() {
  const [videos, setVideos] = useState([]);

  const channelUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&key=${API_KEY}`;

useEffect(() => {
    fetch(channelUrl)
        .then((res) => res.json())
        .then((data) => setVideos(data.items))
        .catch((error) => console.error("Error fetching videos:", error));
}, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <div key={video.id.videoId} className="bg-gradient-to-r from-gray-900 via-black to-orange-400 p-4 rounded-lg">
          <iframe
            width="100%"
            height="200"
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            frameBorder="0"
            allowFullScreen
          />
          <h3 className="text-white mt-2">{video.snippet.title}</h3>
        </div>
      ))}
    </div>
  );
}
