"use client";

import { Suspense, useEffect, useState } from "react";
import React from "react";
import { useSession } from "next-auth/react";
import { db1 } from "@/lib/firebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { Share, LinkIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";

// Blog content renderer
const BlogDisplay = ({ body }) => {
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(body || "");
  return (
    <div
      className={`prose max-w-none text-gray-900 ${
        !isHTML ? "whitespace-pre-line space-y-4" : ""
      }`}
      dangerouslySetInnerHTML={{
        __html: isHTML ? body : body?.replace(/\n/g, "<br />"),
      }}
    />
  );
};

// Static tags
const staticTags = [
  { name: "Politics", href: "/search?q=politics" },
  { name: "Religion", href: "/search?q=religion" },
  { name: "History", href: "/search?q=history" },
];

export default function BlogDetails() {
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter();

  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [query, setQuery] = useState("");
  const [showNav, setShowNav] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setShowNav(false); // Close nav here

    // Navigate to search page with query param
    router.push(`/search?q=${encodeURIComponent(query.trim().toLowerCase())}`);
  };
  // Fetch current blog
  useEffect(() => {
    if (!id) return;
    async function fetchBlog() {
      const blogRef = doc(db1, "blogs", id);
      const blogDoc = await getDoc(blogRef);
      if (blogDoc.exists()) {
        const data = blogDoc.data();
        setBlog({ id, ...data });
        setLikes(data.likes || 0);
        setSubtitle(data.subtitle || "");
      }
    }
    fetchBlog();
  }, [id]);

  // Check if liked
  useEffect(() => {
    if (!id) return;
    const storedLiked = localStorage.getItem(`liked-${id}`);
    if (storedLiked) setLiked(true);
  }, [id]);

  // Fetch related blogs
  useEffect(() => {
    if (!id) return;
    const fetchBlogs = async () => {
      try {
        const snapshot = await getDocs(collection(db1, "blogs"));
        const allBlogs = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((b) => b.id !== id) // exclude current blog
          .sort((a, b) => (b.date || 0) - (a.date || 0)); // newest first
        setBlogs(allBlogs.slice(0, 4)); // only latest 4 blogs
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, [id]);

  const handleShareClick = () => setShowShareMenu(!showShareMenu);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const handleLikeClick = async () => {
    if (!id) return;
    const newLikes = liked ? likes - 1 : likes + 1;
    setLiked(!liked);
    setLikes(newLikes);
    localStorage.setItem(`liked-${id}`, (!liked).toString());
    try {
      const blogRef = doc(db1, "blogs", id);
      await updateDoc(blogRef, { likes: newLikes });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleMoreBlogClick = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/global");
    }, 3000);
  };

  if (!blog) return <div className="text-center py-20">Loading news...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      className="min-h-screen px- sm:px-5 md:px-10 lg:px-20 py-10 mx-auto text-gray-900 font-sans overflow-hidden leading-relaxed space-y-20"
    >
      <div className="w-full relative h-64 sm:h-80 md:h-[30rem] mt-1">
        {/* Image */}
        {blog.imageUrl && (
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            style={{ objectFit: "cover" }}
            className="z-10 lg:mt-20 max-md:mt-5 max-lg:mt-20"
          />
        )}

        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/6 via-black/30 to-transparent z-20"></div>

        <button
          onClick={handleCopyLink}
          className="border flex items-center max-md:top-80 max-lg:top-150 lg:top-150 z-40 -right-2  absolute gap-2 text-gray-400 font-semibold py-3 bg-black text-white px-3  rounded-full hover:bg-gray-800"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
        {/* Title + Subtitle */}
        <div className="absolute top-0 left-0 w-full p-6 sm:p-5 md:p-7 z-30 text-black mt-65 lg:text-white max-lg:text-white max-md:text-black">
          <h1 className="text-3xl md:text-2xl font-bold font-playfair tracking-wide drop-shadow-lg">
            {blog.title}
          </h1>
          {subtitle && (
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mt-1 font-playfair drop-shadow-md border py-2 px-3 shadow-2xl mask-b-from-60% ">
              {subtitle}
            </h2>
          )}
          {/* <button
          onClick={handleShareClick}
          className="border mt-5 right-7 flex items-center gap-2 text-white bg-black font-semibold py-4 px-4 sm:px-6 rounded-full hover:bg-gray-800 relative"
        >
          <Share className="h-4 w-4" />
          {showShareMenu && (
            <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg p-4 flex flex-col gap-3 text-sm w-56 z-50 border border-green-600">
              <a
                href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Share on Twitter
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Share on LinkedIn
              </a>
              <button
                onClick={handleShareClick}
                className="text-green-600 text-xs underline "
              >
                Close
              </button>
            </div>
          )}
        </button> */}
        </div>
      </div>

      {/* Blog content */}
      <div className="blog-content prose max-w-none px-2 sm:px-4 space-y-5 gap-5 font-serif text-sm max-md:mt-110">
        <hr />
        <BlogDisplay body={blog.body} />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 sm:gap-5 text-sm px-2 sm:px-4">
        <button
          onClick={handleLikeClick}
          className={`flex items-center justify-center text-sm py-2 px-4 sm:px-5 rounded-md ${
            liked ? "text-green-600" : "text-gray-400"
          }`}
        >
          {/* {liked ? "Liked" : "Likes"} ({likes}) */}
        </button>
      </div>

      <div className="border p-5 max-w-xl mx-auto bg-black text-white">
        <h2 className="font-semibold">
          Subscribe to the <em>Cyclopedia</em> newsletter for weekly insights on
          the world's most pressing topics.{" "}
          <span className="text-red-600">*</span>
        </h2>
        <p className="text-sm text-gray-400 mt-1">Required</p>

        <form
          action="YOUR_MAILCHIMP_FORM_ACTION_URL"
          method="post"
          target="_blank"
          novalidate
        >
          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              * EMAIL ADDRESS
            </label>
            <input
              type="email"
              className="w-full border border-green-600 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Country or Region */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              * COUNTRY OR REGION
            </label>
            <select className="w-full text-black bg-white border border-green-600 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-600">
              <option className="text-gray-200">Select One</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Australia</option>
              <option>Algeria</option>
              <option>Angola</option>
              <option>Benin</option>
              <option>Botswana</option>
              <option>Burkina Faso</option>
              <option>Burundi</option>
              <option>Cabo Verde</option>
              <option>Cameroon</option>
              <option>Central African Republic</option>
              <option>Chad</option>
              <option>Comoros</option>
              <option>Congo (Republic)</option>
              <option>Congo (Democratic Republic)</option>
              <option>Côte d'Ivoire</option>
              <option>Djibouti</option>
              <option>Egypt</option>
              <option>Equatorial Guinea</option>
              <option>Eritrea</option>
              <option>Eswatini</option>
              <option>Ethiopia</option>
              <option>Gabon</option>
              <option>Gambia</option>
              <option>Ghana</option>
              <option>Guinea</option>
              <option>Guinea-Bissau</option>
              <option>Kenya</option>
              <option>Lesotho</option>
              <option>Liberia</option>
              <option>Libya</option>
              <option>Madagascar</option>
              <option>Malawi</option>
              <option>Mali</option>
              <option>Mauritania</option>
              <option>Mauritius</option>
              <option>Morocco</option>
              <option>Mozambique</option>
              <option>Namibia</option>
              <option>Niger</option>
              <option>Nigeria</option>
              <option>Rwanda</option>
              <option>Sao Tome and Principe</option>
              <option>Senegal</option>
              <option>Seychelles</option>
              <option>Sierra Leone</option>
              <option>Somalia</option>
              <option>South Africa</option>
              <option>South Sudan</option>
              <option>Sudan</option>
              <option>Tanzania</option>
              <option>Togo</option>
              <option>Tunisia</option>
              <option>Uganda</option>
              <option>Zambia</option>
              <option>Zimbabwe</option>
              <option>Other</option>
            </select>
          </div>

          {/* Privacy note */}
          <p className="text-xs text-gray-700">
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            apply.
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 text-sm font-semibold rounded-sm hover:bg-green-700"
          >
            SIGN UP
          </button>
        </form>
      </div>

      <hr />
      {/* Related Blogs */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Related</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Blog 1 */}
          {blogs.length >= 1 && (
            <Link href={`/blog/${blogs[0].id}`} className="block">
              <div className="flex flex-col bg-white rounded-md overflow-hidden shadow-md cursor-pointer">
                {blogs[0].imageUrl && (
                  <div className="relative w-full h-48 sm:h-56">
                    <img
                      src={blogs[0].imageUrl}
                      alt={blogs[0].title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-base font-bold text-black hover:underline uppercase">
                    {blogs[0].title}
                  </h2>
                  <div className="flex gap-2 items-center mt-2 flex-wrap">
                    <span className="text-orange-600 text-sm uppercase">
                      TAGGED:
                    </span>
                    <Link
                      href={`/search?q=politics`}
                      className="border py-0 px-3 border-orange-600 text-orange-600 text-sm hover:bg-orange-50"
                    >
                      Politics
                    </Link>
                    <Link
                      href={`/search?q=religion`}
                      className="border py-0 px-3 border-orange-600 text-orange-600 text-sm hover:bg-orange-50"
                    >
                      Religion
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Blog 2 */}
          {blogs.length >= 2 && (
            <Link href={`/blog/${blogs[1].id}`} className="block">
              <div className="flex flex-col bg-white rounded-md overflow-hidden shadow-md cursor-pointer">
                {blogs[1].imageUrl && (
                  <div className="relative w-full h-48 sm:h-56">
                    <img
                      src={blogs[1].imageUrl}
                      alt={blogs[1].title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-base font-bold text-black hover:underline uppercase">
                    {blogs[1].title}
                  </h2>
                  <div className="flex gap-2 items-center mt-2 flex-wrap">
                    <span className="text-orange-600 text-sm uppercase">
                      TAGGED:
                    </span>
                    <Link
                      href={`/search?q=history`}
                      className="border py-0 px-3 border-orange-600 text-orange-600 text-sm hover:bg-orange-50"
                    >
                      History
                    </Link>
                    <Link
                      href={`/search?q=politics`}
                      className="border py-0 px-3 border-orange-600 text-orange-600 text-sm hover:bg-orange-50"
                    >
                      Politics
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Blog 3 */}
          {blogs.length >= 3 && (
            <Link href={`/blog/${blogs[2].id}`} className="block">
              <div className="flex flex-col bg-white rounded-md overflow-hidden shadow-md cursor-pointer">
                {blogs[2].imageUrl && (
                  <div className="relative w-full h-48 sm:h-56">
                    <img
                      src={blogs[2].imageUrl}
                      alt={blogs[2].title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-base font-bold text-black hover:underline uppercase">
                    {blogs[2].title}
                  </h2>
                  <div className="flex gap-2 items-center mt-2 flex-wrap">
                    <span className="text-orange-600 text-sm uppercase">
                      TAGGED:
                    </span>
                    <Link
                      href={`/search?q=science`}
                      className="border py-0 px-3 border-orange-600 text-orange-600 text-sm hover:bg-orange-50"
                    >
                      Science
                    </Link>
                    <Link
                      href={`/search?q=religion`}
                      className="border py-0 px-3 border-orange-600 text-orange-600 text-sm hover:bg-orange-50"
                    >
                      Religion
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Blog 4 */}
          {blogs.length >= 4 && (
            <Link href={`/blog/${blogs[3].id}`} className="block">
              <div className="flex flex-col bg-white rounded-md overflow-hidden shadow-md cursor-pointer">
                {blogs[3].imageUrl && (
                  <div className="relative w-full h-48 sm:h-56">
                    <img
                      src={blogs[3].imageUrl}
                      alt={blogs[3].title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-base font-bold text-black hover:underline uppercase">
                    {blogs[3].title}
                  </h2>
                  <div className="flex gap-2 items-center mt-2 flex-wrap">
                    <span className="text-orange-600 text-sm uppercase">
                      TAGGED:
                    </span>
                    <Link
                      href={`/search?q=history`}
                      className="border py-0 px-3 border-orange-600 text-orange-600 text-sm hover:bg-orange-50"
                    >
                      History
                    </Link>
                    <Link
                      href={`/search?q=politics`}
                      className="border py-0 px-3 border-orange-600 text-orange-600 text-sm hover:bg-orange-50"
                    >
                      Politics
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Blog 5 */}
          {blogs.length >= 5 && (
            <Link href={`/blog/${blogs[4].id}`} className="block">
              <div className="flex flex-col bg-white rounded-md overflow-hidden shadow-md cursor-pointer">
                {blogs[4].imageUrl && (
                  <div className="relative w-full h-48 sm:h-56">
                    <img
                      src={blogs[4].imageUrl}
                      alt={blogs[4].title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-base font-bold text-black hover:underline uppercase">
                    {blogs[4].title}
                  </h2>

                  <div className="flex gap-2 items-center mt-2 flex-wrap">
                    <span className="text-orange-600 text-sm uppercase">
                      TAGGED:
                    </span>
                    <Link
                      href={`/search?q=science`}
                      className="border py-0 px-3 border-orange-600 text-orange-600 text-sm hover:bg-orange-50"
                    >
                      Science
                    </Link>
                    <Link
                      href={`/search?q=history`}
                      className="border py-0 px-3 border-orange-600 text-orange-600 text-sm hover:bg-orange-50"
                    >
                      History
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-8 mt-20 px-2 sm:px-4">
        {/* News 1 */}
        <div className="flex flex-col bg-white rounded-md overflow-hidden shadow-2xl">
          <div className="relative w-full h-48 sm:h-56">
            <Image
              src="/shari.png"
              alt="Three Key Moments for Shari’a in Nigeria"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/yQ5FJS6IFfe7zpQ8gzk7">
              <h2 className="text-base font-bold text-black hover:underline uppercase">
                Three Key Moments for Shari’a in Nigeria
              </h2>
            </Link>
            <p className="text-xs text-orange-600 mt-1 uppercase">
              Alex Thurston
            </p>
            <p className="text-orange-600 text-sm">20 MARCH 2025</p>
            <div className="flex gap-4 items-center mt-2 flex-wrap">
              <span className="text-orange-600 text-sm">TAGGED:</span>
              <Link
                href="/africa"
                className="border py-0 px-3 border-orange-600 text-orange-600 text-sm hover:bg-orange-50"
              >
                Africa
              </Link>
              <Link
                href="/america"
                className="border py-0 px-3 border-orange-600 text-orange-600 text-sm hover:bg-orange-50"
              >
                America
              </Link>
            </div>
          </div>
        </div>

        {/* News 2 */}
        <div className="flex flex-col bg-white rounded-md overflow-hidden shadow-2xl">
          <div className="relative w-full h-48 sm:h-56">
            <Image
              src="/strug.png"
              alt="Violent Dissent, Intra-Muslim Struggles, and Political Crisis in Northern Nigeria"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/sVYggqD0kTZjrZsC7GIb">
              <h2 className="text-base font-bold text-black hover:underline uppercase">
                Violent Dissent, Intra-Muslim Struggles, and Political Crisis in
                Northern Nigeria
              </h2>
            </Link>
            <p className="text-xs text-orange-600 mt-1 uppercase">
              Alex Thurston
            </p>
            <p className="text-orange-600 text-sm">15 MARCH 2025</p>
            <div className="flex gap-4 items-center mt-2 flex-wrap">
              <span className="text-orange-600 text-sm">TAGGED:</span>
              <Link
                href="/politics"
                className="border py-0 px-3 border-orange-600 text-orange-600 text-sm hover:bg-orange-50"
              >
                Politics
              </Link>
              <Link
                href="/religion"
                className="border py-0 px-3 border-orange-600 text-orange-600 text-sm hover:bg-orange-50"
              >
                Religion
              </Link>
            </div>
          </div>
        </div>

        {/* News 3 */}
        <div className="flex flex-col bg-white rounded-md overflow-hidden shadow-2xl">
          <div className="relative w-full h-48 sm:h-56">
            <Image
              src="/ngs.png"
              alt="Mass Protests Against Corruption in Abuja"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/XAwf0LrciDI0bYxkQdsb">
              <h2 className="text-base font-bold text-black hover:underline uppercase">
                Nigerians See Mixed Economic Picture as Election Day Nears{" "}
              </h2>
            </Link>
            <p className="text-orange-600 text-sm">10 MARCH 2025</p>
            <div className="flex gap-4 items-center mt-2 flex-wrap">
              <span className="text-orange-600 text-sm">TAGGED:</span>
              <Link
                href="/africa"
                className="border py-0 px-3 border-orange-600 text-orange-600 text-sm hover:bg-orange-50"
              >
                Africa
              </Link>
              <Link
                href="/europe"
                className="border py-0 px-3 border-orange-600 text-orange-600 text-sm hover:bg-orange-50"
              >
                Europe
              </Link>
            </div>
          </div>
        </div>

        {/* News 4 */}
        <div className="flex flex-col bg-white rounded-md overflow-hidden shadow-2xl">
          <div className="relative w-full h-48 sm:h-56">
            <Image
              src="/ngd.png"
              alt="Educational Reform Sparks Debate in Kano"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <Link href="https://cyclopedia-media-hub.vercel.app/blog/gSgBpeaXGNgVDYQWxIlT">
              <h2 className="text-base font-bold text-black hover:underline uppercase">
                Nigerians Deeply Divided by Religion on Key Issues{" "}
              </h2>
            </Link>
            <p className="text-xs text-orange-600 mt-1 uppercase">
              Musa Ibrahim
            </p>
            <p className="text-orange-600 text-sm">5 MARCH 2025</p>
            <div className="flex gap-4 items-center mt-2 flex-wrap">
              <span className="text-orange-600 text-sm">TAGGED:</span>
              <Link
                href="/asia"
                className="border py-0 px-3 border-orange-600 text-orange-600 text-sm hover:bg-orange-50"
              >
                Asia
              </Link>
              <Link
                href="/america"
                className="border py-0 px-3 border-orange-600 text-orange-600 text-sm hover:bg-orange-50"
              >
                America
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* More Blogs Button */}
      <div className="mx-auto">
        <form
          onSubmit={handleSearch}
          className="flex lg:hidden items-center  mr-6 mx-auto"
          role="search"
          aria-label="Site Search"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anything in cyclopedia"
            className="px-5 py-2 rounded-l-md shadow-2xl text-black focus:outline-none focus:ring-2 focus:ring-purple-400 w-64"
            aria-label="Search input"
          />
          <button
            type="submit"
            // onClick={() => setShowNav(false)}
            className="bg-gradient-to-r from-purple-500 to-cyan-400  px-6 py-2 rounded-r-md text-white font-semibold transition"
          >
            Search
          </button>
        </form>
      </div>
    </motion.div>
  );
}
