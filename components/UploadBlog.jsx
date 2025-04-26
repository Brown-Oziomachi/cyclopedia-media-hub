"use client";

import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { db1, } from "@/lib/firebaseConfig"; // Import Firestore and Storage
import { LoaderCircle } from "lucide-react";

// Validation Schema
const valSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  body: Yup.string()
    .required("Please post your blog")
    .min(10, "Minimum of 10 characters"),
  genre: Yup.string().required("Please select a genre"),
});

const UploadBlog = ({ session }) => {
  const [processing, setProcessing] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setProcessing(true);

      // Upload the image to Firebase Storage
     
      // Create an object to be sent to the database
      const blogData = {
        title: values.title,
        body: values.body,
        genre: values.genre,
        author: session?.user?.name || "Anonymous",
        timestamp: new Date().toLocaleDateString(),
      };

      const blogRef = await addDoc(collection(db1, "blog"), blogData);
      console.log("Blog ID:", blogRef.id);

      resetForm();
      setModalVisibility(true);
    } catch (error) {
      console.error("Error uploading blog:", error);
      alert("Error uploading blog. Try again!");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6">
      <div className="w-full max-w-lg rounded-lg shadow-xl p-6 bg-gradient-to-r from-gray-700 via-gray-800 to-black">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Publish Your Blog
        </h2>
        <Formik
          initialValues={{ title: "", body: "", genre: "",  }}
          validationSchema={valSchema}
          onSubmit={handleSubmit}
        >
            <Form className="space-y-6">
             

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                  Blog Title
                </label>
                <Field
                  name="title"
                  type="text"
                  placeholder="Enter your blog title..."
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage name="title" component="p" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Body Input */}
              <div>
                <label htmlFor="body" className="block text-sm font-medium text-gray-300">
                  Content
                </label>
                <Field
                  name="body"
                  as="textarea"
                  rows="6"
                  placeholder="Write your blog content..."
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage name="body" component="p" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Genre Selection */}
              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-gray-300">
                  Genre
                </label>
                <Field
                  name="genre"
                  as="select"
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="" disabled>
                    Select a genre
                  </option>
                  <option value="Technology">Technology</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Coding">Coding</option>
                  <option value="Health">Health</option>
                  <option value="Finance">Finance</option>
                  <option value="Travel">Travel</option>
                </Field>
                <ErrorMessage name="genre" component="p" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Submit Button */}
              <button
                disabled={processing}
                type="submit"
                className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
              >
                {processing ? (
                  <span className="flex items-center justify-center">
                    <LoaderCircle className="animate-spin text-2xl" />
                  </span>
                ) : (
                  "Submit Blog"
                )}
              </button>
            </Form>
        </Formik>
      </div>

      {/* Modal for Successful Upload */}
      {modalVisibility && (
        <div className="absolute h-screen w-full bg-black/20 flex items-center justify-center">
          <div className="w-[22rem] h-[30vh] flex flex-col gap-6 items-center justify-center shadow-2xl rounded-lg bg-gray-800 text-white p-6">
            <h1 className="text-xl font-semibold">Blog Upload Successful</h1>
            <ThumbsUp  className="text-6xl text-green-500" />
            <button
              onClick={() => setModalVisibility(false)}
              className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default UploadBlog;
