"use client";
import React, { use, useEffect, useState } from "react";
import { db1 } from "@/lib/firebaseConfig";
import { doc, getDoc, updateDoc, collection, query, getDocs } from "firebase/firestore";
import { LoaderCircle, Heart, Share, LinkIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import BlogDisplay from "@/components/BlogDisplay";

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
  const resolvedParams = use(params); // Unwrap the Promise from params
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const id = resolvedParams?.id;
  const [session, setSession] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);

  // Fetch the currently selected blog.
  useEffect(() => {
    if (!id) return;
    async function fetchBlog() {
      const fetchedBlog = await fetchSingleBlog(id);
      if (fetchedBlog) {
        setBlog(fetchedBlog);
        setLikes(fetchedBlog.likes || 0);
        const storedLiked = localStorage.getItem(`liked-${id}`);
        if (storedLiked) {
          setLiked(true);
        }
      }
    }
    fetchBlog();
  }, [id]);

  // Once the blog is loaded, fetch other blog options (excluding the current one).
  useEffect(() => {
    if (!blog) return;
    async function fetchOtherBlogs() {
      try {
        const blogsRef = collection(db1, "blog");
        const q = query(blogsRef);
        const querySnapshot = await getDocs(q);
        const blogs = [];
        querySnapshot.forEach((docSnap) => {
          if (docSnap.id !== blog.id) {
            blogs.push({ id: docSnap.id, ...docSnap.data() });
          }
        });
        setOtherBlogs(blogs);
      } catch (err) {
        console.error("Error fetching other blogs:", err);
      }
    }
    fetchOtherBlogs();
  }, [blog]);

  const handleLikeClick = async () => {
    const newLikes = liked ? likes - 1 : likes + 1;
    setLiked(!liked);
    setLikes(newLikes);
    localStorage.setItem(`liked-${id}`, (!liked).toString());
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

      <div className="min-h-screen px-2 py-16 max-w-4xl mx-auto bg-gray-900 text-gray-400">
        {/* Back Button */}
        <div className="flex items-center justify-between mb-6 mt-5">
          <Link href="/blog" className="text-blue-500 hover:underline text-lg">
            ← Back to Blogs
          </Link>
        </div>

        {/* Blog Content */}
        <div className="bg-gradient-to-br from-gray-900 via-black to-orange-400 shadow-lg z-0 rounded-lg p-8 relative">
          {/* Category Tag */}
          <Link href={`/blog/${blog.id}`}>
            <span className="inline-block mb-4 px-4 py-1 bg-purple-600 text-white text-sm rounded-full">
              {blog.genre}
            </span>
          </Link>
          {/* Title */}
          <h1 className="text-xs text-gray-400 text-center absolute top-10 right-4">
            THE <span className="text-orange-400">SUN</span> WEB
          </h1>
          <h1 className="text-4xl font-bold text-white mb-4 text-center">
            {blog.title}
          </h1>

          {/* Author & Like Button */}
          <img
            className="h-20 w-20 rounded-full border-2 border-white shadow-md hover:scale-105 transition-transform duration-300"
            src={blog.author.image || "/default-avatar.png"}
            alt="Author avatar"
          />
          <p className="text-gray-400 text-lg">
            <strong>By:</strong> {blog.author}
          </p>
          {/* Timestamp */}
          <p className="text-gray-400 text-sm inline-block text-right">
            Posted on {blog.timestamp || "Unknown Date"}
          </p>
        </div>

        <div className="container mx-auto bg-gray-800 shadow-lg rounded-lg p-1 mt-8">
          <BlogDisplay body={blog.body} image={session?.user?.image} />
        </div>
        <div className="flex justify-center items-center shadow-lg mt-8">
          <button
            className="flex items-center gap-2 text-gray-400 font-bold py-2 px-4 rounded transition mt-5 cursor-pointer"
            onClick={handleCopyLink}
          >
            <LinkIcon className="h-5 w-5" /> Copy Link
          </button>
          <button
            className="flex items-center gap-2 text-gray-400 font-bold py-2 px-4 rounded transition mt-5 cursor-pointer"
            onClick={handleShareClick}
          >
            <Share className="h-5 w-5" /> Share
          </button>
          <button
            className="flex items-center text-gray-300 hover:text-red-500 transition-all mt-5 cursor-pointer"
            onClick={handleLikeClick}
          >
            {showShareMenu && (
              <div className="absolute mt-10 bg-white shadow-md rounded-md p-3 flex flex-col gap-2 text-sm lg:-ml-60 max-lg:-ml-50 max-lg:-mt-40">
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
            <Heart
              className={`h-6 w-6 mr-2 ${liked ? "fill-red-500 scale-110" : "fill-none"}`}
            />
            {liked ? "Liked" : "Like"} ({likes})
          </button>
        </div>
      </div>

        {/* Other Blog Options Section */}
        {otherBlogs.length > 0 && (
          <div className="max-w-4xl mx-auto mt-8 px-2">
            <h2 className="text-2xl font-bold text-white mb-4">Other Blog Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherBlogs.map((other) => (
                <Link key={other.id} href={`/blog/${other.id}`}>
                  <div className="bg-gray-950 p-4 rounded-lg shadow hover:bg-gray-700 transition-colors cursor-pointer">
                    <h3 className="text-xl font-bold text-white">{other.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{other.genre}</p>
                    <p className="text-gray-200 text-sm line-clamp-2">{other.body}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}


      <div className="flex justify-center bg-black py-4">
        <Link href="/blog" className="text-blue-500 hover:underline text-lg">
          ← Back to Blogs
        </Link>
      </div>
    </>
  );
};

export default BlogDetails;

