"use client";
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";
import { LoaderCircle, ThumbsUp } from "lucide-react";
import BlogDisplay from "@/components/BlogDisplay";
import { usePathname } from "next/navigation";
import Link from "next/link";

const valSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  body: Yup.string()
    .required("Please add your content")
    .min(10, "Minimum of 10 characters"),
  genre: Yup.string().required("Please select a genre"),
  link: Yup.string().url("Must be a valid URL").nullable(),
});

const UploadBlog = ({ session }) => {
  const [processing, setProcessing] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [previewBody, setPreviewBody] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const pathname = usePathname();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setProcessing(true);

      const blogData = {
        imageUrl: values.image || null,
        title: values.title.trim(),
        link: values.link ? values.link.trim() : "",
        body: values.body.trim(),
        genre: values.genre,
        author: session?.user?.name || "Anonymous",
        timestamp: new Date().toISOString(),
      };

      await addDoc(collection(db1, "blog"), blogData);

      resetForm();
      setPreviewBody("");
      setModalVisibility(true);
    } catch (error) {
      console.error("Error uploading blog:", error);
      alert("Error uploading blog. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-orange-600 p-6">
      <div className="w-full max-w-3xl bg-gray-900 rounded-xl shadow-xl p-8 text-white mt-10">
        <header className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold tracking-wide">
            Upload Blog Post
          </h1>
          <nav className="flex gap-3">
            <Link href="/upload-to-video">
              <p className="inline-block bg-gradient-to-r from-orange-500 via-gray-800 to-gray-700 hover:from-orange-600 hover:via-gray-900 hover:to-gray-800 transition rounded-md px-5 py-2 font-semibold shadow-md">
                Upload Video
              </p>
            </Link>
            <Link href="/upload-to-reels">
              <p className="inline-block bg-gradient-to-r from-orange-500 via-gray-800 to-gray-700 hover:from-orange-600 hover:via-gray-900 hover:to-gray-800 transition rounded-md px-5 py-2 font-semibold shadow-md">
                Upload Reels
              </p>
            </Link>
          </nav>
        </header>

        <button
          onClick={() => setShowPopup(true)}
          className="mb-8 text-sm text-orange-400 hover:text-orange-500 underline transition focus:outline-none"
          aria-label="Learn how to upload"
        >
          (!) Learn to Upload
        </button>

        {showPopup && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-6 z-50"
          >
            <div className="max-w-lg bg-gray-800 rounded-lg p-6 text-gray-200 shadow-lg overflow-y-auto max-h-[80vh]">
              <h2 className="text-2xl font-semibold mb-4 text-center text-orange-400">
                Follow These Simple Steps:
              </h2>
              <ol className="list-decimal list-inside space-y-3 text-sm leading-relaxed">
                <li>
                  <strong>Log In:</strong> Please log in to your Webwiz Creation
                  account before uploading your blog post. This ensures your
                  name appears as the author.
                  <div className="mt-2">
                    <Link href="/auth/signin">
                      <p className="inline-block text-orange-400 border border-orange-400 rounded-md px-4 py-1 hover:bg-orange-400 hover:text-gray-900 transition">
                        Log in here
                      </p>
                    </Link>
                  </div>
                </li>
                <li>
                  <strong>Write Your Blog Title:</strong> Craft a catchy,
                  concise, and descriptive title.
                </li>
                <li>
                  <strong>Add Your Content:</strong> Write engaging content
                  relevant to your title. Use clear language and format for
                  readability.
                </li>
                <li>
                  <strong>Add a Link (Optional):</strong> Include any relevant
                  URLs (must be valid).
                </li>
                <li>
                  <strong>Select a Genre:</strong> Choose the genre that fits
                  your content best for better categorization.
                </li>
                <li>
                  <strong>Submit:</strong> Review and submit your blog post. It
                  will be reviewed and published accordingly.
                </li>
              </ol>
              <div className="mt-6 flex justify-end gap-4">
                <Link href="/auth/signin">
                  <p className="bg-orange-500 px-6 py-2 rounded-md font-semibold text-gray-900 hover:bg-orange-600 transition shadow">
                    Get Started
                  </p>
                </Link>
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-700 px-6 py-2 rounded-md font-semibold hover:bg-gray-600 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <Formik
          initialValues={{
            title: "",
            body: "",
            genre: "",
            link: "",
            image: "",
          }}
          validationSchema={valSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-1 font-medium text-gray-300"
                >
                  Blog Title <span className="text-red-600">*</span>
                </label>
                <Field
                  name="title"
                  type="text"
                  placeholder="Enter your blog title..."
                  className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  aria-required="true"
                />
                <ErrorMessage
                  name="title"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block mb-1 font-medium text-gray-300"
                >
                  Image URL (Optional)
                </label>
                <Field
                  name="image"
                  type="url"
                  placeholder="Enter image URL"
                  className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
                <ErrorMessage
                  name="image"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {values.image && (
                <div className="mb-6 rounded-md overflow-hidden border border-gray-700">
                  <img
                    src={values.image}
                    alt="Image Preview"
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="body"
                  className="block mb-1 font-medium text-gray-300"
                >
                  Content <span className="text-red-600">*</span>
                </label>
                <small className="block mb-2 text-xs text-gray-400">
                  Tip: To add a link use{" "}
                  <code className="bg-gray-700 px-1 rounded text-orange-400">
                    [text](https://your-link.com)
                  </code>
                  , and for
                  <strong> bold</strong> wrap text with{" "}
                  <code className="bg-gray-700 px-1 rounded text-orange-400">
                    **double asterisks**
                  </code>
                  .
                </small>
                <Field
                  as="textarea"
                  name="body"
                  placeholder="Enter your blog content..."
                  rows={7}
                  className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none"
                  onChange={(e) => {
                    setFieldValue("body", e.target.value);
                    setPreviewBody(e.target.value);
                  }}
                  aria-required="true"
                />
                <ErrorMessage
                  name="body"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />

                {/* Preview Section */}
                {pathname?.includes("/upload") && (
                  <section className="mt-6 p-4 bg-gray-900 rounded-md border border-gray-700">
                    <h3 className="mb-2 text-sm font-semibold text-orange-400">
                      Preview:
                    </h3>
                    <BlogDisplay
                      title={values.title}
                      genre={values.genre}
                      body={previewBody}
                    />
                  </section>
                )}
              </div>

              <div>
                <label
                  htmlFor="genre"
                  className="block mb-1 font-medium text-gray-300"
                >
                  Genre <span className="text-red-600">*</span>
                </label>
                <Field
                  name="genre"
                  as="select"
                  className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  aria-required="true"
                >
                  <option value="" disabled>
                    Select a genre
                  </option>
                  <option value="Webwiz">Webwiz</option>
                  <option value="Technology">Technology</option>
                  <option value="Spirituality">Spirituality</option>
                  <option value="Science">Science</option>
                  <option value="Art">Art</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Crypto">Crypto</option>
                  <option value="Blockchain">Blockchain</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Software">Software</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Gadgets">Gadgets</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Astronomy">Astronomy</option>
                  <option value="Geography">Geography</option>
                  <option value="Psychology">Psychology</option>
                  <option value="Philosophy">Philosophy</option>
                  <option value="Sociology">Sociology</option>
                  <option value="Economics">Economics</option>
                  <option value="Law">Law</option>
                  <option value="AI">AI</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Social Network">Social Network</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Stories">Stories</option>
                  <option value="Coding">Coding</option>
                  <option value="Health">Health</option>
                  <option value="Finance">Finance</option>
                  <option value="Travel">Travel</option>
                  <option value="Faith">Faith</option>
                  <option value="Religion">Religion</option>
                  <option value="Sex-Lesson">Sex-Lesson</option>
                  <option value="Wealth">Wealth</option>
                  <option value="Business">Business</option>
                  <option value="Ideas">Ideas</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Motivation">Motivation</option>
                  <option value="Education">Education</option>
                  <option value="Tutorials">Tutorials</option>
                </Field>
                <ErrorMessage
                  name="genre"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={processing}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-400 text-white font-bold rounded-md px-6 py-3 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
                >
                  {processing ? (
                    <>
                      <LoaderCircle className="animate-spin h-5 w-5" />
                      Uploading...
                    </>
                  ) : (
                    "Upload"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        {/* Success Modal */}
        {modalVisibility && (
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="upload-success-title"
            aria-describedby="upload-success-desc"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-4 z-50"
          >
            <div className="bg-gray-800 rounded-xl p-6 max-w-sm w-full text-center shadow-lg">
              <ThumbsUp className="mx-auto mb-4 h-10 w-10 text-orange-400" />
              <h2
                id="upload-success-title"
                className="text-lg font-semibold text-orange-400 mb-2"
              >
                Your blog was uploaded successfully!
              </h2>
              <p
                id="upload-success-desc"
                className="text-sm text-gray-300 mb-6"
              >
                Thanks for sharing your blog post with the community.
              </p>
              <button
                onClick={() => setModalVisibility(false)}
                className="px-6 py-2 bg-orange-500 rounded-md font-semibold text-gray-900 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition shadow"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default UploadBlog