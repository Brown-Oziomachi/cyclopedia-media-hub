"use server";
import Link from "next/link";

async function DevelopersPage() {
  const developersData = [
    {
      name: "Brown Code",
      specialty: "Full-Stack Developer/Python Developer",
      image: "/coderer.png",
      bio: "Crafting intuitive UI/UX designs.",
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
      bio: "Specialist in server-side logic.",
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
      bio: "End-to-end web solutions.",
      links: [
        { text: "Portfolio", href: "/myprofile" },
        { text: "GitHub", href: "https://github.com/HIBATULLA" },
        { text: "Hire Me", href: "mailto:devhibatullahismail45@gmail.com" },
      ],
    },
  ];

  return (
    <main className="bg-black min-h-screen text-white">
      {/* Hero Section */}

      <header className="flex flex-col justify-center items-center h-screen text-center px-5">
        <div className="space-y-6 max-w-xl">
          <h1 className="text-5xl font-extrabold tracking-tight">Find Your Perfect Developer</h1>
          <p className="text-lg text-gray-300">
            Connect with skilled developers to bring your project to life.
          </p>
          <Link href="/contact">
            <button className="border border-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-black transition">
              Get Started
            </button>
          </Link>
        </div>
      </header>

      {/* Why Hire Section */}
      <section className="py-16 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-3xl font-bold text-center mb-12">Why Hire Our Developers?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 border border-gray-700 rounded-lg hover:border-white transition">
              <h3 className="text-xl font-semibold mb-2">Expertise & Skill</h3>
              <p className="text-gray-400">
                Our developers possess a wide range of skills and expertise to tackle any project.
              </p>
            </div>
            <div className="p-6 border border-gray-700 rounded-lg hover:border-white transition">
              <h3 className="text-xl font-semibold mb-2">Dedicated Support</h3>
              <p className="text-gray-400">
                We provide dedicated support throughout the development process to ensure your satisfaction.
              </p>
            </div>
            <div className="p-6 border border-gray-700 rounded-lg hover:border-white transition">
              <h3 className="text-xl font-semibold mb-2">Timely Delivery</h3>
              <p className="text-gray-400">
                We are committed to delivering high-quality solutions on time and within budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section className="py-16 border-t border-gray-700 bg-gray-900">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-10">Meet Our Developers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {developersData.map((dev, idx) => (
              <div
                key={idx}
                className="border border-gray-700 rounded-lg p-6 flex flex-col items-center text-center hover:border-white transition"
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
                      className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition text-sm"
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
            <button className="border border-white px-10 py-4 rounded font-semibold hover:bg-white hover:text-black transition text-xl">
              Contact Us
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default DevelopersPage;
