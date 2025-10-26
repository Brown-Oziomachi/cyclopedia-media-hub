import { Twitter, Instagram, Youtube, Mail } from "lucide-react";

export default function Icons({ news }) {
  const socialLinks = [
    {
      name: "Twitter",
      url: "https://x.com/cyclopedia_news?t=yU4JjJPlLO7Zp9GVoEaF5A&s=09",
      icon: Twitter,
      color:
        "from-blue-500/20 to-blue-600/20 hover:from-blue-500/40 hover:to-blue-600/40 text-blue-400 hover:text-blue-300 border-blue-500/30 hover:border-blue-400",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/cyclopedia_news?igsh=MThvdDEwa3c3aGpsMQ==",
      icon: Instagram,
      color:
        "from-pink-500/20 to-pink-600/20 hover:from-pink-500/40 hover:to-pink-600/40 text-pink-400 hover:text-pink-300 border-pink-500/30 hover:border-pink-400",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@cyclopedia-media",
      icon: Youtube,
      color:
        "from-red-500/20 to-red-600/20 hover:from-red-500/40 hover:to-red-600/40 text-red-400 hover:text-red-300 border-red-500/30 hover:border-red-400",
    },
    {
      name: "Substack",
      url: "https://substack.com/@thecyclopedia?utm_campaign=profile&utm_medium=profile-page",
      icon: Mail,
      color:
        "from-orange-500/20 to-orange-600/20 hover:from-orange-500/40 hover:to-orange-600/40 text-orange-400 hover:text-orange-300 border-orange-500/30 hover:border-orange-400",
    },
  ];

  return (
    <div className="w-full">
      {/* Social Media Links */}
      <div className="mb-10 mx-auto ">
        <div className="flex flex-wrap gap-3 justify-center">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 bg-gradient-to-br ${social.color} border rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-110`}
                title={social.name}
              >
                <Icon size={24} />
              </a>
            );
          })}
        </div>
      </div>

      {news && news.imageUrl && (
        <div className="relative w-full mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
          <img
            src={news.imageUrl}
            alt={newstitle || "Blog image"}
            className="w-full h-auto object-cover"
          />
          <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-purple-700  text-sm md:text-base font-bold px-4 py-2 rounded-lg shadow-lg">
            The Cyclopedia
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-white text-sm md:text-base font-semibold line-clamp-2">
              {news.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
