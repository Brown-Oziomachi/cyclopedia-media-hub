"use client";
import Link from "next/link";

const Page = () => {
  return (
    <main className="bg-gray-400/5 text-gray-200 min-h-screen px-6 py-12 flex flex-col items-center">
      {/* Header Section */}
      <section className="max-w-3xl text-center mb-16">
        <h1 className="text-4xl font-extrabold text-white mb-6 mt-10">
          🌐 Your <span className="text-green-600">Website</span> is Your Digital Storefront
        </h1>
        <p className="text-lg leading-relaxed text-gray-400">
          Imagine walking into a store that’s messy, outdated, and hard to navigate. Would you trust
          that business? Probably not. Your website is often the first interaction potential customers
          have with your brand. A professional, well-designed website builds trust and leaves a
          lasting impression.
        </p>
      </section>

      {/* Content Sections */}
      <section className="max-w-4xl w-full space-y-12">
        {[
          {
            title: "⏰ 24/7 Accessibility",
            text:
              "Unlike a physical store, your website is open 24/7. It works for you even when you’re asleep, on vacation, or focused on other tasks. This means you’re always available to attract, engage, and convert customers – no matter the time or day.",
          },
          {
            title: "📈 Expand Your Reach",
            text:
              "A website breaks geographical barriers. Whether you’re a local business or a global brand, a professional website allows you to reach customers far beyond your immediate location. With the right SEO strategy, you can attract visitors from all over the world.",
          },
          {
            title: "💡 Showcase Your Expertise",
            text:
              "Your website is the perfect platform to highlight what makes your business unique. Share customer success stories, publish blog posts, and showcase your products or services. This builds credibility and positions you as a leader in your industry.",
          },
          {
            title: "🔍 Boost Your Visibility with SEO",
            text:
              "Did you know that 93% of online experiences begin with a search engine? A professional website optimized for SEO helps you rank higher on Google, driving organic traffic to your business. Without a website, you’re missing out on a massive opportunity to be found.",
          },
          {
            title: "💬 Enhance Customer Experience",
            text: (
              <>
                <p>
                  A professional website isn’t just about looks – it’s about functionality:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-400 max-w-xl mx-auto text-left">
                  <li>Easy navigation</li>
                  <li>Mobile responsiveness</li>
                  <li>Live chat or contact forms</li>
                </ul>
                <p className="mt-2">
                  A smooth experience increases customer engagement and conversions.
                </p>
              </>
            ),
          },
          {
            title: "📊 Track and Improve Performance",
            text:
              "With a professional website, you can track user behavior using tools like Google Analytics. This helps you understand what works and improve your strategies. It’s like having a 24/7 focus group for your business.",
          },
          {
            title: "💼 Stay Competitive",
            text:
              "Think about it: your competitors likely already have a professional website. A strong online presence ensures you stay competitive and relevant in your industry.",
          },
        ].map(({ title, text }, i) => (
          <div
            key={i}
            className="bg-gray-400/10 border-x rounded-lg p-8 shadow-md border border-green-600 max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
            <p className="text-gray-300 leading-relaxed border border-green-300 py-1 px-5 rounded-e-2xl">{text}</p>
          </div>
        ))}
      </section>

      {/* Conclusion Section */}
      <section className="max-w-3xl text-center mt-20 mb-12 px-4">
        <h2 className="text-3xl font-bold text-white mb-6">
          Ready to Take Your <span className="text-green-600">online</span> Presence to the Next Level? 💻
        </h2>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          Let’s chat! I’d love to help you create a website that not only looks amazing but also
          drives real results. Drop a comment or DM me to get started.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/">
          <p className="line-block px-6 py-3 bg-gray-400/5 border-x border-x-green-600 hover:bg-gray-500/10 rounded-lg font-semibold text-white shadow-lg transition">Return </p>
          </Link>
          <p
            href="mailto:webwizcreation.web@gmail.com"
            className="cursor-pointer inline-block px-6 py-3 bg-gray-400/5 border-x border-x-green-600 hover:bg-gray-500/10 rounded-lg font-semibold text-white shadow-lg transition"
            aria-label="Send an email message"
          >
            Message us
          </p>
          <Link
            href="/blog" 
            className="inline-block px-6 py-3 underline rounded-lg font-semibold text-white shadow-lg transition border-x border-x-green-600 hover:no-underline"
            aria-label="Visit blog page"
          >
            Visit Blog
          </Link>
        </div>
      </section>

    </main>
  );
};

export default Page;
