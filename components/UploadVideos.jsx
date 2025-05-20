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
    "Webwiz", "Technology", "Spirituality", "Science", "Art", "Entertainment",
    "Crypto", "Blockchain", "Gaming", "Social Media", "Software", "Hardware",
    "Gadgets", "Social network", "Engineering", "Language", "English", "Statistics",
    "Mathematics", "Physics", "Chemistry", "Biology", "Astronomy", "Geography",
    "Psychology", "Philosophy", "Sociology", "Economics", "Law", "AI",
    "Machine Learning", "Data Science", "Cybersecurity", "Cloud Computing",
    "Lifestyle", "Stories", "Coding", "Health", "History", "Nature", "Finance",
    "Travel", "Faith", "Religion", "Sex", "Wealth", "Business", "Ideas", "Action",
    "Drama", "Romance", "Music", "Mystery", "Fantasy", "Education", "Horror",
    "Comedy", "Adventure", "Documentary", "Marriage", "Teens", "Fashions",
    "Mothers", "Knowledge", "Ignorance", "Love", "Facts", "Family", "Culture",
    "Fathers", "Divorce", "Sports", "Street", "Strategy", "Animals", "News",
    "Politics", "Prayer", "Relationship", "Wisdom",
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
    <div className="max-w-2xl mx-auto  p-8 bg-neutral-900 text-white rounded-xl shadow-2xl">
      <div className="flex justify-end mt-12">
        <Link href="/upload-to-blog" passHref>
          <button className="mb-6 px-5 py-2 text-sm bg-amber-600 hover:bg-amber-500 text-black font-semibold rounded-md transition duration-300">
            Upload Blog
          </button>
        </Link>
      </div>

      <h1 className="text-3xl font-extrabold mb-8 text-center text-white">
        Upload a New Video
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {["title", "videoURL", "thumbnailURL", "author"].map((field) => (
          <div key={field} className="relative">
            <input
              type="text"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
            <label
              htmlFor={field}
              className="absolute left-3 top-3 text-sm text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-amber-400 peer-focus:text-sm"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)} <span className="text-red-500">*</span>
            </label>
          </div>
        ))}

        <div className="relative">
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="peer w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none"
          >
            <option value="" disabled>Select a genre</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <label
            htmlFor="genre"
            className="absolute left-3 top-3 text-sm text-gray-400"
          >
            Genre <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="relative">
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder=" "
            className="peer w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none"
          />
          <label
            htmlFor="description"
            className="absolute left-3 top-3 text-sm text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-amber-400 peer-focus:text-sm"
          >
            Description
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md text-black font-bold transition duration-300 ${
            loading ? "bg-neutral-700 cursor-not-allowed" : "bg-amber-500 hover:bg-amber-400"
          }`}
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>

        {success && (
          <p className="mt-4 text-center text-green-400 font-medium">
            Video added successfully!
          </p>
        )}
        {error && (
          <p className="mt-4 text-center text-red-400 font-medium">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default AddVideoForm;
