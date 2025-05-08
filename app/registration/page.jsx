"use client";
import Link from "next/link";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { db2 } from "@/lib/firebaseConfig";
import { LoaderCircle, ThumbsUp } from "lucide-react";

const page = () => {
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);

  // Validation Schema
  const valSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    skills: Yup.string().required("Skills is required"),
    tel: Yup.string().required("Tel is required"),
    bio: Yup.string().required("Bio is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    url: Yup.string().required("Short bio is required"),
    url: Yup.string().required("Portfolio Link is required"),
    url: Yup.string().required("Github Link is required"),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setProcessing(true);

      const webwizformDoc = {
        name: values.name,
        tel: values.number,
        email: values.email,
        skills: values.skills,
        url: values.url,
        bio: values.bio,
        timestamp: new Date().toLocaleDateString(),
      };

      const webwizformRef = await addDoc(collection(db2, "contactForm"),webwizformDoc);
      console.log(webwizformRef.id);

      resetForm();
      setModalVisibility(true);
    } catch (error) {
      console.error("Error sending form", error);
      alert("Please check your network. Try again!");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen z-50 bg-gradient-to-r from-gray-900 via-black to-orange-400">
          <h1 className="text-xl lg:text-xl font-extrabold z-50 tracking-wide leading-tight text-white relative">
            Loading Tech form
          </h1>{" "}
          <br />
          <LoaderCircle
            size="50"
            speed="1.10"
            color="orange"
            className="animate-spin"
          />
          <img
            src="logo.png"
            alt="My Logo"
            className="h-30 lg:h-30 mt-10 animate-pulse absolute top-30 left-0 right-0 bottom-0 mx-auto"
          />
        </div>
      ) : (
        <section>
          <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-orange-400">
            <div className="bg-gradient-to-r from-gray-900 via-black to-orange-400 p-6 rounded-lg shadow-md w-full max-w-md lg:max-w-lg mt-30">
              <h2 className="text-2xl font-bold mb-4 text-center text-white">
                Developer Registration
              </h2>
              <Formik
                initialValues={{
                  name: "",
                  tel: "",
                  email: "",
                  skills: "",
                  url: "",
                  bio: "",
                }}
                validationSchema={valSchema}
                onSubmit={handleSubmit}
              >
                <Form  className="space-y-10">
                  <div>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className="w-full p-3 text-white border border-amber-50 rounded focus:ring focus:ring-blue-200"
                      required
                      minLength="3"
                      maxLength="50"
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full p-3 text-white border border-amber-50 rounded focus:ring focus:ring-blue-200"
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div>
                    <Field
                      type="text"
                      name="skills"
                      placeholder="Skills (e.g., JavaScript, React)"
                      className="w-full p-3 text-white border border-amber-50 rounded focus:ring focus:ring-blue-200"
                      required
                      minLength="2"
                      maxLength="100"
                    />
                    <ErrorMessage
                      name="skills"
                      component="p"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div>
                    <Field
                      name="bio"
                      placeholder="Short Bio"
                      className="w-full p-3 text-white border border-amber-50 rounded focus:ring focus:ring-blue-200"
                      required
                      minLength="10"
                      maxLength="200"
                    />
                    <ErrorMessage
                      name="bio"
                      component="p"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div>
                    <Field
                      type="url"
                      name="portfolioLink"
                      placeholder="Portfolio Link"
                      className="w-full p-3 text-white border border-amber-50 rounded focus:ring focus:ring-blue-200"
                    />
                    <ErrorMessage
                      name="url"
                      component="p"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div>
                    <Field
                      type="url"
                      name="githubLink"
                      placeholder="GitHub Link"
                      className="w-full p-3 text-white border border-amber-50 rounded focus:ring focus:ring-blue-200"
                    />
                    <ErrorMessage
                      name="url"
                      component="p"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <button
                    disabled={processing}
                    type="submit"
                    className="w-full bg-gradient-to-r from-gray-900 via-black to-orange-400 text-white py-3 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  >
                    {processing ? (
                      <span className="flex items-center justify-center ">
                        <LoaderCircle className="animate-spin text-2xl" />
                      </span>
                    ) : (
                      "Register"
                    )}
                  </button>
                </Form>
              </Formik>

              {modalVisibility && (
                <div className="absolute inset-30 bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white rounded-lg shadow-lg p-20 text-center">
                    <h1 className="text-xl text-black font-bold ">
                      Registration Successful
                    </h1>
                    <ThumbsUp className="text-4xl text-green-500 mb-4 mx-auto" />
                    <button
                      onClick={() => setModalVisibility(false)}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-10 rounded-lg transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default page;
