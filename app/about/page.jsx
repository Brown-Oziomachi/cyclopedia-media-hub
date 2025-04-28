"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { LoaderCircle } from "lucide-react";

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-gray-800">
          <h1 className="text-4xl font-bold text-orange-500"></h1>
          <LoaderCircle  size="50" speed="1.10" color="orange" className="animate-spin"/>
        </div>
      ) : (
        <main className="bg-gray-100 min-h-screen ">
          <nav className="bg-gray-900 text-white fixed top-0 w-full shadow-md lg:mt-15 max-md:mt-15 ">
            <div className="container mx-auto flex justify-between items-center p-4 ">
              <h1 className="font-bold text-xl text-orange-500">Webwiz Creation</h1>
              <div> 
                <Link href="/">
                  <p className="text-white hover:text-orange-500 mx-2">Home</p>
                </Link>
                <Link href="/developers">
                  <p className="text-white hover:text-orange-500 mx-2">Developers</p>
                </Link>
                <Link href="/about">
                  <p className="text-white hover:text-orange-500 mx-2">About Us</p>
                </Link>
                <Link href="/contact">
                  <p className="text-white hover:text-orange-500 mx-2">Contact</p>
                </Link>
              </div>
            </div>
          </nav>

                <header className="flex flex-col justify-center items-center min-h-screen text-center bg-gray-900 text-white max-md:py-50">
                <div className="space-">
                  <h1 className="text-5xl font-extrabold text-orange-500 mb-10">
                  About Webwiz Creation
                  </h1>
                  <p className="text-lg max-w-3xl mx-auto leading-relaxed">
                  Discover who we are and how we bring your vision to life. At Webwiz Creation, we specialize in transforming ideas into exceptional digital experiences. With a team of expert developers, designers, and strategists, we focus on delivering tailored solutions that meet the unique needs of our clients. From front-end aesthetics to back-end efficiency, we bridge creativity with technical expertise to craft impactful and user-friendly designs.
                  </p>
                  <p className="text-lg max-w-3xl mx-auto leading-relaxed">
                  Our mission is to empower businesses, startups, and individuals by turning ambitious visions into reality. Through innovative solutions, cutting-edge technologies, and relentless dedication, we aim to build digital products that not only meet but exceed expectations. With Webwiz Creation, you get more than just a service—you gain a partner committed to your success every step of the way.
                  </p>
                </div>
                </header>

          <section className="py-16 bg-gray-100">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center text-orange-500 mb-10">
                What Sets Us Apart
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-bold text-orange-500 mb-4">
                    Responsive Web Design
                  </h3>
                  <p className="text-gray-600">
                    Creating visually appealing, mobile-friendly websites that adapt to any device seamlessly.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-bold text-orange-500 mb-4">
                    SEO Optimization
                  </h3>
                  <p className="text-gray-600">
                    Ensuring your brand gains visibility through advanced search engine optimization strategies.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-bold text-orange-500 mb-4">
                    User-Centric Development
                  </h3>
                  <p className="text-gray-600">
                    Building intuitive, user-friendly interfaces that keep your audience engaged.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Milestone Timeline */}
          <section className="py-16 bg-gray-900 text-white">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center text-orange-500 mb-10">
                Our Journey
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-orange-500 mb-4">2024</h3>
                  <p>
                    Webwiz Creation was founded with a mission to revolutionize web
                    design and development, delivering value-driven solutions to our clients.
                  </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-orange-500 mb-4">2025</h3>
                  <p>
                    Expanded our services globally, working with clients from over 10 countries
                    across diverse industries.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-gray-100">
            <div className="container mx-auto text-center">
              <h2 className="text-4xl font-bold text-orange-500 mb-10">
                What Our Clients Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <p className="text-gray-600 italic">
                    "Webwiz Creation turned our ideas into an incredible website! Their
                    attention to detail and creativity exceeded our expectations."
                  </p>
                  <h3 className="text-lg font-bold text-orange-500 mt-4">- Sarah A.</h3>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <p className="text-gray-600 italic">
                    "The team was professional, timely, and a pleasure to work with. Highly recommended!"
                  </p>
                  <h3 className="text-lg font-bold text-orange-500 mt-4">- Mike T.</h3>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
      <Footer />
    </>
  );
};

export default About;
