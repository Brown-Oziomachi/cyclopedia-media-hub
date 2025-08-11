"use client";

import React from "react";

export default function BlogDisplay({ title, subtitle, body, imageUrl }) {
  // Detect if body already contains HTML tags (TipTap content)
  const hasHTML = /<\/?[a-z][\s\S]*>/i.test(body || "");

  // Format plain text into HTML paragraphs
  const formatBody = (text) => {
    if (!text) return "";
    if (hasHTML) return text; // TipTap HTML — leave as is

    return text
      .split(/\n{2,}|\r{2,}|\n|\r/)
      .filter((line) => line.trim() !== "")
      .map((line) => `<p>${line.trim()}</p>`)
      .join("");
  };

  const formattedBody = formatBody(body);

  return (
    <article className="p-6 bg-gray-900 text-white">
      {/* Title */}
      {title && <h1 className="text-3xl font-bold mb-4">{title}</h1>}
      {subtitle && <h2 className="text-lg text-gray-300 mb-6">{subtitle}</h2>}

      {/* Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto rounded mb-6"
        />
      )}

      {/* Body */}
      <div
        className={`prose prose-invert max-w-none space-y-7 gap-y-5 ${
          hasHTML ? "whitespace-pre-wrap" : ""
        }`}
        dangerouslySetInnerHTML={{
          __html: formattedBody,
        }}
      />
    </article>
  );
}
