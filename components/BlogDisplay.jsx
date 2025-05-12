"use client";
// components/BlogDisplay.js
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogDisplay = ({ title, genre, body, }) => {
  return (
    <div className="blog-post">
      <h1 className="text-4xl font-bold text-white text-center">
        <ReactMarkdown>{title}</ReactMarkdown>
      </h1>
      <p className="text-gray-400 text-sm">
        <ReactMarkdown>{genre}</ReactMarkdown>
      </p>
      
      <div className="mt-4 bg-gray-900 p-4 rounded-lg text-white">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogDisplay;
