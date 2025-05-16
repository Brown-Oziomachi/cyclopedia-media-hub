// components/UserPostsPreview.jsx
"use client";

import { useState, useEffect } from 'react';
import { auth } from "@/auth";
import { db1 } from "@/lib/firebaseConfig";
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

const UserPostsPreview = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
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
    const q = query(
      collection(db1, 'blog'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(3) // fetch only 3 latest posts
    );

    const querySnapshot = await getDocs(q);
    const userPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(userPosts);
    setLoading(false);
  };

  if (loading) return <p className='text-white'>Loading your posts...</p>;
  if (!user) return <p>Please sign in to see your posts.</p>;

  return (
    <div>
      <h3>Your Top 3 Posts</h3>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="border p-2 mb-2 rounded">
            <h4 className="font-bold">{post.title}</h4>
            <p>Genre: {post.genre}</p>
            <p>{post.body}</p>
            <small>Posted on: {post.createdAt?.toDate().toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default UserPostsPreview;