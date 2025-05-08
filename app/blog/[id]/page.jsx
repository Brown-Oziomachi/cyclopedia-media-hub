"use client";
import React, { use, useEffect, useState } from "react";
import { db1 } from "@/lib/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { LoaderCircle, Heart, Share, LinkIcon } from "lucide-react";
import Link from "next/link";

const fetchSingleBlog = async (id) => {
  if (!id) return null;

  try {
    const blogRef = doc(db1, "blog", id);
    const blogDoc = await getDoc(blogRef);

    if (blogDoc.exists()) {
      return { id, ...blogDoc.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (err) {
    console.error("Error fetching blog:", err);
    alert("Fetch failed, please try again");
    return null;
  }
};

const BlogDetails = ({ params }) => {
  const resolvedParams = use(params); // Unwrapping the Promise
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const id = resolvedParams?.id; 

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      const fetchedBlog = await fetchSingleBlog(id);
      if (fetchedBlog) {
        setBlog(fetchedBlog);
        setLikes(fetchedBlog.likes || 0);
      }
    };

    fetchBlog();
  }, [id]);

  const handleLikeClick = async () => {
    if (!blog) return;

    const newLikes = liked ? likes - 1 : likes + 1;
    setLiked(!liked);
    setLikes(newLikes);

    try {
      const blogRef = doc(db1, "blog", id);
      await updateDoc(blogRef, { likes: newLikes });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleShareClick = () => {
    setShowShareMenu(!showShareMenu);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Blog link copied to clipboard!");
  };

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="text-gray-600 w-14 h-14 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <head>
        <title>{blog.title} - My Blog</title>
        <meta name="description" content={blog.body.substring(0, 160)} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.body.substring(0, 160)} />
        {blog.imageUrl && <meta property="og:image" content={blog.imageUrl} />}
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.body.substring(0, 160)} />
        {blog.imageUrl && <meta name="twitter:image" content={blog.imageUrl} />}
      </head>
      <main className="min-h-screen px-6 py-16 max-w-4xl mx-auto bg-black text-gray-200">
        {/* Back Button */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/blog" className="text-blue-500 hover:underline text-lg">
            ← Back to Blogs
          </Link>
        </div>
        {/* Blog Content */}
        <div className="bg-gray-400 shadow-lg rounded-lg p-8">
          {/* Category Tag */}
          <span className="inline-block mb-4 px-4 py-1 bg-purple-600 text-white text-sm rounded-full">
            {blog.genre}
          </span>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">{blog.title}</h1>

          {/* Author & Like Button */}
          <p className="text-gray-600 text-lg">{blog.image}</p>
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600 text-lg text-center">Writer: {blog.author}</p>
            {/* <button
              className="flex items-center text-gray-600 hover:text-red-500 transition-all"
              onClick={handleLikeClick}
            >
              <Heart className={`h-6 w-6 mr-2 ${liked ? "fill-red-500 scale-110" : "fill-none"}`} />
              {liked ? "Liked" : "Like"} ({likes})
            </button> */}
          </div>

          {/* Timestamp */}
          <p className="text-gray-400 text-sm mb-6">
            Posted on {blog.timestamp || "Unknown Date"}
          </p>

          {/* Image or Video */}
          <div className="mb-6 flex justify-center"></div>
          {blog.videoUrl ? (
            <video src={blog.videoUrl} controls className="w-full rounded-xl shadow-xl" />
          ) : (
            <img
              src={blog.imageUrl || "/logo.png"}
              alt="Blog Cover"
              className="rounded-xl shadow-xl w-full h-100 max-md:h-50 object-cover"
            />
          )}
        </div>

          <div className="flex items-center gap-4 mb-1 relative">
            <button
              className="flex items-center gap-2   text-white font-bold py-2 px-4 rounded transition mt-5"
              onClick={handleShareClick}
            >
              <Share className="h-5 w-5" /> Share
            </button>

            {showShareMenu && (
              <div className="absolute mt-10 bg-white shadow-md rounded-md p-3 flex flex-col gap-2 text-sm">
                <a
            href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
                >
            Share on Twitter
                </a>
                <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline"
                >
            Share on LinkedIn
                </a>
                <a
            href={`https://api.whatsapp.com/send?text=${window.location.href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
                >
            Share on WhatsApp
                </a>
                <button
            className="flex items-center text-gray-600 hover:text-gray-900"
            onClick={() => handleCopyLink(false)}

                >
            <LinkIcon className="h-5 w-5 mr-2" /> Copy Link
                </button>
              </div>
            )}

            {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Save
            </button> */}
          </div>
          <button
              className="flex items-center text-gray-600 hover:text-red-500 transition-all"
              onClick={handleLikeClick}
            >
              <Heart className={`h-6 w-6 mr-2 ${liked ? "fill-red-500 scale-110" : "fill-none"}`} />
              {liked ? "Liked" : "Like"} ({likes})
            </button>
          {/* Blog Body */}
        <p className="text-gray-700 leading-7 whitespace-pre-line ">{blog.body}</p>
        <div className="flex justify-center mt-8">
           <Link href="/blog" className="text-blue-500 hover:underline text-lg">
           ← Back to Blogs
         </Link>
        </div> 
        </main>
        </>
  )
}
export default BlogDetails;
