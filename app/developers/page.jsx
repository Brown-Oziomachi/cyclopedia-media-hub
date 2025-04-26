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
          {/* Navigation Bar */}
          <nav className="bg-gray-900 text-white fixed top-20 w-full shadow-md ">
            <div className="container mx-auto flex justify-between items-center p-4 ">
              <h1 className="font-bold text-xl text-red-500">Webwiz Creation</h1>
              <div>
                <Link href="/home">
                  <p className="text-white hover:text-red-500 mx-2">Home</p>
                </Link>
                <Link href="/developers">
                  <p className="text-white hover:text-red-500 mx-2">Developers</p>
                </Link>
                <Link href="/about">
                  <p className="text-white hover:text-red-500 mx-2">About Us</p>
                </Link>
                <Link href="/contact">
                  <p className="text-white hover:text-red-500 mx-2">Contact</p>
                </Link>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <header className="flex flex-col justify-center items-center h-screen text-center bg-gray-900 text-white">
            <div className="space-y-6">
              <h1 className="text-5xl font-extrabold text-red-500">
                Discover Top Developers
              </h1>
              <p className="text-lg">
                Exceptional talent for your next big project.
              </p>
              <Link href="/contact">
                <button className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-md shadow-md">
                  Contact Us
                </button>
              </Link>
            </div>
          </header>

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
        </main>
      )}
    </>
  );
}

export default DevelopersPage;
