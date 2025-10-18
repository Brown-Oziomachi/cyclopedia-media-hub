import AdminProfile from "@/components/AdminProfile";

export const metadata = {
  title: "Director | The Cyclopedia - Brown Oziomachi",
  description:
    "Meet Brown Oziomachi, founder and director of The Cyclopedia. Passionate writer, researcher, and software developer committed to truth, insight, and independence.",
  keywords: "director, Brown Oziomachi, The Cyclopedia, founder, author",
  referrer: "origin-when-cross-origin",
  openGraph: {
    title: "Director | The Cyclopedia",
    description: "Meet Brown Oziomachi, founder and director of The Cyclopedia",
    url: "/director",
    type: "profile",
  },
};

export default function Author() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className=" py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 lg:mt-30 mt-10">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
            About The Director
          </h1>
          <p className="text-center text-gray-600">
            The vision and leadership behind The Cyclopedia
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <AdminProfile />
      </div>

      <div className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-3">📰</div>
              <h3 className="font-semibold mb-2">Truth</h3>
              <p className="text-gray-600 text-sm">
                Committed to accurate, fact-checked reporting and exposing
                misinformation
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-3">💡</div>
              <h3 className="font-semibold mb-2">Insight</h3>
              <p className="text-gray-600 text-sm">
                Providing in-depth analysis and critical thinking on global
                issues
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-3">🗽</div>
              <h3 className="font-semibold mb-2">Independence</h3>
              <p className="text-gray-600 text-sm">
                Operating with editorial independence and integrity above all
                else
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
