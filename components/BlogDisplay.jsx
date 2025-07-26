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
        <div className="flex justify-center mb-4">
          <image
            src={image}
            alt="Blog Poster"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
      )}
      <h1 className="text-2xl py-10 font-bold text-white text-center">
        <ReactMarkdown>{title}</ReactMarkdown>
      </h1>
      <h2 className="mx-auto">
        <ReactMarkdown>{image}</ReactMarkdown>
      </h2>
      <p className="text-gray-400 text-sm text-center">
        <ReactMarkdown>{genre}</ReactMarkdown>
      </p>
      <div className="mt-4 space-y-5 rounded-lg text-white tracking-wider text-sm">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogDisplay;
