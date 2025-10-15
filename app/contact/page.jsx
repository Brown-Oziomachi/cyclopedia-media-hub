"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { db2 } from "@/lib/firebaseConfig";
import { LoaderCircle, ThumbsUp } from "lucide-react";
import ChatDropdown from "@/components/Chat";

// ✅ Validation Schema
const valSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  number: Yup.string().required("Phone Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  message: Yup.string().required("Message is required"),
});

export default function ContactPage() {
  const [processing, setProcessing] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);

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
    <main className="min-h-screen  border-t border-b border-purple-200">
      <section className="container mx-auto px-6 py-16 lg:flex gap-16">
        {/* ✅ Left Panel */}
        <div className="flex-1 max-w-xl mx-auto mt-10 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold ">
            Welcome to <span className="text-purple-600">The Cyclopedia</span>
          </h1>

          <img
            src="/hid.png"
            alt="Cyclopedia Logo"
            className="w-full rounded-xl shadow-lg bg-black"
          />

          <h2 className="text-lg font-semibold  px-4 py-2 rounded-md inline-block">
            Explore Knowledge, Discover Truths
          </h2>

          <p className=" leading-relaxed">
            The Cyclopedia is your go-to platform for curated insights and
            information. Whether you’re a researcher, creator, or curious
            thinker — join us in building a global system of{" "}
            <span className="font-semibold">truth and clarity.</span>
          </p>

          <div className="">
            <p>
              📞 Call us at{" "}
              <a
                href="tel:+2348142995114"
                className="underline  hover:text-purple-800"
              >
                +234 8142 995114
              </a>
            </p>
            <p>
              ✉️ Email:{" "}
              <a
                href="mailto:cyclopedinews@gmail.com"
                className="underline  hover:text-purple-800"
              >
                cyclopedinews@gmail.com
              </a>
            </p>
            <p className="mt-3 flex items-center justify-center lg:justify-start gap-2 ">
              💬 Chat with us
              <ChatDropdown />
            </p>
          </div>
        </div>

        {/* ✅ Contact Form */}
        <div className="flex-1 border rounded-2xl p-8 mt-16 shadow-xl ">
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
                <h2 className="text-2xl text-center font-bold mb-6  border-b border pb-3">
                  Send Us a Message
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
                      className="w-full p-3 rounded-lg border border focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    />
                    <ErrorMessage
                      name={field}
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                ))}

                <div className="mb-6">
                  <Field
                    name="message"
                    as="textarea"
                    rows={5}
                    placeholder="Share your thoughts..."
                    className="w-full p-3 rounded-lg border border focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                  />
                  <ErrorMessage
                    name="message"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-3   font-bold rounded-lg shadow-md hover:opacity-90 transition"
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

          {/* ✅ Confirmation Modal */}
          {modalVisibility && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-10 text-center shadow-lg">
                <h1 className="text-xl font-bold text-gray-800">
                  Message Sent Successfully!
                </h1>
                <ThumbsUp className="text-4xl text-green-600 mx-auto mt-4" />
                <button
                  onClick={() => setModalVisibility(false)}
                  className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="mt-16 text-center text-gray-600">
        <h1>© 2025 The Cyclopedia — Truth. Light. Clarity.</h1>
        <Link
          href="/"
          className="underline hover:text-purple-600 transition block mt-2"
        >
          www.cyclopedia.com
        </Link>
      </footer>
    </main>
  );
}
