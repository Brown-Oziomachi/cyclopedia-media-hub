"use client";

import { useState } from "react";
import { db1 } from "@/lib/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const UploadReelForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const genres = [
    "Webwiz", "Technology", "Spirituality", "Science", "Art", "Entertainment", "Crypto", "Blockchain", "Gaming",
    "Social Media", "Software", "Hardware", "Gadgets", "Engineering", "Language", "English", "Statistics",
    "Mathematics", "Physics", "Chemistry", "Biology", "Astronomy", "Geography", "Psychology", "Philosophy",
    "Sociology", "Economics", "Law", "AI", "Machine Learning", "Data Science", "Cybersecurity", "Cloud Computing",
    "Lifestyle", "Stories", "Coding", "Health", "History", "Nature", "Finance", "Travel", "Faith", "Religion",
    "Sex", "Wealth", "Business", "Ideas", "Action", "Drama", "Romance", "Music", "Mystery", "Fantasy", "Education",
    "Horror", "Comedy", "Adventure", "Documentary", "Marriage", "Teens", "Fashions", "Mothers", "Knowledge",
    "Ignorance", "Love", "Facts", "Family", "Culture", "Fathers", "Divorce", "Sports", "Street", "Strategy",
    "Animals", "News", "Politics", "Prayer", "Relationship", "Wisdom"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoURL || !title || !description || !genre) {
      alert("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(db1, "blog"), {
        title,
        description,
        genre,
        videoURL,
        isReel: true,
        isVideo: true,
        timestamp: serverTimestamp(),
      });

      setSuccessMessage("🎉 Reel uploaded successfully!");
      setTitle("");
      setDescription("");
      setGenre("");
      setVideoURL("");
    } catch (err) {
      console.error("Error saving reel:", err);
      alert("Failed to upload reel. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 bg-neutral-900 rounded-xl shadow-2xl text-white">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-white mt-12">
         Reel coming soon
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="relative">
          <input
            type="text"
            id="title"
            placeholder=" "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="peer w-full px-4 py-3 text-white bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-transparent"
          />
          <label
            htmlFor="title"
            className="absolute left-4 top-3 text-sm text-gray-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-yellow-400 peer-focus:text-sm"
          >
            Reel Title
          </label>
        </div>

        {/* Description */}
        <div className="relative">
          <textarea
            id="description"
            placeholder=" "
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="peer w-full px-4 py-3 text-white bg-neutral-800 border border-neutral-700 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-transparent"
          />
          <label
            htmlFor="description"
            className="absolute left-4 top-3 text-sm text-gray-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-yellow-400 peer-focus:text-sm"
          >
            Description
          </label>
        </div>

        {/* Genre */}
        <div className="relative">
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            className="peer w-full px-4 py-3 text-white bg-neutral-800 border border-neutral-700 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="" disabled>
              Select Genre
            </option>
            {genres.map((g) => (
              <option key={g} value={g} className="text-black">
                {g}
              </option>
            ))}
          </select>
          <label
            htmlFor="genre"
            className="absolute left-4 top-3 text-sm text-gray-400 peer-focus:text-yellow-400"
          >
            Genre
          </label>
        </div>

        {/* Video URL */}
        <div className="relative">
          <input
            type="url"
            id="videoURL"
            placeholder=" "
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
            required
            className="peer w-full px-4 py-3 text-white bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-transparent"
          />
          <label
            htmlFor="videoURL"
            className="absolute left-4 top-3 text-sm text-gray-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-yellow-400 peer-focus:text-sm"
          >
            Video URL (YouTube, Vimeo, or MP4)
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-3 rounded-md font-semibold text-neutral-900 transition duration-300 hidden${
            submitting
              ? "bg-neutral-900 cursor-not-allowed"
              : "bg-neutral-900"
          }`}
        >
          {submitting ? "Uploading..." : "Upload Reel"}
        </button>

        {/* Success Message */}
        {successMessage && (
          <p className="mt-4 text-green-400 text-center font-medium">
            {successMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default UploadReelForm;
