"use client";
import Link from "next/link";

const Page = async () => {
  return (
    <main className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-10 px-5">
      {/* Header Section */}
      <section className="text-center py-10">
        <h1 className="text-3xl font-extrabold mb-6">🌐 Your Website is Your Digital Storefront</h1>
        <p className="text-lg text-gray-300 lg:w-2/3 mx-auto">
          Imagine walking into a store that’s messy, outdated, and hard to navigate. Would you trust
          that business? Probably not. Your website is often the first interaction potential customers
          have with your brand. A professional, well-designed website builds trust and leaves a
          lasting impression.
        </p>
      </section>

      {/* Content Sections */}
      <section className="space-y-12">
        {/* Accessibility */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">⏰ 24/7 Accessibility</h2>
          <p className="text-lg text-gray-300 lg:w-2/3 mx-auto">
            Unlike a physical store, your website is open 24/7. It works for you even when you’re
            asleep, on vacation, or focused on other tasks. This means you’re always available to
            attract, engage, and convert customers – no matter the time or day.
          </p>
        </div>

        {/* Expand Your Reach */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">📈 Expand Your Reach</h3>
          <p className="text-lg text-gray-300 lg:w-1/2 mx-auto">
            A website breaks geographical barriers. Whether you’re a local business or a global brand,
            a professional website allows you to reach customers far beyond your immediate location.
            With the right SEO strategy, you can attract visitors from all over the world.
          </p>
        </div>

        {/* Showcase Expertise */}
        <div className="text-center">
          <h4 className="text-2xl font-bold mb-4">💡 Showcase Your Expertise</h4>
          <p className="text-lg text-gray-300 lg:w-2/3 mx-auto">
            Your website is the perfect platform to highlight what makes your business unique. Share
            customer success stories, publish blog posts, and showcase your products or services.
            This builds credibility and positions you as a leader in your industry.
          </p>
        </div>

        {/* SEO */}
        <div className="text-center">
          <h5 className="text-2xl font-bold mb-4">🔍 Boost Your Visibility with SEO</h5>
          <p className="text-lg text-gray-300 lg:w-2/3 mx-auto">
            Did you know that 93% of online experiences begin with a search engine? A professional
            website optimized for SEO helps you rank higher on Google, driving organic traffic to
            your business. Without a website, you’re missing out on a massive opportunity to be found.
          </p>
        </div>

        {/* Customer Experience */}
        <div className="text-center">
          <h6 className="text-2xl font-bold mb-4">💬 Enhance Customer Experience</h6>
          <p className="text-lg text-gray-300 lg:w-2/3 mx-auto">
            A professional website isn’t just about looks – it’s about functionality:
          </p>
          <ul className="list-disc list-inside text-left lg:w-2/3 mx-auto text-gray-300">
            <li>Easy navigation</li>
            <li>Mobile responsiveness</li>
            <li>Live chat or contact forms</li>
          </ul>
          <p className="text-lg text-gray-300 lg:w-2/3 mx-auto mt-2">
            A smooth experience increases customer engagement and conversions.
          </p>
        </div>

        {/* Performance Tracking */}
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">📊 Track and Improve Performance</h1>
          <p className="text-lg text-gray-300 lg:w-2/3 mx-auto">
            With a professional website, you can track user behavior using tools like Google Analytics.
            This helps you understand what works and improve your strategies. It’s like having a 24/7
            focus group for your business.
          </p>
        </div>

        {/* Competitiveness */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">💼 Stay Competitive</h2>
          <p className="text-lg text-gray-300 lg:w-2/3 mx-auto">
            Think about it: your competitors likely already have a professional website. A strong
            online presence ensures you stay competitive and relevant in your industry.
          </p>
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="text-center py-10">
        <h2 className="text-xl font-bold text-blue-400 mb-4">Ready to Take Your Online Presence to the Next Level? 💻</h2>
        <p className="text-lg text-gray-300 lg:w-2/3 mx-auto mb-6">
          Let’s chat! I’d love to help you create a website that not only looks amazing but also
          drives real results. Drop a comment or DM me to get started.
        </p>
        <div className="flex flex-wrap justify-center gap-5">
          <button className="py-2 px-5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow-lg">
            <a href="mailto:browncemmanuel@gmail.com">Message Me</a>
          </button>
          <button className="py-2 px-5 rounded-lg bg-green-500 hover:bg-green-600 text-white shadow-lg">
            <Link href="/blog">Visit Blog</Link>
          </button>
        </div>
      </section>

      {/* Next Link */}
      <div className="text-center mt-10">
        <Link href="/blog" className="text-cyan-400 hover:underline">
          Next...
        </Link>
      </div>
    </main>
  );
};

export default Page;
