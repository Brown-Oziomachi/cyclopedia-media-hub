"use client";

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
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

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

      await addDoc(collection(db2, "contactForm"), webwizformDoc);

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
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-gray-400/5">
          <LoaderCircle
            size={50}
            speed={1.1}
            color="white"
            className="animate-spin"
          />
          <img
            src="logo.jpg"
            alt="My Logo"
            className="h-30 lg:h-30 mt-10 animate-pulse absolute top-30 left-0 right-0 bottom-0 mx-auto"
          />
        </div>
      ) : (
        <main className="bg-gray-400/5 border-y text-white min-h-screen ">
          <section className="container mx-auto px-6 py-6 lg:flex lg:gap-20 ">
            {/* Left Info */}
            <div className="flex-1 space-y-6 max-w-xl mx-auto lg:mx-0 space-x-20 mt-20">
              <h1 className="text-5xl font-extrabold text-white text-center">
                Contact WebWiz
              </h1>
              <div className="container mx-auto lg:space-x-2 shadow-2xl shadow-black ">
                <img
                  src="web22.jpg"
                  alt="Webwiz Logo"
                  className="w-full mx-auto shadow-2xl shadow-black "
                />
                <h2 className="text-xl text-gray-400 uppercase tracking-wider mb-4 text-center border-b border-x border-x-green-600 border-b-green-600">
                  BUILD A SYSTEM WITH <br /> THE SUN WEB
                </h2>
                <p className="text-gray-300 leading-relaxed text-x1">
                  At WebWiz, we are dedicated to bringing your ideas to life.
                  Whether you're looking for expert web solutions, custom
                  designs, or seamless functionality, we're here to help.
                  <br /> <br />
                  Drop us a message and let’s collaborate to build something
                  extraordinary for you!
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  📞 Have a question? Call us at{" "}
                  <a
                    href="tel:+2348142995114"
                    className="border-b-green-600 border-b text-gray-200"
                  >
                    +234 8142 995114
                  </a>
                  <br />
                  ✉️ Prefer email? Reach out at{" "}
                  <a
                    href="mailto:webwizcreation.web@gmail.com"
                    className="border-b border-b-green-600 text-gray-200"
                  >
                    webwizcreation.web@gmail.com
                  </a>
                </p>
                <p className="text-gray-300">
                  or chat us via the circle you see on the screen
                  <ChatDropdown />
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 bg-gray-400/5 border-x border-x-green-600 rounded-lg shadow-lg p-5 mx-auto mt-5 lg:mt-20 ">
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
                    <h2 className=" shadow-2xl shadow-black  text-3xl font-semibold max-md:mb-8 text-white text-center py-2 rounded-md border-t border-x border-x-green-600 border-t-green-600">
                      Contact Form
                    </h2>

                    {["name", "number", "email", "address"].map((field) => (
                      <div key={field} className="mb-6">
                        <Field
                          name={field}
                          type={field === "email" ? "email" : "text"}
                          placeholder={
                            field === "number"
                              ? "+234..."
                              : field.charAt(0).toUpperCase() +
                                field.slice(1) +
                                "..."
                          }
                          className="w-full p-3 rounded border border-gray-700 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <ErrorMessage
                          name={field}
                          component="p"
                          className="text-sm text-red-500 mt-1"
                        />
                      </div>
                    ))}

                    <div className="mb-8">
                      <Field
                        name="message"
                        as="textarea"
                        rows="5"
                        placeholder="Message..."
                        className="w-full p-3 rounded border border-gray-700 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                      />
                      <ErrorMessage
                        name="message"
                        component="p"
                        className="text-sm text-red-500 mt-1"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={processing}
                      className="shadow-2xl shadow-black  w-full py-3 rounded bg-gray-400/10 border-b border-b-green-600 border-x border-x-green-600 text-white font-semibold hover:bg-gray-300 transition mb-0"
                    >
                      {processing ? (
                        <LoaderCircle
                          className="mx-auto animate-spin"
                          size={24}
                        />
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </Form>
                )}
              </Formik>

              {/* Success Modal */}
              {modalVisibility && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-12 text-center max-w-sm mx-4">
                    <h1 className="text-2xl font-bold text-black mb-4">
                      Submission Successful
                    </h1>
                    <ThumbsUp className="text-5xl text-black mb-6 mx-auto" />
                    <button
                      onClick={() => setModalVisibility(false)}
                      className="bg-black text-white py-2 px-8 rounded hover:bg-gray-800 transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Footer */}
          <Footer className="text-center py-8 text-gray-400 text-sm">
            <span>
              © 2025 WebWiz Creation. Designed and developed for excellence.
            </span>
            <br />
            <Link href="/">
              <p className="underline text-gray-300 hover:text-white">
                www.webwizcreation.com
              </p>
            </Link>
          </Footer>
        </main>
      )}
    </>
  );
};

export default ContactPage;
