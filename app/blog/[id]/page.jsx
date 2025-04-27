"use client"
import { db1 } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


const handleSingleFetch = async (id)=>{
  if(!id) return null;


  try {
    const blogRef = doc(db1, "blog", id)
    const blogDoc = await getDoc(blogRef)

    if (blogDoc.exists()) {
      return {id, ...blogDoc.data()}
    } else {
      console.log("No such document!");
    }
  } catch (err) {
    console.error("Error fetching blog", err)
    alert("fetch failed, please try again")
  }
}

const BlogDetails = ({params}) => {
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    const fetchBlog = async () => {
      const fetchedBlog = await handleSingleFetch(params.id);
      setBlog(fetchedBlog);
    };

    fetchBlog();
  }, [params.id]);

  if (!blog) return <div className="flex items-center justify-center h-dvh">
    <LoaderCircle  className="text-6xl animate-spin"/>
  </div>

  return (
    <main className="min-h-screen px-5 py-20 max-w-3xl mx-auto bg-gray-50 text-gray-800">
      <div className="flex items-center justify-between mb-6">
        <Link href="/blog" className="text-blue-500 hover:underline">
          Back to Blogs
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-md p-6">
        <span className="inline-block mb-4 px-3 py-1 bg-purple-600 text-white text-xs rounded-full">
          {blog.genre}
        </span>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{blog.title}</h1>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">By {blog.author}</p>
          <button className="flex items-center text-gray-600 hover:text-blue-500 focus:outline-none">
            <svg
              className="h-5 w-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            Like
          </button>
        </div>
        <p className="text-xs text-gray-400 mb-6">Posted on {blog.timestamp}</p>
        <div className="mb-6">
          <img
            src="/logo.png" // Replace with blog.imageUrl if available
            alt="Blog Cover"
            className=" rounded-md shadow-sm w-40 h-40"
          />
        </div>
        <p className="text-gray-700 leading-7 whitespace-pre-line">{blog.body}</p>
      </div>
    </main>
  );
};

export default BlogDetails;