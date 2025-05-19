"use server";
import Link from "next/link";


async function DevelopersPage() {

  const developersData = [
    {
      name: "Brown Code",
      specialty: "Front-End Developer",
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
      specialty: "Front-End Developer",
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
      specialty: "Front-End Developer",
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
    <main className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="flex flex-col justify-center items-center h-screen text-center bg-gray-950 text-white">
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold text-white">
            Find Your Perfect Developer
          </h1>
          <p className="text-lg">
            Connect with skilled developers to bring your project to life.
          </p>
          <Link href="/contact">
            <button className="bg-white text-black hover:bg-black hover:text-white px-6 py-3 rounded-md shadow-md">
              Get Started
            </button>
          </Link>
        </div>
      </header>
      {/* Why Hire Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-balance mb-8">
            Why Hire Our Developers?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="p-4 rounded-lg shadow-md hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Expertise & Skill
              </h3>
              <p className="text-gray-600">
                Our developers possess a wide range of skills and expertise to
                tackle any project.
              </p>
            </div>
            {/* Benefit 2 */}
            <div className="p-4 rounded-lg shadow-md hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Dedicated Support
              </h3>
              <p className="text-gray-600">
                We provide dedicated support throughout the development process
                to ensure your satisfaction.
              </p>
            </div>
            {/* Benefit 3 */}
            <div className="p-4 rounded-lg shadow-md hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Timely Delivery
              </h3>
              <p className="text-gray-600">
                We are committed to delivering high-quality solutions on time
                and within budget.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Developers Section */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-10">
            Meet Our Developers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
            {developersData.map((developer, index) => (
              <div
                key={index}
                className=" p-1 rounded-lg  hover:shadow-xl m-5 transition-all bg-gray-950 relative z-0 "
              >
                <img
                  src={developer.image}
                  alt={developer.name}
                  className="w-70 h-70 mb- rounded-full mx-auto "
                />
                <h3 className="absolute inset-0 top-50 text-center text-2xl font-bold text-white mb-2   bg-gray-950 z-0 h-1/4 ">
                  {developer.name}
                </h3>
                <p className="text-white mb-2 text-center absolute inset-0 top-60 z-0">{developer.specialty}</p>
                <p className="text-sm text-white text-center absolute inset-0 top-65 z-0">{developer.bio}</p>
                <div className="flex justify-center gap-4 mt-2 group-hover:text-red-500 z-50 cursor-pointer">
                  {developer.links.map((link, linkIndex) => (
                    <Link key={linkIndex} href={link.href} className="z-50">
                      <p className="px-4 py-2 bg-white text-black  rounded-md  hover:text-white hover:bg-black z-50 cursor-pointer">
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
      <section className="py-20 bg-white text-black text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8">
            Contact us today to discuss your project requirements and find the
            perfect developer for your needs.
          </p>
          <Link href="/contact">
            <button className="bg-black text-white hover:bg-white hover:text-black px-8 py-4 rounded-md text-xl shadow-md cursor-pointer">
              Contact Us
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
export default DevelopersPage;