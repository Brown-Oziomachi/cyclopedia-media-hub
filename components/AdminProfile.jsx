import Link from "next/link";
import React from "react";

const AdminProfile = () => {
  return (
    <div className="">
      {/* Header */}
      <div className="border-b pb-8 mb-8">
        <p className="text-center text-gray-500 text-sm">
          Meet the mind behind The Cyclopedia
        </p>
      </div>

      {/* Author Profile Card */}
      <div className="max-w-2xl mx-auto">
        {/* Profile Image */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img
              src="/brown.jpg"
              alt="Brown Oziomachi"
              className="rounded-full w-40 h-40 md:w-48 md:h-48 object-cover border-4 border-gray-200"
            />
            <div className="absolute -bottom-2 right-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Founder & Director
            </div>
          </div>
        </div>

        {/* Author Info */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Brown Oziomachi
          </h2>
          <p className="text-blue-600 font-semibold mb-4">
            Founder & Director | Writer | Software Developer
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            Brown Oziomachi is a passionate writer, researcher, and software
            developer with a vision to revolutionize news and information
            sharing. As the founder and director of{" "}
            <span className="font-semibold">The Cyclopedia</span>, Brown
            combines technical expertise with journalistic integrity to create
            comprehensive, accurate, and engaging news coverage.
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8">
            <a
              href="https://x.com/cyclopedia_news?t=if7x7ktTlukRhO9muucjng&s=09"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
            >
              <span>Twitter</span>
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="https://www.linkedin.com/in/brownoziomachi72a5a3229"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
            >
              <span>LinkedIn</span>
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="mailto:browncemmanuel@gmail.com"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
            >
              <span>Email</span>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 py-6 border-y  mb-8">
            <div>
              <p className="text-2xl font-bold text-blue-600">500+</p>
              <p className="text-xs text-gray-600">Articles Published</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">50K+</p>
              <p className="text-xs text-gray-600">Community Members</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">2+</p>
              <p className="text-xs text-gray-600">Years of Excellence</p>
            </div>
          </div>

          {/* Bio Points */}
          <div className="space-y-3 text-left mb-8 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-4">Key Focus Areas:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Investigative journalism and in-depth news analysis</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Technology innovation in media platforms</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  Empowering communities through knowledge and information
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  Building a platform for truth, insight, and independence
                </span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/global"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              View All Articles
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t mt-12"></div>
    </div>
  );
};

export default AdminProfile;
