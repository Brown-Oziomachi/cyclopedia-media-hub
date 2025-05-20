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
              "Wisdom",,
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

      setSuccessMessage("Reel link submitted successfully!");
      setTitle("");
      setDescription("");
      setGenre("");
      setVideoURL("");
    } catch (err) {
      console.error("Error saving reel:", err);
      alert("Failed to submit reel.");
    } finally {
      setSubmitting(false);
    }
  };

  
  return (
    <div className="max-w-xl mx-auto  bg-black p-6 rounded-xl shadow-md text-white">
      <h2 className="text-2xl font-bold mb-4 m-20">Reel coming soon</h2>
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <input
          type="text"
          placeholder="Title"
          className="w-full px-4 py-2 border rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full px-4 py-2 border rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        {/* Genre Dropdown */}
        <select
          className="w-full px-4 py-2 border rounded-md"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        >
          <option value="">Select Genre</option>
          {genres.map((g) => (
            <option key={g} value={g} className="text-black">
              {g}
            </option>
          ))}
        </select>

        <input
          type="url"
          placeholder="Video URL (YouTube, Vimeo, or MP4 link)"
          className="w-full px-4 py-2 border rounded-md"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-white hover:bg-yellow-700 text-black px-4 py-2 rounded-md w-full hidden"
        >
          {submitting ? "Submitting..." : "Submit Reel"}
        </button>
      </form>
      {successMessage && (
        <p className="mt-4 text-green-600 font-semibold">{successMessage}</p>
      )}
    </div>
  );
};

export default UploadReelForm;
