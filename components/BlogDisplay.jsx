"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const BlogDisplay = ({ title, genre, image, body }) => {
  console.log("Image URL:", image); // Debug line

  return (
    <div className="blog-post">
      {/* Poster Image: rendered in a circular shape */}
      {image && (
        <div className="relative w-full h-64 md:h-66">
          <Image
            src={image} // <-- your Blob URL from Firestore
            alt={title}
            width={800}
            height={100}
            className="rounded-lg h-fit w-full object-cover"
          />
        </div>
      )}
      <h1 className="text-2xl py-10 font-bold text-white text-center">
        <ReactMarkdown>{title}</ReactMarkdown>
      </h1>
      <p className="text-gray-400 text-sm text-center">
        <ReactMarkdown>{genre}</ReactMarkdown>
      </p>
      <div className="mt-5 space-y-5 rounded-lg text-white tracking-wider text-sm">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogDisplay;
