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
              {/* Title */}
              <div>
                <label className="block mb-1 font-medium text-gray-300">
                  Blog Title <span className="text-red-600">*</span>
                </label>
                <Field
                  name="title"
                  type="text"
                  placeholder="Enter your blog title..."
                  className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
                <ErrorMessage
                  name="title"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Image Upload */}
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  // Show preview immediately
                  const previewURL = URL.createObjectURL(file);
                  setFieldValue("image", previewURL); // Temporary preview

                  // Prepare for upload
                  const formData = new FormData();
                  formData.append("file", file);

                  try {
                    const res = await fetch("/api/blob/upload", {
                      method: "POST",
                      body: formData,
                    });

                    const data = await res.json();

                    if (data?.url) {
                      setFieldValue("image", data.url); // Replace with uploaded URL
                    } else {
                      alert("Image upload failed");
                    }
                  } catch (error) {
                    alert("Error uploading image");
                  }
                }}
                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              />

              {/* Preview Uploaded Image */}
              {values.image && (
                <div className="mb-6 rounded-md overflow-hidden border border-gray-700">
                  <img
                    src={values.image}
                    alt="Preview"
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}

              {/* Body */}
              <div>
                <label className="block mb-1 font-medium text-gray-300">
                  Content <span className="text-red-600">*</span>
                </label>
                <Field
                  as="textarea"
                  name="body"
                  rows={6}
                  className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none"
                  onChange={(e) => {
                    setFieldValue("body", e.target.value);
                    setPreviewBody(e.target.value);
                  }}
                />
                <ErrorMessage
                  name="body"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />

                {/* Preview */}
                {pathname?.includes("/upload") && (
                  <section className="mt-6 p-4 bg-gray-900 rounded-md border border-gray-700">
                    <h3 className="mb-2 text-sm font-semibold text-orange-400">
                      Preview:
                    </h3>
                    <BlogDisplay
                      title={values.title}
                      image={values.image}
                      genre={values.genre}
                      body={previewBody}
                    />
                  </section>
                )}
              </div>

              {/* Genre */}
              <div>
                <label className="block mb-1 font-medium text-gray-300">
                  Genre <span className="text-red-600">*</span>
                </label>
                <Field
                  name="genre"
                  as="select"
                  className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
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
                  <option value="Pp.Life Experience">pp.Life Experience</option>
                  <option value="AI">AI</option>
                  <option value="Quotes">Quotes</option>
                  <option value="Relationships">Relationships</option>
                  <option value="Marriage">Marriage</option>
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
                  <option value="Facts">Facts</option>
                  <option value="Drama">Drama</option>
                  <option value="Documentary">Documentary</option>
                  <option value="Teens">Teens</option>
                  <option value="Family">Family</option>
                  <option value="Divorce">Divorce</option>
                  <option value="Sports">Sports</option>
                  <option value="Street">Street</option>
                  <option value="Strategy">Strategy</option>
                  <option value="Animals">Animals</option>
                  <option value="News">News</option>
                  <option value="Politics">Politics</option>
                  <option value="Music">Music</option>
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

              {/* Link (Optional) */}
              <div>
                <label className="block mb-1 font-medium text-gray-300">
                  Optional Link
                </label>
                <Field
                  name="link"
                  type="url"
                  placeholder="https://example.com"
                  className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
                <ErrorMessage
                  name="link"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Submit */}
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
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-4 z-50">
            <div className="bg-gray-800 rounded-xl p-6 max-w-sm w-full text-center shadow-lg">
              <ThumbsUp className="mx-auto mb-4 h-10 w-10 text-orange-400" />
              <h2 className="text-lg font-semibold text-orange-400 mb-2">
                Your blog was uploaded successfully!
              </h2>
              <p className="text-sm text-gray-300 mb-6">
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

export default UploadBlog;
