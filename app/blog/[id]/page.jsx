"use client"
import React, { use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { db1, db3 } from "@/lib/firebaseConfig";

import {
  doc,
  updateDoc,
  collection,
  query,
  getDocs,
  arrayUnion,
  addDoc,
  serverTimestamp,
  getDoc,
  where,
} from "firebase/firestore";
import { LoaderCircle, Heart, Share, LinkIcon } from "lucide-react";
import Link from "next/link";
import BlogDisplay from "@/components/BlogDisplay";

const BlogDetails = ({ params }) => {
  const resolvedParams = use(params); // Unwrap the Promise from params
  const { data: session } = useSession();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const id = resolvedParams?.id;
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
const [replyText, setReplyText] = useState("");

const handleReplySubmit = async (commentId, replyText, setReplyText, setReplyingTo, setComments) => {
  if (!replyText.trim()) return;

  // ✅ Get the logged-in user from Auth.js
  const user = session?.user;

  if (!user) {
    alert("Please log in to reply.");
    return;
  }

  const replyData = {
    id: Date.now().toString(),
    userName: user.name || "Anonymous", // ✅ Auth.js uses `user.name`
    userImage: user.image || "/default-avatar.png", // ✅ Auth.js uses `user.image`
    text: replyText,
    timestamp: Math.floor(Date.now() / 1000)
  };

  const commentRef = doc(db3, "comments", commentId);

  try {
    await updateDoc(commentRef, {
      replies: arrayUnion(replyData)
    });

    // ✅ Instantly update UI without refresh
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...(comment.replies || []), replyData] }
          : comment
      )
    );

    setReplyText(""); 
    setReplyingTo(null);
  } catch (error) {
    console.error("Error submitting reply:", error);
  }
};



  // Fetch comments for this blog post
  useEffect(() => {
    async function fetchComments() {
      if (!id) return;
      try {
        const commentsQuery = query(
          collection(db3, "comments"),
          where("blogId", "==", id)
        );
        const querySnapshot = await getDocs(commentsQuery);
        const commentsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentsArray);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
    fetchComments();
  }, [id]);

  // Fetch the currently selected blog
  useEffect(() => {
    if (!id) return;
    async function fetchBlog() {
      const blogRef = doc(db1, "blog", id);
      const blogDoc = await getDoc(blogRef);
      if (blogDoc.exists()) {
        setBlog({ id, ...blogDoc.data() });
        setLikes(blogDoc.data().likes || 0);
      }
    }
    fetchBlog();
  }, [id]);

  // Check local storage for liked state
  useEffect(() => {
    const storedLiked = localStorage.getItem(`liked-${id}`);
    if (storedLiked) {
      setLiked(true);
    }
  }, [id]);

  // Fetch other blog options (excluding the current one)
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



  // Submit a new comment
  const handleCommentSubmit = async () => {
    if (newComment.trim() !== "") {
      try {
        const commentData = {
          blogId: id,
          text: newComment,
          userName: session?.user?.name || "Anonymous",
          userImage: session?.user?.image || "/default-avatar.png",
          timestamp: serverTimestamp(),
        };

        await addDoc(collection(db3, "comments"), commentData);
        setComments((prev) => [...prev, commentData]);
        setNewComment("");
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };
 const handleShareClick = () => {
    setShowShareMenu(!showShareMenu);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Blog link copied to clipboard!");
  };

  // Handle like button click
  const handleLikeClick = async () => {
    const newLikes = liked ? likes - 1 : likes + 1;
    setLiked(!liked);
    setLikes(newLikes);
    localStorage.setItem(`liked-${id}`, (!liked).toString()); // Store like state in local storage

    try {
      const blogRef = doc(db1, "blog", id);
      await updateDoc(blogRef, { likes: newLikes });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  

  // Render loading state if blog is not fetched yet
  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="text-gray-600 w-14 h-14 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-2 py-16 max-w-4xl mx-auto bg-gray-900 text-gray-400">
           {/* Blog Content */}
        <div className="bg-gradient-to-br from-gray-900 via-black to-orange-400 shadow-lg z-0 rounded-lg p-8 relative">
          {/* Category Tag */}
          <Link href={`/blog/${blog.id}`}>
            <span className="inline-block mb-4 px-4 py-1 bg-purple-900 text-white text-sm rounded-full">
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
          <div className="">
             <div className="flex">
        <img
          src={session?.user?.image}
          alt="User profile"
          className="w-20 h-20 rounded-full border border-gray-300"
        />
</div>
          <p className="text-gray-400 text-lg">
            <strong>By:</strong> {blog.author}
          </p>
          {/* Timestamp */}
        </div>
          <p className="text-gray-400 text-sm inline-block text-right">
            Posted on {blog.timestamp || "Unknown Date"}
          </p>
          </div>

        <div className=" ">
          <BlogDisplay body={blog.body} />
        </div>

      
      {/* Like Button */}
      <div className="flex justify-center items-center shadow-lg mt-8">
        <button
          className="flex items-center text-gray-300 hover:text-red-500 transition-all mt-5 cursor-pointer"
          onClick={handleLikeClick}></button>
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
                  onClick={() => setShowShareMenu(false)}
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

      {/* Comments Section */}
      <div className="mt-10 bg-gray-950 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Join the Conversation</h2>
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={session?.user?.image || "/default-avatar.png"}
            alt="User avatar"
            className="w-10 h-10 rounded-full border-2 border-orange-400 shadow-md"
          />
          <input
            type="text"
            placeholder="What's on your mind?"
            className="w-full  p-2 rounded-md bg-gray-900 text-orange-400 border border-gray-600 focus:outline-none focus:ring focus:ring-yellow-500"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleCommentSubmit}
            className="px-4 py-2 bg-gradient-to-br from-gray-900 via-black to-orange-400 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Post
          </button>
        </div>
</div>
<div>
 <div>
  {/* Display Comments */}
  <ul className="space-y-4">
    {comments.length > 0 ? (
      comments
        .sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds)
        .map((comment) => (
          <li
            key={comment.id}
            className="bg-gray-950 p-4 rounded shadow hover:bg-black transition duration-200"
          >
            {/* Comment Header */}
            <div className="flex items-center space-x-3">
              <img
                src={comment.userImage || "/default-avatar.png"}
                alt="User avatar"
                className="w-8 h-8 rounded-full border-2 border-orange-400"
              />
              <div>
                <p className="text-orange-400 font-semibold">{comment.userName}</p>
                {comment.timestamp && (
                  <p className="text-sm text-gray-400">
                    {new Date(comment.timestamp.seconds * 1000).toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            {/* Comment text */}
            <p className="text-gray-300 mt-2">{comment.text}</p>

            {/* Reply Button */}
            <button
              className="text-blue-400 mt-2 hover:underline"
              onClick={() => setReplyingTo(comment.id)}
            >
              Reply
            </button>

            {/* Reply Input Section */}
            {replyingTo === comment.id && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Write a reply..."
                  className="w-full p-2 bg-gray-900 rounded"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button
                  className="mt-2 bg-orange-400 p-2 rounded"
                  onClick={() =>
                    handleReplySubmit(
                      comment.id,
                      replyText,
                      setReplyText,
                      setReplyingTo,
                      setComments,
                      db3
                    )
                  }
                >
                  Submit Reply
                </button>
              </div>
            )}

            {/* Display Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <ul className="ml-6 mt-2 space-y-2">
                {comment.replies.map((reply) => (
                  <li
                    key={reply.id}
                    className="bg-gray-900 p-3 rounded flex  space-x-3"
                  >
                    <img
                      src={reply.userImage || "/default-avatar.png"}
                      alt="User avatar"
                      className="w-6 h-6 rounded-full border-2 border-orange-400"
                    />
                    <div>
                      <p className="text-orange-400 font-semibold">{reply.userName}</p>
                      <p className="text-blue-500">{reply.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))
    ) : (
      <p className="text-gray-300">Be the first to comment!</p>
    )}
  </ul>

  {/* Other Blog Options */}
  {otherBlogs.length > 0 && (
    <div className="max-w-4xl mx-auto mt-8 px-2">
      <h2 className="text-2xl font-bold text-white mb-4">Other Blog Options</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

  {/* Back to Blogs Link */}
  <div className="flex justify-center bg-black py-4">
    <Link href="/blog" className="text-blue-500 hover:underline text-lg">
      ← Back to Blogs
    </Link>
  </div>
</div>
</div>
</div>
  )
}
export default BlogDetails;