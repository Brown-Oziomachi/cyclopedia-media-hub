"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function CyclopediaNewsletterForm() {
  const searchParams = useSearchParams();
  const [paramValue, setParamValue] = useState("No param");

  useEffect(() => {
    const val = searchParams.get("someKey");
    if (val) {
      setParamValue(val);
    } else {
      setParamValue("No param");
    }
  }, [searchParams]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      alert(`Thanks for subscribing, ${values.firstName}!`);
    },
  });

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center bg-gray-100 rounded-xl shadow-md p-10 mt-10">
        {/* LEFT - Text */}
        <div>
          <div className="border border-black inline-block px-3 py-1 mb-4">
            <span className="font-bold text-lg">CYCLOPEDIA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-snug">
            Get the stories the mainstream media isn’t reporting,
            <br />
            direct to your inbox
          </h2>
          <p className="text-gray-700 mt-4">
            Sign up to the <strong>Cyclopedia newsletter</strong> — a free email
            with our top stories and video insights from the week. Plus,{" "}
            <strong>The Brief</strong>, our exclusive article every Thursday.
          </p>
        </div>

        {/* RIGHT - Form */}
        <div className="bg-white p-6 rounded-lg shadow-inner">
          {/* Display paramValue here */}
          <p className="mb-4 text-sm text-gray-600">
            Param from URL: {paramValue}
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold">
                First name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                className="w-full p-2 mt-1 border rounded"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-red-500 text-sm">
                  {formik.errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold">
                Last name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                className="w-full p-2 mt-1 border rounded"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full p-2 mt-1 border rounded"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-cyan-400  text-white py-2 mt-4 rounded text-lg font-semibold"
            >
              Sign me up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
