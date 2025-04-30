"use client";

import Link from 'next/link';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/formDb';  // <--- UPDATED IMPORT
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { Loader,ThumbsUp } from 'lucide-react';

// Validation schema
const valSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  number: Yup.string().required('Number is required'),
  email: Yup.string().required('Email is required'),
  address: Yup.string().required('Address is required'),
  message: Yup.string().required('Message is required'),
});

const ContactPage = ({ session }) => {
    const [loading, setLoading] = useState(true); 
   
     useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000); // adjust the timeout as needed
  
      return () => clearTimeout(timer);
    }, []);

  const [processing, setProcessing] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  
  console.log(session);
  
  const handleSubmit = async (values, { resetForm }) => {
    try {
      setProcessing(true);
      
      // create an object to be sent to the db
      const webwizformDoc = {
        name: values.name,
        number: values.number,
        email: values.email,
        address: values.address,
        message: values.message,
        timestamp: new Date().toLocaleDateString(),
      };
      
      const webwizformRef = await addDoc(collection(db, "contactForm"), webwizformDoc);
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
            <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-gray-900">
             
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-wide leading-tight text-white relative"></h1>
              <Loader   size="50" speed="0.5" color="blue" />
              <img
                src="logo.png"
                alt="My Logo"
                className="h-30 lg:h-30 mt-10 animate-pulse absolute top-30 left-0 right-0 bottom-0 mx-auto"
              />
            </div>
          ) : (
    <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-gray-900 min-h-screen flex flex-col items-center justify-center text-gray-100">
      {/* Header */}
      <div className="text-center py-5">
        <img src="logo.png" alt="logo" className='w-70 h-60 mx-auto'/>
        <h1 className="text-6xl font-serif text-white max-md:text-4xl">Get In Touch</h1>
        <p className="text-2xl font-serif text-gray-400 max-md:text-xl mt-4"> We'd love to hear from you! </p>
      </div>

      {/* Contact Form */}
      <Formik
        initialValues={{ name: '', number: '', email: '', address: '', message: '' }}
        validationSchema={valSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="lg:w-200  max-lg:w-100 bg-cyan-900 p-10 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-center">Contact Form</h2>

              <div className="mb-4">
                <Field
                  name="name"
                  type="text"
                  placeholder="Name..."
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="name" component="p" className="text-sm text-red-600" />
              </div>

              <div className="mb-4">
                <Field
                  name="number"
                  type="number"
                  placeholder="+234..."
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="number" component="p" className="text-sm text-red-600" />
              </div>

              <div className="mb-4">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email..."
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="email" component="p" className="text-sm text-red-600" />
              </div>

              <div className="mb-4">
                <Field
                  name="address"
                  type="text"
                  placeholder="Address..."
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="address" component="p" className="text-sm text-red-600" />
              </div>

              <div className="mb-4">
                <Field
                  name="message"
                  as="textarea"
                  rows="5"
                  placeholder="Message..."
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="message" component="p" className="text-sm text-red-600" />
              </div>

              <button 
               disabled={processing}
                type="submit"
                className="w-full bg-blue-900 text-white p-2 rounded-md hover:bg-blue-600 transition py-4"   
              >
                {processing ? (
                  <span className="w-full text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition duration-300 flex items-center justify-center">
                    <LoaderCircle  className="animate-spin text-2xl  " />
                  </span>
                ) : (
                  "Send Message"
                )}
        
              </button>
            </div>
          </Form>
        )}
      </Formik>
  
      <div
        className={`absolute h-full w-full bg-white/20 items-center justify-center  ${
          modalVisibility ? "flex" : "hidden"
        }`}
      >
        <div className="w-[20rem] h-[30vh] flex flex-col gap-5 items-center justify-center shadow-lg rounded-lg bg-white border-t-10 border-gray-900 text-center">
          <h1 className="text-black text-2xl">Submission Successful</h1>
          <ThumbsUp className="text-6xl text-green-500" />
          <button onClick={() => setModalVisibility(false)} className='text-gray-900 border rounded-lg  px-5'>Close</button>
        </div>
      </div>

{/* Social Links */}
<div className="lg:text-3xl font-[somo] py-8 text-center">
  <h2 className="text-2xl text-white">Follow Me</h2>
  <span className='flex gap-5 max-md:grid'>
  {['Facebook', 'Instagram', 'Twitter', 'Youtube', 'Uhive'].map((platform, idx) => (
    <Link key={idx} href="/#">
      <p
        className={`text-xl hover:underline text-${
          platform.toLowerCase() === 'youtube' ? 'red-600' : platform.toLowerCase()
        }`}
      >
        {platform}
      </p>
    </Link>
  ))}
  </span>
</div>

{/* Contact Info */}
<div className="lg:text-3xl font-[somo] text-center max-lg:m-5">
  <h2 className="text-xl text-white">Contact Me</h2>
  <p className="text-xl hover:underline text-gray-100">brownozioma@outlook.com</p>
  <p className="text-xl hover:underline text-gray-100">browncemmanuel@gmail.com</p>
  <p className="text-xl text-gray-100">+234 8142 9951 14</p>
</div>


      {/* Footer */}
      <div className="lg:flex items-center justify-around max-md:grid lg:gap-30 py-10 w-full lg:px-50 text-gray-400">
        <div className="text-center max-lg:m-5">
          <p>
            This website was designed and developed by WebWiz Creation. For professional design solutions, visit
            <Link href="/#">
              <span className="text-blue-800 hover:underline"> www.webwizcreation.com</span>
            </Link>
          </p>
        </div>
        
</div>
    </div>
  )}
    </>
  );
}   

  export default ContactPage
