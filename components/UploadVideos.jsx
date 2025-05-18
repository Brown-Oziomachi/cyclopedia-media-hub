"use client"; // Assuming you're using Next.js app directory

import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig"; // Your Firestore instance
import Link from "next/link";


function AddVideoForm() {
  const [formData, setFormData] = useState({
    title: "Title",
    description: "What is in your mind", // Using description for video content
    genre: "Select genre",
    author: "Admin", // Default author, you might want to change this
    videoURL: "Video URL",   // Field for the video URL
    isVideo: true,  // Crucial field to identify it as a video
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    // Simple validation
    if (!formData.title || !formData.videoURL || !formData.genre) {
      setError("Please fill in Title, Video URL, and Genre.");
      setLoading(false);
      return;
    }

    try {
      const docRef = await addDoc(collection(db1, "blog"), {
        ...formData,
        // timestamp: serverTimestamp(), // Add server timestamp
        // photoURL: '', // Videos usually don't have photoURL like blogs
      });
      console.log("Video added with ID: ", docRef.id);
      setSuccess(true);
      // Clear form
      setFormData({
        title: "",
        description: "",
        genre: "",
        author: "Admin",
        videoURL: "",
        isVideo: true, // Keep isVideo true for adding more videos
         timestamp: new Date().toLocaleDateString(),

      });
    } catch (e) {
      console.error("Error adding document: ", e);
      setError("Failed to add video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Categories list (same as your blog page for consistency)
  const categories = [
    "Webwiz", "Technology", "Spirituality", "Science", "Art", "Entertainment",
    "Crypto", "Blockchain", "Gaming", "Social Media", "Software", "Hardware",
    "Gadgets", "Social network", "Engineering", "Language", "English", "Statistics",
    "Mathematics", "Physics", "Chemistry", "Biology", "Astronomy", "Geography",
    "Psychology", "Philosophy", "Sociology", "Economics", "Law", "AI", "Machine Learning",
    "Data Science", "Cybersecurity", "Cloud Computing", "Lifestyle", "Stories", "Coding",
    "Health", "History", "Nature", "Finance", "Travel", "Faith", "Religion", "Sex",
    "Wealth", "Business", "Ideas", "Action", "Drama", "Romance", "Music", "Mystery",
    "Fantasy", "Education", "Horror", "Comedy", "Adventure", "Documentary", "Marriage",
    "Teens", "Fashions", "Mothers", "Knowledge", "Ignorance", "Love", "Facts", "Family",
    "Culture", "Fathers", "Divorce", "Sports", "Street", "Strategy", "Animals", "News",
    "Politics", "Prayer", "Relationship", "Wisdom",
  ];

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-orange-400 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-10 text-center mt-20">Add New Video</h1>
      <div className="flex items-center justify-between">
           </div>          
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-2">
            Video Title  <span className="text-red-500 mt-5">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="videoURL" className="block text-sm font-medium text-gray-400 mb-2">
            Video URL  <span className="text-red-500 mt-5">*</span>
          </label>
          <input
            type="url" // Use type="url" for better input validation
            id="videoURL"
            name="videoURL"
            value={formData.videoURL}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="genre" className="block text-sm font-medium text-gray-400 mb-2">
            Genre <span className="text-red-500 mt-5">*</span>
          </label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            required
          >
            <option value="">Select a Genre</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* You might want to make author inputtable or fetch from user context */}
        
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium text-gray-400 mb-2">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
       


        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 rounded-md text-black font-semibold transition ${
            loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-500'
          }`}
        >
          {loading ? 'Adding Video...' : 'Add Video'}
        </button>

        {success && (
          <p className="mt-4 text-green-500 text-center">Video added successfully!</p>
        )}
        {error && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}
      </form>
    </div>
  );
}

export default AddVideoForm;