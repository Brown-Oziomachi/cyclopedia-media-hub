"use client";

import Link from "next/link";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { BiLoaderCircle } from "react-icons/bi";
import { FaRegCheckCircle } from "react-icons/fa";
import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";
import { db2 } from "@/lib/firebaseConfig";

// Validation Schema
const valSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  number: Yup.string().required("Phone Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  message: Yup.string().required("Message is required"),
});

const ContactPage = () => {
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setProcessing(true);

      const webwizformDoc = {
        name: values.name,
        tel: values.number,
        email: values.email,
        address: values.address,
        message: values.message,
        timestamp: new Date().toLocaleDateString(),
      };

      const webwizformRef = await addDoc(collection(db2, "contactForm"), webwizformDoc);
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
                    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800 ">
                     
                      <h1 className="text-4xl lg:text-6xl font-extrabold tracking-wide leading-tight text-white relative"></h1>
                    <Ring2  size="50" speed="1.10" color="blue" />
                      <img
                        src="logo.png"
                        alt="My Logo"
                        className="h-30 lg:h-30 mt-10 animate-pulse absolute top-30 left-0 right-0 bottom-0 mx-auto"
                      />
                    </div>
                  ) : (
        <main className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen ">
          {/* Desktop Layout */}
          <section className="container mx-auto px-5 lg:px-20 py-20 lg:flex lg:space-x-10">
            {/* Introduction / Information */}
            <div className="flex-1 space-y-6">
              <img src="Ai.png" alt="Webwiz Logo" className="w-50 lg:w-50 h-auto mb-6 mx-auto lg:mx-0" />
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white">Contact WebWiz</h1>
              <div className="text-lg lg:text-xl text-gray-300 leading-relaxed mt-4">
                At WebWiz, we are dedicated to bringing your ideas to life. Whether you're looking
                for expert web solutions, custom designs, or seamless functionality, we're here to help.
                Drop us a message and let’s collaborate to build something extraordinary!
              </div>
              <div className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                📞 Have a question? Call us at <a href="tel:+2348142995114" className="text-cyan-400 hover:underline">+234 8142 995114</a><br />
                ✉️ Prefer email? Reach out at <a href="mailto:brownozioma@outlook.com" className="text-cyan-400 hover:underline">brownozioma@outlook.com</a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="flex-1 bg-gray-800 rounded-lg shadow-lg py-10 px-8 z-50 overflow-hidden">
              <Formik
                initialValues={{
                  name: "",
                  number: "",
                  email: "",
                  address: "",
                  message: "",
                }}
                validationSchema={valSchema}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form>
                    <h2 className="text-2xl font-bold text-center mb-6 text-cyan-400 relative">
                      Contact Form
                    </h2>
                    {/* Name Input */}
                    <div className="mb-4">
                      <Field
                        name="name"
                        type="text"
                        placeholder="Name..."
                        className="w-full p-3 rounded-lg border bg-gray-700 text-white focus:ring-2 focus:ring-cyan-500"
                      />
                      <ErrorMessage
                        name="name"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>

                    {/* Phone Number Input */}
                    <div className="mb-4">
                      <Field
                        name="number"
                        type="tel"
                        placeholder="+234..."
                        className="w-full p-3 rounded-lg border bg-gray-700 text-white focus:ring-2 focus:ring-cyan-500"
                      />
                      <ErrorMessage
                        name="number"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email..."
                        className="w-full p-3 rounded-lg border bg-gray-700 text-white focus:ring-2 focus:ring-cyan-500"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>

                    {/* Address Input */}
                    <div className="mb-4">
                      <Field
                        name="address"
                        type="text"
                        placeholder="Address..."
                        className="w-full p-3 rounded-lg border bg-gray-700 text-white focus:ring-2 focus:ring-cyan-500"
                      />
                      <ErrorMessage
                        name="address"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>

                    {/* Message Input */}
                    <div className="mb-6">
                      <Field
                        name="message"
                        as="textarea"
                        rows="5"
                        placeholder="Message..."
                        className="w-full p-3 rounded-lg border bg-gray-700 text-white focus:ring-2 focus:ring-cyan-500"
                      />
                      <ErrorMessage
                        name="message"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      disabled={processing}
                      type="submit"
                      className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition"
                    >
                      {processing ? (
                        <span className="flex items-center justify-center">
                          <BiLoaderCircle className="animate-spin text-2xl" />
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
           
              {/* Success Modal */}
              {modalVisibility && (
                <div className="absolute inset-30 bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white rounded-lg shadow-lg p-20 text-center">
                    <h1 className="text-xl text-black font-bold ">
                      Submission Successful
                    </h1>
                    <FaRegCheckCircle className="text-4xl text-green-500 mb-4 mx-auto" />
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
          </section>
        
          {/* Footer */}
          <div div className="text-center py-10 text-gray-400">
            <span>
              © 2025 WebWiz Creation. Designed and developed for excellence.
            </span>
            <Link href="/">
              <span className="text-cyan-400 hover:underline">www.webwizcreation.com</span>
            </Link>
            </div>
        </main>
     )
    }
    </>
  )
}

export default ContactPage;
