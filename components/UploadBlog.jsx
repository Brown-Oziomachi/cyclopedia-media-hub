"use client";
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig"; // Import Firestore and Storage
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
  link: Yup.string().url("Must be a valid URL"),
});
const UploadBlog = ({ session }) => {
  const [processing, setProcessing] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [previewBody, setPreviewBody] = useState(""); // For markdown preview
  const [values, setValues] = useState({ title: "", genre: "", body: "" });
  const pathname = usePathname();
  const [showpopup, setShowPopup] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setProcessing(true);
      const blogData = {
        imageUrl: values.image,
        title: values.title,
        link: values.link,
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

  const handleShowPopup = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const closeModal = () => {
    setShowPopup(false);
  };
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-orange-400">
      <div className="w-full max-w-lg rounded-lg shadow-xl  bg-gradient-to-r from-gray-700 via-gray-800 to-orange-400 mt-20">
        <div>
          <h1 className="text font-bold text-center text-white m-5">
            
          <div className="flex items-center justify-between">
               
                <div className="mr-auto">
                  <Link href="/upload-to-video">

                <button
                  onClick={closeModal}
                  className="bg-gradient-to-r from-orange-400 via-gray-800 to-gray-700 hover:bg-gray-800 text-white font-semibold px-4 py-1 rounded transition duration-200 border"
                  >
                  Upload Video
                </button>
                  </Link>
                  </div>

                  <div className="ml-auto">
                  <Link href="/upload-to-reels">

                <button
                  onClick={closeModal}
                  className="bg-gradient-to-r from-orange-400 via-gray-800 to-gray-700 hover:bg-gray-800 text-white font-semibold px-4 py-1 rounded transition duration-200 border"
                  >
Reels                </button>
                  </Link>
                  </div>
                </div>

            <button onClick={handleShowPopup} className="text-sm text-gray-500">
              (!)Learn to Upload
            </button>
          </h1>
        </div>
        {showpopup && (
          <div className=" -mt-10 bg-black bg-opacity-100 flex justify-center items-center  z-50">
            <div className="bg-gray-800/50 text-gray-400 border rounded-lg p-2 ">
              <h1 className=" scroll-auto m-5">
                <h2 className="text-2xl text-center">Follow These Simple Steps:</h2> <br />
                Step 1: Log In - Please log in to your Webwiz Creation account
                before uploading your blog post. - This ensures that your name
                is displayed instead of "Anonymous" when you submit your post.{" "}
                <br />
                <Link href="/auth/signin" className="text-orange-400 border py-1 px-3 border-white rounded-md">
                  Log in here
                </Link>
                <br />
                <br />
                Step 2: Write Your Blog Title - Craft a catchy and descriptive
                title that captures the essence of your content. - Keep it
                concise and engaging to grab the reader's attention.
                <br />
                <br />
                Step 3: Add Your Content - Write your blog content, ensuring
                it's relevant to your title and engaging for your audience. -
                Use clear and concise language, and format your text for easy
                reading.
                <br />
                <br />
                Step 4: Step 4: Add a Link (Optional) If relevant, include a
                link to a related article, website, or resource. Make sure the
                link is accurate and functional.
                <br />
                <br />
                Step 5: Select a Genre Choose a genre that best suits your
                content and title. This helps readers find your blog post and
                ensures it's categorized correctly.
                <br />
                <br />
                Example Genres
                <li>Technology</li>
                <li>Lifestyle</li>
                <li>Business</li>
                <li>Education</li>
                and more!
                <br />
                <br />
                Step 6: Submit Your Blog Post Review your content for accuracy
                and grammar. Submit your blog post, and it will be reviewed and
                published. By logging in and following these steps, you'll be
                able to share your ideas and connect with your audience through
                the Webwiz Creation blog. Happy blogging!
              </h1>
              <div className="flex items-center justify-between">
                <div className="">
                <Link href="/auth/signin">
                  <button className=" bg-white hover:bg-gray-800 text-black font-semibold px-4 py-1 rounded transition duration-200 border border-black">Get Started</button>
                </Link>
                </div>
                <div className="">

                <button
                  onClick={closeModal}
                  className=" bg-black hover:bg-gray-800 text-white font-semibold px-4 py-1 rounded transition duration-200 border"
                  >
                  Close
                </button>
                  </div>
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
                  className=" text-sm font-medium text-gray-300 flex gap-2 "
                >
                  Blog Title <p className="text-red-600 mt-1">*</p>
                </label>
                <Field
                  name="title"
                  type="text"
                  placeholder="Enter your blog title..."
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="title"
                  component="p"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              {/* Image URL Input */}
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-300"
                >
                  Image URL (Optional)
                </label>
                <Field
                  name="image"
                  type="url"
                  placeholder="Enter image URL"
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="image"
                  component="p"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              {/* Display Image Preview */}
              <Field name="image">
                {({ field, form }) =>
                  field.value && (
                    <div className="mb-4">
                      <img
                        src={field.value}
                        alt="Image Preview"
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  )
                }
              </Field>

              {/* Body Input with Textarea and "Add Link" Helper */}
              <>
                <label
                  htmlFor="body"
                  className="flex gap-2 text-sm font-medium text-gray-300"
                >
                  Content <p className="text-red-600 ">*</p>
                </label>

                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">
                    <strong>Tip:</strong> To add a link, use{" "}
                    <span className="font-mono  px-1 rounded text-orange-400">
                      [text](https://your-link.com)
                    </span>
                    . To make text <strong>bold</strong>, wrap with{" "}
                    <span className="font-mono bg-gray-700 px-1 rounded text-orange-400">
                      **double asterisks**
                    </span>
                    .
                  </span>
                </div>
                <Field
                  as="textarea"
                  name="body"
                  placeholder="Enter your blog content..."
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px]"
                  onChange={(e) => {
                    setFieldValue("body", e.target.value);
                    setPreviewBody(e.target.value);
                  }}
                  value={values.body}
                />
                <ErrorMessage
                  name="body"
                  component="p"
                  className="text-sm text-red-600 mt-1"
                />

                {/* Preview Section (visible only on /upload) */}
                {pathname && pathname.includes("/upload") && (
                  <div className="preview-container p-2 bg-gray-900 rounded-lg text-white">
                    <div className="text-xs text-gray-400 ">Preview:</div>
                    <BlogDisplay
                      title={values.title}
                      genre={values.genre}
                      body={values.body}
                    />
                  </div>
                )}
              </>
              <div>
                <label
                  htmlFor="genre"
                  className="flex gap-2 text-sm font-medium text-gray-300"
                >
                  Genre <p className="text-red-600 mt-1">*</p>
                </label>
                <Field
                  name="genre"
                  as="select"
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  <option value="Crypto">crypto</option>
                  <option value="Blockchain">Art</option>
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
                  <option value="Machine Learning">MLearning</option>
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
                  <option value="Sex-lesson">Sex-Lesson</option>
                  <option value="Wealth">Wealth</option>
                  <option value="Business">Business</option>
                  <option value="Ideas">Ideas</option>
                  <option value="Action">Action</option>
                  <option value="Drama">Drama</option>
                  <option value="Romance">Romance</option>
                  <option value="Music">Music</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Marriage">Marriage</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Education">Education</option>
                  <option value="Nature">Nature</option>
                  <option value="Horror">Horror</option>
                  <option value="History">History</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Documentary">Documentary</option>
                  <option value="Teens">Teens</option>
                  <option value="Youth">Youth</option>
                  <option value="Children">Children</option>
                  <option value="Mothers">Mothers</option>
                  <option value="Fathers">Fathers</option>
                  <option value="Sports">Sports</option>
                  <option value="Street Art">Street Art</option>
                  <option value="Strategy">Strategy</option>
                  <option value="Animals">Animals</option>
                  <option value="News">News</option>
                  <option value="Politics">Politics</option>
                  <option value="Prayer">Prayer</option>
                  <option value="Relationship">Relationship</option>
                  <option value="Wisdom">Wisdom</option>
                  <option value="Divorce">Divorce</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Knowledge">Knowledge</option>
                  <option value="Ignorance">Ignorance</option>
                  <option value="Love">Love</option>
                  <option value="Facts">Facts</option>
                  <option value="Family">Family</option>
                  <option value="Culture">Culture</option>
                </Field>
                <ErrorMessage
                  name="genre"
                  component="p"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              {/* Submit Button */}
              <button
                disabled={processing}
                type="submit"
                className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold bg-gradient-to-r from-gray-700 via-gray-800 to-orange-400 shadow-2xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition cursor-pointer"
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
          )}
        </Formik>
      </div>

      {/* Modal for Successful Upload */}
      {modalVisibility && (
        <div className="absolute h-screen w-full bg-black/20 flex items-center justify-center">
          <div className="w-[22rem] h-[30vh] flex flex-col gap-6 items-center justify-center shadow-2xl rounded-lg bg-gray-800 text-white p-6">
            <h1 className="text-xl font-semibold">Blog Upload Successful</h1>
            <ThumbsUp className="text-6xl text-green-500" />
            <button
              onClick={() => setModalVisibility(false)}
              className="border px-5 py-2 text-white bg-amber-600"
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
