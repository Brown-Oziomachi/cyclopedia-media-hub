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

  const valSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    skills: Yup.string().required("Skills are required"),
    tel: Yup.string().required("Phone number is required"),
    bio: Yup.string().required("Bio is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    portfolioLink: Yup.string()
      .url("Must be a valid URL")
      .required("Portfolio link is required"),
    githubLink: Yup.string()
      .url("Must be a valid URL")
      .required("GitHub link is required"),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setProcessing(true);

      const webwizformDoc = {
        name: values.name,
        tel: values.tel,
        email: values.email,
        skills: values.skills,
        portfolioLink: values.portfolioLink,
        githubLink: values.githubLink,
        bio: values.bio,
        timestamp: new Date().toLocaleDateString(),
      };

      await addDoc(collection(db2, "contactForm"), webwizformDoc);
      resetForm();
      setModalVisibility(true);
    } catch (error) {
      console.error("Error sending form", error);
      alert("Please check your network connection and try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-black">
          <div className="text-center">
            <h1 className="text-xl font-extrabold text-white mb-6">
              Loading Tech form...
            </h1>
            <LoaderCircle
              size={50}
              color="white"
              className="animate-spin mx-auto"
            />
            <img
              src="logo.png"
              alt="Logo"
              className="h-24 mt-10 mx-auto animate-pulse"
            />
          </div>
        </div>
      ) : (
        <section className="min-h-screen flex items-center justify-center bg-black px-5 py-10">
          <div className="max-w-lg w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold mb-8 text-white text-center">
              Developer Registration
            </h2>
            <Formik
              initialValues={{
                name: "",
                tel: "",
                email: "",
                skills: "",
                portfolioLink: "",
                githubLink: "",
                bio: "",
              }}
              validationSchema={valSchema}
              onSubmit={handleSubmit}
            >
              <Form className="space-y-6">
                {[
                  {
                    name: "name",
                    type: "text",
                    placeholder: "Full Name",
                  },
                  {
                    name: "tel",
                    type: "tel",
                    placeholder: "Phone Number",
                  },
                  {
                    name: "email",
                    type: "email",
                    placeholder: "Email",
                  },
                  {
                    name: "skills",
                    type: "text",
                    placeholder: "Skills (e.g., JavaScript, React)",
                  },
                  {
                    name: "bio",
                    type: "text",
                    placeholder: "Short Bio",
                  },
                  {
                    name: "portfolioLink",
                    type: "url",
                    placeholder: "Portfolio Link",
                  },
                  {
                    name: "githubLink",
                    type: "url",
                    placeholder: "GitHub Link",
                  },
                ].map(({ name, type, placeholder }) => (
                  <div key={name}>
                    <Field
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                    />
                    <ErrorMessage
                      name={name}
                      component="p"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>
                ))}

                <button
                  disabled={processing}
                  type="submit"
                  className="w-full py-3 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <LoaderCircle className="animate-spin mx-auto" />
                  ) : (
                    "Register"
                  )}
                </button>
              </Form>
            </Formik>

            {modalVisibility && (
              <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm mx-4 text-center">
                  <h1 className="text-xl font-bold text-gray-900 mb-4">
                    Registration Successful
                  </h1>
                  <ThumbsUp className="mx-auto mb-6 text-green-600" size={48} />
                  <button
                    onClick={() => setModalVisibility(false)}
                    className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-900 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default page;
