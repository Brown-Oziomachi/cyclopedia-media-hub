"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// All Asian countries
const asiaCountries = [
  { name: "China", tag: "china", flag: "https://flagcdn.com/cn.svg" },
  { name: "India", tag: "india", flag: "https://flagcdn.com/in.svg" },
  { name: "Japan", tag: "japan", flag: "https://flagcdn.com/jp.svg" },
  {
    name: "South Korea",
    tag: "south-korea",
    flag: "https://flagcdn.com/kr.svg",
  },
  {
    name: "North Korea",
    tag: "north-korea",
    flag: "https://flagcdn.com/kp.svg",
  },
  { name: "Indonesia", tag: "indonesia", flag: "https://flagcdn.com/id.svg" },
  { name: "Pakistan", tag: "pakistan", flag: "https://flagcdn.com/pk.svg" },
  { name: "Bangladesh", tag: "bangladesh", flag: "https://flagcdn.com/bd.svg" },
  {
    name: "Philippines",
    tag: "philippines",
    flag: "https://flagcdn.com/ph.svg",
  },
  { name: "Vietnam", tag: "vietnam", flag: "https://flagcdn.com/vn.svg" },
  { name: "Thailand", tag: "thailand", flag: "https://flagcdn.com/th.svg" },
  { name: "Malaysia", tag: "malaysia", flag: "https://flagcdn.com/my.svg" },
  { name: "Singapore", tag: "singapore", flag: "https://flagcdn.com/sg.svg" },
  { name: "Nepal", tag: "nepal", flag: "https://flagcdn.com/np.svg" },
  { name: "Sri Lanka", tag: "sri-lanka", flag: "https://flagcdn.com/lk.svg" },
  {
    name: "Afghanistan",
    tag: "afghanistan",
    flag: "https://flagcdn.com/af.svg",
  },
  { name: "Iran", tag: "iran", flag: "https://flagcdn.com/ir.svg" },
  { name: "Iraq", tag: "iraq", flag: "https://flagcdn.com/iq.svg" },
  {
    name: "Saudi Arabia",
    tag: "saudi-arabia",
    flag: "https://flagcdn.com/sa.svg",
  },
  {
    name: "United Arab Emirates",
    tag: "uae",
    flag: "https://flagcdn.com/ae.svg",
  },
  { name: "Israel", tag: "israel", flag: "https://flagcdn.com/il.svg" },
  { name: "Jordan", tag: "jordan", flag: "https://flagcdn.com/jo.svg" },
  { name: "Kuwait", tag: "kuwait", flag: "https://flagcdn.com/kw.svg" },
  { name: "Qatar", tag: "qatar", flag: "https://flagcdn.com/qa.svg" },
  { name: "Bahrain", tag: "bahrain", flag: "https://flagcdn.com/bh.svg" },
  { name: "Oman", tag: "oman", flag: "https://flagcdn.com/om.svg" },
  { name: "Yemen", tag: "yemen", flag: "https://flagcdn.com/ye.svg" },
  { name: "Kazakhstan", tag: "kazakhstan", flag: "https://flagcdn.com/kz.svg" },
  { name: "Uzbekistan", tag: "uzbekistan", flag: "https://flagcdn.com/uz.svg" },
  {
    name: "Turkmenistan",
    tag: "turkmenistan",
    flag: "https://flagcdn.com/tm.svg",
  },
  { name: "Kyrgyzstan", tag: "kyrgyzstan", flag: "https://flagcdn.com/kg.svg" },
  { name: "Tajikistan", tag: "tajikistan", flag: "https://flagcdn.com/tj.svg" },
  { name: "Mongolia", tag: "mongolia", flag: "https://flagcdn.com/mn.svg" },
  { name: "Bhutan", tag: "bhutan", flag: "https://flagcdn.com/bt.svg" },
  { name: "Laos", tag: "laos", flag: "https://flagcdn.com/la.svg" },
  { name: "Cambodia", tag: "cambodia", flag: "https://flagcdn.com/kh.svg" },
  { name: "Brunei", tag: "brunei", flag: "https://flagcdn.com/bn.svg" },
  { name: "Maldives", tag: "maldives", flag: "https://flagcdn.com/mv.svg" },
];

export default function AsiaPage() {
  const [selectedTag, setSelectedTag] = useState(null);

  return (
    <section className="px-6 py-10 max-w-5xl mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-8 text-center mt-30">Asia</h1>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-center">
        {asiaCountries.map((country, i) => (
          <motion.div
            key={country.tag}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center cursor-pointer"
          >
            {/* Link to search results with query */}
            <Link
              href={`/search?q=${encodeURIComponent(country.tag)}`}
              className="flex flex-col items-center"
              onClick={() => setSelectedTag(country.tag)}
            >
              <div
                className={`w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 transition-transform duration-300 hover:scale-110 ${
                  selectedTag === country.tag ? "border-blue-500" : ""
                }`}
              >
                <img
                  src={country.flag}
                  alt={country.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 text-center text-sm font-medium text-gray-700">
                {country.name}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      {selectedTag && (
        <div className="mt-8 text-center text-lg text-blue-600">
          Showing results for tag: <strong>{selectedTag}</strong>
        </div>
      )}
    </section>
  );
}
