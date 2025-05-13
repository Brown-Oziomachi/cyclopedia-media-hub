"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { db1 } from "@/lib/firebaseConfig";

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db1, "blog"));
        const blogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogPosts(blogs);
        setFilteredPosts(blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    const filtered = blogPosts.filter((post) => post.genre === category);
    setFilteredPosts(filtered);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white px-8 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold tracking-tight mt-5">
            Discover Inspiring Blog Posts
          </h1>
          <p className="text-xl text-gray-400 mt-3">
            Explore unique insights, stories, and expert opinions
          </p>
        </header>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by genre..."
            className="w-full px-4 py-2 rounded-md text-white focus:ring focus:ring-yellow-500 border border-white bg-amber-50/30"
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase();
              if (searchTerm) {
                const filtered = blogPosts.filter((post) =>
                  post.genre.toLowerCase().includes(searchTerm)
                );
                setFilteredPosts(filtered);
                setSelectedCategory(null);
              } else {
                setFilteredPosts(blogPosts);
                setSelectedCategory(null);
              }
            }}
          />
        </div>

        {/* Categories */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-6">Popular Categories</h2>
          <div className="flex gap-3 overflow-x-auto whitespace-nowrap snap-x snap-mandatory pb-2">
            {[
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
              "Wisdom",
    
            ].map((category) => (
              <button
                key={category}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-yellow-600 text-black"
                    : "bg-yellow-500 text-black hover:bg-yellow-600"
                }`}
                onClick={() => filterByCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {selectedCategory && (
          <div className="text-center mb-6 border-b pb-3">
            <h3 className="text-lg font-semibold text-gray-300 border-b-2 border-yellow-500 inline-block pb-1">
              Showing posts for:{" "}
              <span className="text-yellow-500 font-bold">
                {selectedCategory}
              </span>
            </h3>
          </div>
        )}

        {/* Blog Posts Section */}
        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="w-14 h-14 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredPosts.length > 0 ? (
          // Adjust grid so cards become slightly smaller (3 columns on large screens)
          <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Category Tag */}
                <span className="absolute top-4 left-4 bg-yellow-500 text-black text-xs px-3 py-1 rounded-full ">
                  {post.genre || "General"}
                </span>
                <Link href={`/blog/${post.id}`}>
                  <div className="block">
                    {/* Optional Image Section */}
                    {post.photoURL && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={post.photoURL}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <h2 className="text-2xl font-bold mb-3 mt-5">{post.title}</h2>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                        {post.body}
                      </p>
                      <p className="text-xs text-gray-400 text-right">
                        Posted on {post.timestamp || "Unknown Date"}
                      </p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </section>
        ) : (
          <div className="text-center text-lg text-gray-300">
            No blog posts available for the selected category.
          </div>
        )}

        {/* About Section */}
        <div className="mt-20 bg-gray-800 p-6 rounded-lg text-center">
          <h2 className="text-3xl font-extrabold mb-4">About Our Blog</h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Dive into stories and insights that inspire, educate, and entertain.
            From technology and web development to lifestyle and creativity, we
            bring diverse perspectives together in one place.
          </p>
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
