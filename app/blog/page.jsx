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
  const [showContentType, setShowContentType] = useState('blog'); // State to toggle between 'blog' and 'video'

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
        // Initial filter on load based on default showContentType
        setFilteredPosts(blogs.filter(post => showContentType === 'blog' ? !post.isVideo : post.isVideo));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [showContentType]); // Add showContentType to dependency array to refetch/refilter on toggle

  // When switching to 'blog' or 'video', show all posts of that type
const handleContentTypeChange = (type) => {
  setShowContentType(type);
  setSelectedCategory(null);
  if (type === 'blog') {
    setFilteredPosts(blogPosts.filter(post => !post.isVideo));
  } else {
    setFilteredPosts(blogPosts.filter(post => post.isVideo));
  }
};

// When clicking a category, filter posts within current type
const filterByCategory = (category) => {
  setSelectedCategory(category);
  const basePosts = showContentType === 'blog'
    ? blogPosts.filter(post => !post.isVideo)
    : blogPosts.filter(post => post.isVideo);
  const filtered = basePosts.filter((post) => post.genre === category);
  setFilteredPosts(filtered);
};
  
  
  return (
    <main className="min-h-screen bg-gray-950 text-white px-8 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold tracking-tight mt-5">
             Discover Inspiring {showContentType === 'blog' ? 'Blog ' : 'Videos'}
          </h1>
          <p className="text-xl text-gray-400 mt-3">
            Explore unique insights, stories, and expert opinions
          </p>
        </header>

        {/* Content Type Toggle Buttons */}
        <div className="flex gap-4 mb-6 justify-center">
          <button
            className={`px-6 py-3 rounded-xl font-semibold transition -skew-10 ${
              showContentType === 'blog'
                ? 'bg-yellow-600 text-black'
                : 'bg-yellow-800 text-black hover:bg-yellow-600'
            }`}
            onClick={() => handleContentTypeChange('blog')}
          >
            Blog
          </button>
          <button
            className={`px-6 py-3 rounded-xl font-semibold transition hidden ${
              showContentType === 'video'
                ? 'bg-yellow-600 text-black'
                : 'bg-yellow-800 text-black hover:bg-yellow-600'
            }`}
            onClick={() => handleContentTypeChange('video')}
          >
           Introducing Videos
          </button>
          <p className="px-6 py-3 rounded-xl font-semibold transition border animate-pulse skew-10">Introducing Videos</p>
        </div>
 

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder={`Search ${showContentType} by genre...`}
            className="w-full px-4 py-2 rounded-md text-white focus:ring focus:ring-yellow-500 border border-white bg-amber-50/30"
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase();
              const basePosts = showContentType === 'blog' ? blogPosts.filter(post => !post.isVideo) : blogPosts.filter(post => post.isVideo);

              if (searchTerm) {
                const filtered = basePosts.filter((post) =>
                  post.genre && post.genre.toLowerCase().includes(searchTerm) // Added check for post.genre existence
                );
                setFilteredPosts(filtered);
                setSelectedCategory(null);
              } else {
                setFilteredPosts(basePosts);
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
                    : "bg-yellow-800 text-black hover:bg-yellow-600"
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
              Showing {showContentType === 'blog' ? 'blog posts' : 'videos'} for:{" "}
              <span className="text-yellow-500 font-bold">
                {selectedCategory}
              </span>
            </h3>
          </div>
        )}

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center items-center h-[30vh]">
            <div className="w-14 h-14 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredPosts.length > 0 ? (
          <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 ">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden h-fit"
              >
                {/* Category Tag */}
                <span className="absolute top-4 left-4 bg-yellow-800 text-black text-xs px-3 py-1 rounded-full ">
                  {post.genre || "General"}
                </span>
                <p className="text-gray-400 text-xs absolute bottom-4 left-4">
                  <strong>By:</strong> {post.author}
                </p>
                <h1 className="text-xs text-gray-400 text-center absolute top-4 right-4">
                  THE <span className="text-orange-400">SUN</span> WEB
                </h1>
                {/* Use different link structure or rendering based on content type if needed */}
                {showContentType === 'blog' ? (
                    <Link href={`/blog/${post.id}`}>
                      <div className="block">
                        {/* Optional Image Section for Blog */}
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
                ) : (
                    // Content display for Videos (replace with your video rendering logic)
                    <div className="block">
                        {/* Example: embed video player or link */}
                        {post.videoURL && (
                            <div className="h-48 bg-black flex items-center justify-center">
                                {/* Replace with your video player component or iframe */}
                                <p className="text-white">Video Placeholder</p>
                            </div>
                        )}
                        <div className="p-5">
                           <h2 className="text-2xl font-bold mb-3 mt-5">{post.title}</h2>
                           <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                             {post.description || post.body} {/* Use video description if available */}
                           </p>
                           <p className="text-xs text-gray-400 text-right">
                            Posted on {post.timestamp || "Unknown Date"}
                           </p>
                           {/* Optional: Link to video page */}
                           {post.videoURL && (
                               <Link href={post.videoURL} target="_blank" rel="noopener noreferrer">
                                   <p className="text-yellow-500 hover:underline mt-2">Watch Video</p>
                               </Link>
                           )}
                         </div>
                    </div>
                )}
              </article>
            ))}
          </section>
        ) : (
          <div className="text-center text-lg text-gray-300">
            No {showContentType === 'blog' ? 'blog posts' : 'videos'} available {selectedCategory && `for the selected category "${selectedCategory}"`}.
          </div>
        )}

        {/* About Section */}
        <div className="mt-20 bg-gray-800 p-6 rounded-lg text-center">
          <h2 className="text-3xl font-extrabold mb-4">About Our {showContentType === 'blog' ? 'Blog' : 'Videos'}</h2>
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