"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoaderCircle } from "lucide-react";

function DevelopersPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await auth();
        if (!session) {
          redirect("/developers");
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const developersData = [
    {
      name: "Brown Emmanuel",
      specialty: "Front-End Developer",
      image: "/brown-profile.jpg",
      bio: "Crafting intuitive UI/UX designs.",
      links: [
        { text: "Portfolio", href: "/myprofile" },
        { text: "GitHub", href: "https://github.com/brownemmanuel" },
        { text: "Hire Me", href: "mailto:browncemmanuel@gmail.com" },
      ],
    },
    {
      name: "Jane Doe",
      specialty: "Back-End Developer",
      image: "/jane-profile.jpg",
      bio: "Specialist in server-side logic.",
      links: [
        { text: "Portfolio", href: "/jane-portfolio" },
        { text: "GitHub", href: "https://github.com/janedoe" },
        { text: "Hire Me", href: "mailto:jane.doe@example.com" },
      ],
    },
    {
      name: "John Smith",
      specialty: "Full-Stack Developer",
      image: "/john-profile.jpg",
      bio: "End-to-end web solutions.",
      links: [
        { text: "Portfolio", href: "/john-portfolio" },
        { text: "GitHub", href: "https://github.com/johnsmith" },
        { text: "Hire Me", href: "mailto:john.smith@example.com" },
      ],
    },
  ];

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-gray-800">
          <h1 className="text-4xl font-bold text-red-500"></h1>
          <LoaderCircle  size="50" speed="1.10" color="orange" className="animate-spin"/>
        </div>
      ) : (
        <main className="bg-gray-100 min-h-screen">          

          {/* Hero Section */}
          <header className="flex flex-col justify-center items-center h-screen text-center bg-gray-900 text-white">
            <div className="space-y-6">
              <h1 className="text-5xl font-extrabold text-red-500">
                Find Your Perfect Developer
              </h1>
              <p className="text-lg">
                Connect with skilled developers to bring your project to life.
              </p>
              <Link href="/contact">
                <button className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-md shadow-md">
                  Get Started
                </button>
              </Link>
            </div>
          </header>

          {/* Why Hire Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center text-red-500 mb-8">
                Why Hire Our Developers?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Benefit 1 */}
                <div className="p-4 rounded-lg shadow-md hover:shadow-xl transition-all">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Expertise & Skill
                  </h3>
                  <p className="text-gray-600">
                    Our developers possess a wide range of skills and expertise
                    to tackle any project.
                  </p>
                </div>
                {/* Benefit 2 */}
                <div className="p-4 rounded-lg shadow-md hover:shadow-xl transition-all">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Dedicated Support
                  </h3>
                  <p className="text-gray-600">
                    We provide dedicated support throughout the development
                    process to ensure your satisfaction.
                  </p>
                </div>
                {/* Benefit 3 */}
                <div className="p-4 rounded-lg shadow-md hover:shadow-xl transition-all">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Timely Delivery
                  </h3>
                  <p className="text-gray-600">
                    We are committed to delivering high-quality solutions on
                    time and within budget.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Developers Section */}
          <section className="py-16 bg-gray-100">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center text-red-500 mb-10">
                Meet Our Developers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {developersData.map((developer, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    <img
                      src={developer.image}
                      alt={developer.name}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-2xl font-bold text-red-500 mb-2">
                      {developer.name}
                    </h3>
                    <p className="text-gray-600 mb-2">{developer.specialty}</p>
                    <p className="text-sm text-gray-500">{developer.bio}</p>
                    <div className="flex justify-center gap-4 mt-4">
                      {developer.links.map((link, linkIndex) => (
                        <Link key={linkIndex} href={link.href}>
                          <p className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                            {link.text}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="py-20 bg-gray-900 text-white text-center">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-lg mb-8">
                Contact us today to discuss your project requirements and find
                the perfect developer for your needs.
              </p>
              <Link href="/contact">
                <button className="bg-red-500 hover:bg-red-600 px-8 py-4 rounded-md text-xl shadow-md">
                  Contact Us
                </button>
              </Link>
            </div>
          </section>
        </main>
      )}
    </>
  );
}

export default DevelopersPage;
