"use client";
import { useState, useEffect } from "react";


const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = "UCS3wBQ7EPJtg0T55Zpw34xg"; 
const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&key=${API_KEY}`;


export default function VideoList() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // Add a search form for user input
  const handleInputChange = (e) => setSearchTerm(e.target.value);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&q=${encodeURIComponent(searchTerm)}&key=${API_KEY}`;
    fetch(searchUrl)
      .then((res) => res.json())
      .then((data) => setVideos(data.items))
      .catch((error) => console.error("Error fetching videos:", error));
  };

    // Fetch videos on initial mount
    useEffect(() => {
      const channelUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&key=${API_KEY}`;
      fetch(channelUrl)
        .then((res) => res.json())
        .then((data) => setVideos(data.items))
        .catch((error) => console.error("Error fetching videos:", error));
    }, []);
  
    return (
      <>
        <form onSubmit={handleSearch} className="mb-6 flex gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for a video..."
            className="flex-1 p-2 rounded-l bg-gray-400/5  text-white outline-none"
          />
          <button
            type="submit"
            className="bg-gray-400/5 border-x  text-white px-4 py-2 rounded-r"
          >
            Search
          </button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos?.map((video) => (
            <div key={video.id.videoId} className="bg-black p-4 rounded-lg">
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
      </>
    );
  }
  
