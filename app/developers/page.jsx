"use client";
import Link from "next/link";

 function DevelopersPage() {
  const developersData = [
    {
      name: "Brown Code",
      specialty: "Full-Stack Developer/Python Developer",
      image: "/coderer.png",
      links: [
        { text: "Portfolio", href: "/myprofile" },
        { text: "GitHub", href: "https://github.com/Brown-Oziomachi" },
        { text: "Hire Me", href: "mailto:browncemmanuel@gmail.com" },
      ],
    },
    {
      name: "Victor_D3v",
      specialty: "Full-Stack Developer",
      image: "/vik.png",
      links: [
        { text: "Portfolio", href: "/myprofile" },
        { text: "GitHub", href: "https://github.com/Victor-dev0p" },
        { text: "Hire Me", href: "mailto:victorerukpe496@gmail.com" },
      ],
    },
    {
      name: "Dev_Hiba",
      specialty: "Full-stack Developer",
      image: "/hiba.png",
      links: [
        { text: "Portfolio", href: "/myprofile" },
        { text: "GitHub", href: "https://github.com/HIBATULLA" },
        { text: "Hire Me", href: "mailto:devhibatullahismail45@gmail.com" },
      ],
    },
  ];

  return (
    <main className="bg-gray-400/5 min-h-screen text-white z-0">
      {/* Hero Section */}

        <button
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
          className="z-0 absolute top-1/2 left-2 -translate-y-1/2 bg-green-600 bg-opacity-80 hover:bg-opacity-100 text-white rounded-full p-2 shadow-lg z- transition"
        >
          &#8592;
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-green-600 bg-opacity-80 hover:bg-opacity-100 text-white rounded-full p-2 shadow-lg z-0 transition"
        >
          &#8594;
        </button>
        <div 
        className="absolute inset-0 items-center justify-center opacity-30 z-0">
          <img src="web1.jpg" alt="image" className="py-15 w-full mx-auto z-0"/>
        </div>
      <header className="flex flex-col justify-center items-center h-screen text-center px-5 relative z-0">
        <div className="space-y-6 max-w-xl -mt-20">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-300 z-0">Find Your Perfect Developer</h1>
          <p className="text-lg text-gray-300">
            Connect with skilled developers to bring your project to life.
          </p>
          <Link href="/contact">
            <button className="z-50 border-y px-8 py-3 border-y-green-600 rounded-md font-semibold hover:bg-white hover:text-black transition">
              Get Started
            </button>
          </Link>
        </div>
      </header>

      {/* Why Hire Section */}
      <section className="py-1 border-t border-green-600 max-md:-mt-35">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-3xl font-bold text-center mb-12">Why Hire Our Developers?</h2>
          <img src="web14.jpg" alt="image" className="mx-auto min-md:hidden"/>
          <h1 className="text-sm text-center border-b border-x mb-5 text-gray-400 lg:hidden border-x-green-600 border-b-green-600">contact us to build your own system</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 border border-green-600 rounded-lg hover:border-white transition">
              <h3 className="text-xl font-semibold mb-2">Expertise & Skill</h3>
              <p className="text-gray-400">
                Our developers possess a wide range of skills and expertise to tackle any project.
              </p>
            </div>
            <div className="p-6 border border-green-600 rounded-lg hover:border-white transition">
              <h3 className="text-xl font-semibold mb-2">Dedicated Support</h3>
              <p className="text-gray-400">
                We provide dedicated support throughout the development process to ensure your satisfaction.
              </p>
            </div>
            <div className="p-6 border border-green-600 rounded-lg hover:border-white transition">
              <h3 className="text-xl font-semibold mb-2">Timely Delivery</h3>
              <p className="text-gray-400">
                We are committed to delivering high-quality solutions on time and within budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section className="py-16 bg-gray-400/10  ">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-10">Meet Our Developers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 ">
            {developersData.map((dev, idx) => (
              <div
                key={idx}
                className="border border-green-600 rounded-lg p-6 flex flex-col items-center text-center hover:border-white transition"
              >
                <img
                  src={dev.image}
                  alt={dev.name}
                  className="w-36 h-36 rounded-full object-cover mb-6"
                  loading="lazy"
                />
                <h3 className="text-2xl font-semibold mb-1">{dev.name}</h3>
                <p className="text-gray-400 mb-2">{dev.specialty}</p>
                <p className="text-gray-400 mb-4 max-w-xs">{dev.bio}</p>
                <div className="flex gap-4 flex-wrap justify-center">
                  {dev.links.map((link, i) => (
                    <Link
                      key={i}
                      href={link.href}
                      className=" border-r border-r-green-600 px-4 py-2 rounded hover:bg-white hover:text-black transition text-sm z-50"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 border-t border-gray-700 text-center px-5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8">
            Contact us today to discuss your project requirements and find the perfect developer for your needs.
          </p>
          <Link href="/contact">
            <button className="bg-gray-400/5 border-x border-x-green-600  px-10 py-4 rounded font-semibold hover:bg-white hover:text-black transition text-xl">
              Contact Us
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default DevelopersPage;
