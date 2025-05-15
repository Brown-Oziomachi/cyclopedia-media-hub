"use client"
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Import useSession
import { db1, db3 } from "@/lib/firebaseConfig";
import {
  doc,
  updateDoc,
  collection,
  query,
  getDocs,
  addDoc,
  serverTimestamp,
  getDoc,
  where,
} from "firebase/firestore";
import { LoaderCircle, Heart, Share, LinkIcon } from "lucide-react";
import Link from "next/link";
import BlogDisplay from "@/components/BlogDisplay";

const BlogDetails = ({ params }) => {
  const { data: session } = useSession(); // Get the session data
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const id = params?.id;
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

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
      <h1 className="text-4xl font-bold text-white mb-4 text-center">{blog.title}</h1>
      <BlogDisplay body={blog.body} />
      
      {/* Comments Section */}
      <div className="mt-10 bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Join the Conversation</h2>
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={session?.user?.image || "/default-avatar.png"}
            alt="User avatar"
            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
          />
          <input
            type="text"
            placeholder="Write a comment..."
            className="w-full p-3 rounded-md bg-white/10 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-yellow-500"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleCommentSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Post
          </button>
        </div>

        {/* Display Comments */}
        <ul className="space-y-4">
          {comments.length > 0 ? (
            [...comments]
              .sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds)
              .map((comment) => (
                <li key={comment.id} className="bg-white/10 p-4 rounded shadow hover:bg-white/20 transition duration-200">
                  <div className="flex items-center space-x-3">
                    <img
                      src={comment.userImage || "/default-avatar.png"}
                      alt="User avatar"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <div>
                      <p className="text-white font-semibold">{comment.userName}</p>
                      {comment.timestamp && (
                        <p className="text-sm text-gray-400">
                          {new Date(comment.timestamp.seconds * 1000).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-300 mt-2">{comment.text}</p>
                </li>
              ))
          ) : (
            <p className="text-gray-300">Be the first to comment!</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BlogDetails;
