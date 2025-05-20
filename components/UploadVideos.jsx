// components/AddVideoForm.js
"use client";

import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";
import Link from "next/link";

function AddVideoForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    author: "Admin",
    videoURL: "",
    thumbnailURL: "",
    isVideo: true,
    timestamp: new Date().toLocaleDateString(),
  });

  const genres = [
     "Webwiz",
              "Technology",
              "Spirituality",
              "Science",
              "Art",
              "Entertainment",
              "Crypto",
              "Blockchain",
              "Gaming",
              "Social Media",
              "Software",
              "Hardware",
              "Gadgets",
              "Social network",
              "Engineering",
              "Language",
              "English",
              "Statistics",
              "Mathematics",
              "Physics",
              "Chemistry",
              "Biology",
              "Astronomy",
              "Geography",
              "Psychology",
              "Philosophy",
              "Sociology",
              "Economics",
              "Law",
              "AI",
              "Machine Learning",
              "Data Science",
              "Cybersecurity",
              "Cloud Computing",
              "Lifestyle",
              "Stories",
              "Coding",
              "Health",
              "History",
              "Nature",
              "Finance",
              "Travel",
              "Faith",
              "Religion",
              "Sex",
              "Wealth",
              "Business",
              "Ideas",
              "Action",
              "Drama",
              "Romance",
              "Music",
              "Mystery",
              "Fantasy",
              "Education",
              "Horror",
              "Comedy",
              "Adventure",
              "Documentary",
              "Marriage",
              "Teens",
              "Fashions",
              "Mothers",
              "Knowledge",
              "Ignorance",
              "Love",
              "Facts",
              "Family",
              "Culture",
              "Fathers",
              "Divorce",
              "Sports",
              "Street",
              "Strategy",
              "Animals",
              "News",
              "Politics",
              "Prayer",
              "Relationship",
              "Wisdom",
  ];

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    if (!formData.title || !formData.videoURL || !formData.genre || !formData.thumbnailURL) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db1, "blog"), formData);
      setSuccess(true);
      setFormData({
        title: "",
        description: "",
        genre: "",
        author: "Admin",
        videoURL: "",
        thumbnailURL: "",
        isVideo: true,
        timestamp: new Date().toLocaleDateString(),
      });
    } catch (e) {
      console.error("Error adding video:", e);
      setError("Failed to add video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-orange-400 text-white rounded-lg shadow-lg ">
      
      <Link href="/upload-to-blog">
        <button className="bg-gradient-to-r from-gray-700 via-gray-800 to-orange-400 hover:bg-gray-800 text-white font-semibold px-4 py-1 rounded border border-black mt-20">
          Upload Blog
        </button>
      </Link>

      <h1 className="text-2xl font-bold text-center mt-10 mb-10">Add New Video</h1>

      <form onSubmit={handleSubmit}>
        {["title", "videoURL", "thumbnailURL", "author"].map((field) => (
          <div key={field} className="mb-4">
            <label htmlFor={field} className="block text-sm font-medium text-gray-400 mb-2">
              {field.charAt(0).toUpperCase() + field.slice(1)} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white"
              required
            />
          </div>
        ))}

        <div className="mb-4">
          <label htmlFor="genre" className="block text-sm font-medium text-gray-400 mb-2">
            Genre <span className="text-red-500">*</span>
          </label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white"
            required
          >
            <option value="">Select a genre</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
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
            className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white line-clamp-2"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 rounded-md text-black font-semibold transition hidden ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-yellow-600 hover:bg-yellow-500"
          }`}
        >
          {loading ? "Adding Video..." : "Add Video"}
        </button>

        {success && <p className="mt-4 text-green-500 text-center">Video added successfully!</p>}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
}

export default AddVideoForm;
