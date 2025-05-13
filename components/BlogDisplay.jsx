"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogDisplay = ({ title, genre, image, body }) => {
  return (
    <div className="blog-post">
      <h1 className="text-4xl font-bold text-white text-center">
        <ReactMarkdown>{title}</ReactMarkdown>
      </h1>
      <p className="text-gray-400 text-sm text-center">
        <ReactMarkdown>{genre}</ReactMarkdown>
      </p>
      
      {/* Render image if provided */}
      {image && (
        <div className="my-4 flex justify-center">
          <img
            src={image}
            alt="Blog Image"
            className="rounded-lg max-w-full object-cover"
          />
        </div>
      )}

      <div className="mt-4 bg-gray-900 p-4 rounded-lg text-white">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogDisplay;
