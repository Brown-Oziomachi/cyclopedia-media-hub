"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig"; // Correct Firestore instance
import Image from "next/image";

export default function ImageManagerPage() {
  const [blogs, setBlogs] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch blog posts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const snapshot = await getDocs(collection(db1, "blog")); // correct collection name
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(list);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Upload image and update Firestore
 const handleImageUpload = async (e, blogId) => {
  const file = e.target.files[0];
  if (!file) return;

  setUpdatingId(blogId);

  const res = await fetch("/api/blob/upload", {
    method: "POST",
    headers: {
      "x-vercel-filename": file.name,
    },
    body: file,
  });

  const data = await res.json();

  if (data?.url) {
    await updateDoc(doc(db, "blogs", blogId), {
      imageUrl: data.url,
    });

    setBlogs((prev) =>
      prev.map((b) => (b.id === blogId ? { ...b, imageUrl: data.url } : b))
    );
  } else {
    alert("Upload failed.");
  }

  setUpdatingId(null);
    };

  return (
      <div className="p-6 max-w-5xl mx-auto bg-black rounded-lg shadow-lg text-white">
          <p className="text-center text-2xl text-white mt-10 mb-5">Admin Dashboard</p>
      <h1 className="text-2xl font-bold mb-6 mt-10 text-center">🖼 Blog Image Manager</h1>

      {blogs.length === 0 && (
        <p className="text-gray-500 italic">No blog posts found.</p>
      )}

      {blogs.map((blog) => (
        <div key={blog.id} className="border-2 border-green-600 border-opacity-100 p-4 rounded-md mb-4">
          <h2 className="text-lg font-semibold mb-2">
            {blog.title || "Untitled Post"}
          </h2>

          {blog.imageUrl ? (
            <Image
              src={blog.imageUrl}
              alt="Blog"
              width={400}
              height={200}
              className="mb-2 object-cover rounded-md"
            />
          ) : (
            <div className="text-gray-500 italic mb-2">No image yet</div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, blog.id)}
            disabled={updatingId === blog.id}
            className="mb-2"
          />

          {updatingId === blog.id && (
            <div className="text-sm text-blue-500">Updating...</div>
          )}
        </div>
      ))}
    </div>
  );
}
