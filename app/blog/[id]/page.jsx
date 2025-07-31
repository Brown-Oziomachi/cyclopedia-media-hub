"use client";

import React, { use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { db1, db3 } from "@/lib/firebaseConfig";
import Navbar from "@/components/Navbar";
import {
  doc,
  updateDoc,
  collection,
  query,
  getDocs,
  arrayUnion,
  addDoc,
  serverTimestamp,
  getDoc,
  where,
} from "firebase/firestore";
import {
  LoaderCircle,
  Heart,
  Share,
  LinkIcon,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import BlogDisplay from "@/components/BlogDisplay";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // for redirect
import ScrollProgressBar from "@/components/ScrollProgressBar";

const BlogDetails = ({ params }) => {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;

  const { data: session } = useSession();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [Agreed, setAgreed] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

  // Inside your component
  const router = useRouter();
  const handleReplySubmit = async (
    commentId,
    replyText,
    setReplyText,
    setReplyingTo,
    setComments
  ) => {
    if (!replyText.trim()) return;
    const user = session?.user;
    if (!user) {
      alert("Please log in to reply.");
      return;
    }
    const replyData = {
      id: Date.now().toString(),
      userName: user.name || "Anonymous",
      userImage: user.image || "/default-avatar.png",
      text: replyText,
      timestamp: Math.floor(Date.now() / 1000),
    };
    const commentRef = doc(db3, "comments", commentId);
    try {
      await updateDoc(commentRef, {
        replies: arrayUnion(replyData),
      });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...(comment.replies || []), replyData] }
            : comment
        )
      );
      setReplyText("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  useEffect(() => {
    async function fetchComments() {
      if (!id) return;
      try {
        const commentsQuery = query(
          collection(db3, "comments"),
          where("blogId", "==", id)
        );
        const querySnapshot = await getDocs(commentsQuery);
        const commentsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentsArray);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
    fetchComments();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    async function fetchBlog() {
      const blogRef = doc(db1, "blog", id);
      const blogDoc = await getDoc(blogRef);
      if (blogDoc.exists()) {
        setBlog({ id, ...blogDoc.data() });
        setLikes(blogDoc.data().likes || 0);
      }
    }
    fetchBlog();
  }, [id]);

  useEffect(() => {
    const storedLiked = localStorage.getItem(`liked-${id}`);
    if (storedLiked) {
      setAgreed(true);
    }
  }, [id]);

  useEffect(() => {
    if (!blog) return;
    async function fetchOtherBlogs() {
      try {
        const blogsRef = collection(db1, "blog");
        const q = query(blogsRef);
        const querySnapshot = await getDocs(q);
        const blogs = [];
        querySnapshot.forEach((docSnap) => {
          if (docSnap.id !== blog.id) {
            blogs.push({ id: docSnap.id, ...docSnap.data() });
          }
        });
        setOtherBlogs(blogs);
      } catch (err) {
        console.error("Error fetching other blogs:", err);
      }
    }
    fetchOtherBlogs();
  }, [blog]);

  const handleCommentSubmit = async () => {
    if (newComment.trim() !== "") {
      try {
        const commentData = {
          blogId: id,
          text: newComment,
          userName: session?.user?.name || "Anonymous",
          userImage: session?.user?.image || "/default-avatar.png",
          timestamp: serverTimestamp(),
        };
        await addDoc(collection(db3, "comments"), commentData);
        setComments((prev) => [...prev, commentData]);
        setNewComment("");
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  const handleShareClick = () => {
    setShowShareMenu(!showShareMenu);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Blog link copied to clipboard!");
  };

  const handleLikeClick = async () => {
    const newLikes = Agreed ? likes - 1 : likes + 1;
    setAgreed(!Agreed);
    setLikes(newLikes);
    localStorage.setItem(`liked-${id}`, (!Agreed).toString());
    try {
      const blogRef = doc(db1, "blog", id);
      await updateDoc(blogRef, { likes: newLikes });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleMoreBlogClick = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/blog");
    }, 3000);
  };

  const handleProfile = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/myprofile");
    }, 3000);
  };

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <LoaderCircle className="text-green-600 w-14 h-14 animate-spin" />
        <img
          src="/logo.jpg"
          alt="My Logo"
          className="h-30 lg:h-30 mt-10 animate-pulse absolute top-40 left-0 right-0 bottom-0 mx-auto shadow-xl "
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      className="min-h-screen px-2 py-19 max-w-5xl mx-auto bg-gray-400/5 text-gray-300 font-sans leading-relaxed space-y-14"
    >
      <ScrollProgressBar />
      {/* Blog Header Section */}
      <div className="bg-black shadow-xl rounded-2xl p-10 relative border border-gray-700 space-y-6">
        <span className="inline-block px-5 py-2 bg-gradient-to-r from-green-600 text-black font-semibold text-sm rounded-full shadow-md shadow-black transition-transform hover:scale-105">
          {blog.genre}
        </span>

        <h1 className="text-xs text-gray-400 text-center absolute top-10 right-6 font-mono tracking-widest">
          THE <span className="text-green-600">SUN</span> WEB
        </h1>

        <div className="flex flex-col items-center mb-6">
          <img
            title="View Profile"
            src="/web19.jpg"
            alt="User"
            className="relative w-24 h-24 rounded-full   shadow-black shadow-xl cursor-pointer hover:scale-105 transition-transform border border-s-green-600 border-r-green-600"
          />
          <div>
            <h4 className="absolute inset-0 -top-20 items-center justify-center flex  underline text-xs text-green-600 text-center font-serif">
              <Link href="/myprofile">
                <button
                  onClick={handleProfile}
                  className="mb-2 text-center text-sm text-green-600 tracking-widest  border-green-600 px-5 py-2 shadow-black shadow-xl rounded-lg hover:bg-green-600 hover:text-black transition duration-300 w-fit mx-auto"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "View profile"}
                </button>
                <br />
              </Link>
            </h4>

            <h5 className="mt-2  font-semibold text-white text-2xl ">
              <span className="text-green-600">B</span>row
              <span className="text-green-600">n</span>{" "}
              <span className="text-green-600">C</span>od
              <span className="text-green-600">e</span>
            </h5>
          </div>
        </div>

        <h5 className="lg:hidden mt-2 mb-2 text-center bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded shadow-gray-800 shadow-xl hover:shadow-xl transition duration-300 shadow-black ">
          Follow me on
        </h5>
        <div className=" flex gap-4 shadow-gray-800 items-center justify-center ">
          <h5 className="max-lg:hidden mt-2 mb-2 text-center bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded shadow-black shadow-xl hover:shadow-xl transition duration-300 shadow-black ">
            Follow me on
          </h5>
          <a
            href="https://whatsapp.com/channel/0029Vb6BDcsJZg401UUoHA0T"
            target="_self"
            rel="noopener noreferrer"
            className="z-50 text-sm bg-gray-400/5 shadow-black border-x border-x-green-600 text-white py-4 px-4 rounded-full shadow-xl hover:bg-blue-800 transition duration-300"
          >
            <MessageCircle className="text-green-600 shadow-black size-4 mx-auto" />
          </a>
          <a
            href="https://www.facebook.com/mazi.brown.oziomachi"
            target="_self"
            rel="noopener noreferrer"
            className="z-50 text-sm bg-gray-400/5 shadow-black border-x border-x-green-600 text-white py-4 px-4 rounded-full shadow-xl hover:bg-blue-800 transition duration-300"
          >
            <Facebook className="text-blue-600 size-4 mx-auto" />
          </a>
          <a
            href="https://www.instagram.com/webwiz_creation_webdevelopers?igsh=MThvdDEwa3c3aGpsMQ=="
            target="_self"
            rel="noopener noreferrer"
            className="z-50 text-sm bg-gray-400/5 shadow-black border-x border-x-green-600 text-white py-4 px-4 rounded-full shadow-xl hover:bg-blue-800 transition duration-300"
          >
            <Instagram className="text-pink-600 size-4 mx-auto" />
          </a>
          <a
            href="https://www.linkedin.com/in/brownoziomachi72a5a3229?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_self"
            rel="noopener noreferrer"
            className="z-50 text-sm bg-gray-400/5 shadow-black border-x border-x-green-600 text-white py-4 px-4 rounded-full shadow-xl hover:bg-blue-800 transition duration-300"
          >
            <Linkedin className="text-blue-400 size-4 mx-auto" />
          </a>
          <a
            href="https://youtube.com/@webwizcreation?si=LpNgM7MwIkgYJg5X"
            target="_self"
            rel="noopener noreferrer"
            className=" z-50 text-sm bg-gray-400/5 shadow-black border-x border-x-green-600 text-white py-4 px-4 rounded-full shadow-xl hover:bg-blue-800 transition duration-300"
          >
            <Youtube className="text-red-600 size-4 mx-auto" />
          </a>
        </div>
      </div>
      <p className="-mt-15 text-center text-xs text-shadow-2xs border-b border-x border-x-green-600 px-0 border-gray-400/20 rounded-md">
        Learn, unlearn <span className="text-green-600">and</span> relearn.
      </p>
      <div className="bg-black rounded-xl shadow-lg p-2 border border-gray-700">
        <h1 className="text-2xl font-extrabold text-white text-center drop-shadow-lg mt-5 shadow-black shadow-xl">
          {blog.title}
          <p className="text-gray-500 text-sm py-5">
            {blog.timestamp || "Unknown Date"}
          </p>
          <div className="">
            {blog.imageUrl && (
              <div className="relative w-full h-64 md:h-96">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title || "Blog image"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            )}
            {/* Show video if blog.video exists */}
            {blog.video && (
              <video
                src={blog.video}
                controls
                className="w-full rounded-md mt-4"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </h1>
        <BlogDisplay body={blog.body} />
      </div>

      <div className="flex flex-col-1 justify-center gap-3 items-center shadow-lg text-sm ">
        <button
          onClick={handleLikeClick}
          className={`border flex md:flex-row items-center justify-center text-sm py-2 px-5 rounded-lg transition-all ${
            Agreed
              ? "text-green-600 hover:text-green-700"
              : "text-gray-400 hover:text-red-600"
          }`}
          aria-label="Like Button"
        >
          <div
            className={`transition-transform ${
              Agreed ? "scale-110 -ml-2" : ""
            }`}
          />
          {Agreed ? "Agreed" : "Agree"} ({likes})
        </button>

        <div
          className="border flex items-center gap-1 text-gray-400 font-semibold py-2 px-6 rounded-lg hover:bg-gray-800 transition"
          title="Number of Comments"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-2m12-8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h2"
            />
          </svg>
          {
            // Count comments + all replies
            comments.reduce(
              (total, comment) =>
                total + 1 + (comment.replies ? comment.replies.length : 0),
              0
            )
          }
        </div>

        <button
          onClick={handleShareClick}
          className="border flex items-center gap-2 text-gray-400 font-semibold py-2 px-6 rounded-lg hover:bg-gray-800 transition relative"
        >
          <Share className="h-4 w-4" />
          {showShareMenu && (
            <div className="absolute mr-50 top-full left-0 bg-gray-400/5 shadow-xl rounded-lg p-4 flex flex-col gap-3 text-sm w-56 z-50 border border-green-600">
              <a
                href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                target="_self"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Share on Twitter
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`}
                target="_self"
                rel="noopener noreferrer"
                className="text"
              >
                Share on LinkedIn
              </a>
              <button
                onClick={handleShareClick}
                className="h-5 w-5 text-green-600"
              >
                Close
              </button>
            </div>
          )}
        </button>
        <button
          onClick={handleCopyLink}
          className="border flex flex-col items-center justify-center gap-2 text-gray-400 font-semibold py-2 px-6 rounded-lg hover:bg-gray-800 transition"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
      </div>
      {/* Comment Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gray-400/5 shadow-xl rounded-2xl p-2 border border-gray-700 space-y-8 shadow-4xl shadow-black"
      >
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-extrabold text-white tracking-wide">
            Join <span className="text-green-600 mb-0">The</span> Conversation
          </h2>
        </div>

        {/* New Comment Input */}
        <div className="lg:flex items-center space-x-5 grid space-y-4 lg:space-y-0 overflow-auto md:overflow-scroll">
          <div className="flex gap-2">
            <img
              src={session ? session?.user?.image : "/logo.jpg"}
              alt="Avatar"
              className="w-12 h-12 rounded-full shadow-md"
            />

            <input
              type="text"
              placeholder={
                session ? "What's on your mind?" : "Please sign in to comment"
              }
              disabled={!session}
              className="flex-grow p-5 rounded-lg bg-gray-400/5 text-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 transition disabled:opacity-50"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </div>

          <div className="flex gap-16 items-center justify-center">
            <button
              onClick={() => {
                if (!session) {
                  router.push("/auth/signin");
                } else {
                  handleCommentSubmit();
                }
              }}
              className="shadow-black lg:px-5 lg:py-2 px-3 py-2 max-md:w-1/2 bg-gradient-to-r from-green-600 to-green-400 text-black font-semibold rounded-lg shadow-xl hover:from-green-600 hover:to-yellow-500 transition"
              title={session ? "You can now post" : "Please sign in to post"}
            >
              Post
            </button>
            <a href="/auth/signin" className="text-green-600 underline">
              Signin here
            </a>
          </div>
        </div>
      </motion.div>
      {/* List of Comments */}
      <ul className=" space-y-6 max-h-[500px] overflow-y-auto  pr-3 scrollbar-thin scrolbar-thumb-green-600 scrollbar-track-gray-800">
        {comments.length > 0 ? (
          comments
            .sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds)
            .map((comment) => (
              <li
                key={comment.id}
                className="bg-gray-400/5 p-6 rounded-xl shadow-lg hover:bg-gray-800 transition"
              >
                <div className=" items-center space-x-4">
                  <img
                    src={comment.userImage || "/default-avatar.png"}
                    scr={comment.profile || "/unknown person"}
                    alt="Wiz"
                    className="w-10 h-10 rounded-full mt-0 shadow-sm -ml-5"
                  />
                  <div className=" bg-gray-700/10 rounded-lg  ml-5 ">
                    <Link href={"/users/${post.profile}"}>
                      <span
                        className="star-rating ml-5"
                        data-rating="4.2"
                      ></span>

                      <p className="text-white font-semibold ml-5">
                        {comment.userName} {comment.profile}
                      </p>
                      {comment.timestamp && (
                        <p className="text-sm text-gray-400 ml-5">
                          {/* {new Date(comment.timestamp.seconds * 1000).toLocaleString()} */}
                        </p>
                      )}
                    </Link>
                    <p className="text-gray-300 mb-3 ml-5">{comment.text}</p>
                  </div>
                </div>

                <button
                  className="text-green-600 font-semibold hover:underline"
                  onClick={() => setReplyingTo(comment.id)}
                >
                  Reply
                </button>

                {replyingTo === comment.id && (
                  <div className="mt-4 space-y-3">
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      className="w-full p-3 bg-gray-400/5 rounded-lg border border-green-600 text-white focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button
                      className="px-5 py-2 bg-green-600 text-black font-semibold rounded-lg shadow-md hover:bg-orange-500 transition"
                      onClick={
                        session
                          ? handleReplySubmit(
                              comment.id,
                              replyText,
                              setReplyText,
                              setReplyingTo,
                              setComments,
                              db3
                            )
                          : "/auth/signin"
                      }
                    >
                      Submit
                    </button>
                  </div>
                )}

                {comment.replies?.length > 0 && (
                  <ul className="ml-4 mt-6 space-y-4 border-l border-green-600 border-b-green-600 pl-4">
                    {comment.replies.map((reply) => (
                      <li
                        key={reply.id}
                        className="flex space-x-2 bg-gray-400/5 border-b border-r p-3 border-r-green-600 border-b-green-600 rounded-lg"
                      >
                        <img
                          src={reply.userImage || "/default-avatar.png"}
                          alt="Reply User"
                          className="w-8 h-8 rounded-full  shadow"
                        />
                        <div>
                          <p className="text-white font-semibold">
                            {reply.userName}
                          </p>
                          <p className="text-gray-400">{reply.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))
        ) : (
          <p className="text-gray-400">Be the first to comment!</p>
        )}
      </ul>
      {/* Other Blog Suggestions */}
      {otherBlogs.length > 0 && (
        <div className="space-y-6">
          <h2 className="tracking-widest shadow-black shadow-xl text-3xl font-extrabold text-white text-center text-clip py-10 border-t border-t-green-600 border-r-green-600 border-x">
            <span className="text-green-600 ">Re</span>commen
            <span className="text-green-600">ded</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6  shadow-black shadow-xl">
            {otherBlogs.slice(0, 5).map((other) => (
              <Link key={other.id} href={`/blog/${other.id}`}>
                <div className="  shadow-black shadow-xl bg-gray-400/5 p-6 rounded-xl  hover:bg-gray-800 transition cursor-pointer border-r border-r-green-600">
                  <p className="text-green-600 font-semibold text-sm mb-3">
                    {other.genre}
                  </p>
                  <h3 className="text-sm font-bold text-white mb-2 text-center">
                    {other.title}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-4 text-center">
                    {other.body?.slice(0, 50)}...
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/blog">
            <div className="space-y-6 text-center">
              <button
                onClick={handleMoreBlogClick}
                className="mb-2 text-center text-sm font-bold text-green-600 tracking-widest border border-green-600 px-5 py-2 shadow-black shadow-xl rounded-lg hover:bg-green-600 hover:text-black transition duration-300 w-fit mx-auto"
                disabled={loading}
              >
                {loading ? "Loading" : "Read more blog"}
              </button>
            </div>
          </Link>

          <div className="mt-10">
            <h1 className="font-bold font-serif text-green-600">
              Have something to Share?
            </h1>
            <h2 className="font-mono">
              We value your thoughts and ideas! feel free to share your
              opinions, Suggestions, or topics you'd love to see on our blog.
              <h3>📩Reach out to us directly on WhatsApp:</h3>
            </h2>
            <a
              href="https://wa.me/+2348142995114?text=Hello,%20my%20name%20is%20[Your%20Name].%20I'd%20like%20to%20share%20some%20information%20with%20Wiz-Blog."
              target="_self"
              rel="noopener noreferrer"
              className="font-bold text-green-600 cursor-pointer hover:underline"
            >
              Click here to chat
            </a>
          </div>
        </div>
      )}
    </motion.div>
  );
};
export default BlogDetails;
