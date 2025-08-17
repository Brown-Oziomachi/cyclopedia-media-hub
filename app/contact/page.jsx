"use client";

import { Suspense } from "react";
import Link from "next/link";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { db2 } from "@/lib/firebaseConfig";
import { LoaderCircle, ThumbsUp } from "lucide-react";
import ChatDropdown from "@/components/Chat";
import Footer from "@/components/Footer";

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
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setProcessing(true);

      const docData = {
        name: values.name,
        tel: values.number,
        email: values.email,
        address: values.address,
        message: values.message,
        timestamp: new Date().toLocaleDateString(),
      };

      await addDoc(collection(db2, "cyclopedia Contacts"), docData);
      resetForm();
      setModalVisibility(true);
    } catch (error) {
      console.error("Firebase Error:", error.code, error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    
        <main className="bg-black text-white min-h-screen border-t border-b border-green-700">
          <section className="container mx-auto px-6 py-10 lg:flex gap-16">

            {/* Left Panel */}
            <div className="flex-1 max-w-xl mx-auto mt-20 space-y-6">
              <h1 className="text-4xl font-extrabold text-center">
                Connect with Cyclopedia
              </h1>
              <img
                src="/hid.png"
                alt="Cyclopedia System"
                className="w-full shadow-lg "
              />
              <h2 className="text-center text-lg bg-gradient-to-r from-purple-500 to-cyan-400 uppercase py-2">
                Build a System of Knowledge & Clarity
              </h2>
              <p className="text-gray-300">
                The Cyclopedia project is a global knowledge movement built to
                challenge the conventional. Whether you're a researcher, creator,
                or thinker — we want to collaborate.
              </p>
              <p className="text-gray-400">
                📞 Call us at{" "}
                <a href="tel:+2348142995114" className="underline text-green-500">
                  +234 8142 995114
                </a>
                <br />
                ✉️ Email:{" "}
                <a href="mailto:cyclopedia.web@gmail.com" className="underline text-green-500">
                  cyclopedia.web@gmail.com
                </a>
              </p>
              <p className="text-gray-300">
                💬 Or message us using the chat bubble.
                <ChatDropdown />
              </p>
            </div>

            {/* Contact Form */}
            <div className="flex-1 bg-gray-950 border border-purple-700 rounded-lg p-6 mt-20 shadow-lg">
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
                    <h2 className="text-2xl text-center font-bold mb-4 border-b border-purple-600 pb-2">
                      Message Us
                    </h2>

                    {["name", "number", "email", "address"].map((field) => (
                      <div key={field} className="mb-5">
                        <Field
                          name={field}
                          type={field === "email" ? "email" : "text"}
                          placeholder={
                            field === "number"
                              ? "+234..."
                              : `${field.charAt(0).toUpperCase() + field.slice(1)}...`
                          }
                          className="w-full p-3 rounded bg-black text-white border border-gray-700 focus:ring-2 focus:ring-green-600"
                        />
                        <ErrorMessage name={field} component="p" className="text-red-500 text-sm mt-1" />
                      </div>
                    ))}

                    <div className="mb-6">
                      <Field
                        name="message"
                        as="textarea"
                        rows={5}
                        placeholder="Share your thoughts..."
                        className="w-full p-3 rounded bg-black text-white border border-gray-700 focus:ring-2 focus:ring-green-600"
                      />
                      <ErrorMessage name="message" component="p" className="text-red-500 text-sm mt-1" />
                    </div>

                    <button
                      type="submit"
                      disabled={processing}
                      className="w-full py-3 bg-gradient-to-r from-purple-500 to-cyan-400 hover:bg-green-600 rounded text-white font-bold transition"
                    >
                      {processing ? (
                        <LoaderCircle className="animate-spin mx-auto" size={20} />
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </Form>
                )}
              </Formik>

              {/* Confirmation Modal */}
              {modalVisibility && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-10 text-center">
                    <h1 className="text-xl font-bold text-black">Message Sent</h1>
                    <ThumbsUp className="text-4xl text-green-700 mx-auto mt-4" />
                    <button
                      onClick={() => setModalVisibility(false)}
                      className="mt-6 bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Footer */}
            <h1 className="text-center mb-0">© 2025 Cyclopedia. Truth. Light. Clarity.</h1>
            <br />
            <Link href="/">
              <p className="underline text-gray-300 hover:text-white text-center mt-0">
                www.cyclopedia.movement
              </p>
            </Link>
        </main>
   
  );
};

export default ContactPage;

