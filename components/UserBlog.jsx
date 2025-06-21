"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/auth";
import { db1 } from "@/lib/firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

const UserPostsPreview = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        fetchPosts(u.uid);
      } else {
        setUser(null);
        setPosts([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchPosts = async (userId) => {
    try {
      const q = query(
        collection(db1, "blog"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(3)
      );

      const querySnapshot = await getDocs(q);
      const userPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(userPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-white">Loading your posts...</p>;
  if (!user) return <p className="text-white">Please sign in to see your posts.</p>;

  return (
    <div className=" bg-gray-400/5 p-4 rounded shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Your Latest Blog Posts</h3>
      {posts.length === 0 ? (
        <p className="text-gray-500">You haven't written any posts yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-300 dark:border-gray-700 p-4 mb-4 rounded"
          >
            <h4 className="text-lg font-bold mb-1">{post.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Genre: {post.genre}
            </p>
            <p className="text-gray-800 dark:text-gray-200 mb-2">{post.body}</p>
            <small className="text-gray-500">
              Posted on:{" "}
              {post.createdAt?.toDate
                ? post.createdAt.toDate().toLocaleString()
                : "Unknown"}
            </small>
          </div>
        ))
      )}
    </div>
  );
};

export default UserPostsPreview;
