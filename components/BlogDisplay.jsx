"use client";

import React from "react";

export default function BlogDisplay({ title,subtitle, body, imageUrl }) {
  return (
    <article className="  p-6 bg-gray-900 text-white ">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{title}</h1>

      {/* Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto rounded mb-4"
        />
      )}

      {/* Content */}
     <div className=" max-w-none space-y-20">
  <div dangerouslySetInnerHTML={{ __html: post }} />
</div>

    </article>
  );
}
