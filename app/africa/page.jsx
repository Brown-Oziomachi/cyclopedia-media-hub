"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// All African countries
const africaCountries = [
  { name: "Algeria", tag: "algeria", flag: "https://flagcdn.com/dz.svg" },
  { name: "Angola", tag: "angola", flag: "https://flagcdn.com/ao.svg" },
  { name: "Benin", tag: "benin", flag: "https://flagcdn.com/bj.svg" },
  { name: "Botswana", tag: "botswana", flag: "https://flagcdn.com/bw.svg" },
  {
    name: "Burkina Faso",
    tag: "burkina-faso",
    flag: "https://flagcdn.com/bf.svg",
  },
  { name: "Burundi", tag: "burundi", flag: "https://flagcdn.com/bi.svg" },
  { name: "Cabo Verde", tag: "cabo-verde", flag: "https://flagcdn.com/cv.svg" },
  { name: "Cameroon", tag: "cameroon", flag: "https://flagcdn.com/cm.svg" },
  {
    name: "Central African Republic",
    tag: "central-african-republic",
    flag: "https://flagcdn.com/cf.svg",
  },
  { name: "Chad", tag: "chad", flag: "https://flagcdn.com/td.svg" },
  { name: "Comoros", tag: "comoros", flag: "https://flagcdn.com/km.svg" },
  { name: "Congo", tag: "congo", flag: "https://flagcdn.com/cg.svg" },
  {
    name: "Democratic Republic of the Congo",
    tag: "democratic-republic-of-the-congo",
    flag: "https://flagcdn.com/cd.svg",
  },
  { name: "Djibouti", tag: "djibouti", flag: "https://flagcdn.com/dj.svg" },
  { name: "Egypt", tag: "egypt", flag: "https://flagcdn.com/eg.svg" },
  {
    name: "Equatorial Guinea",
    tag: "equatorial-guinea",
    flag: "https://flagcdn.com/gq.svg",
  },
  { name: "Eritrea", tag: "eritrea", flag: "https://flagcdn.com/er.svg" },
  { name: "Eswatini", tag: "eswatini", flag: "https://flagcdn.com/sz.svg" },
  { name: "Ethiopia", tag: "ethiopia", flag: "https://flagcdn.com/et.svg" },
  { name: "Gabon", tag: "gabon", flag: "https://flagcdn.com/ga.svg" },
  { name: "Gambia", tag: "gambia", flag: "https://flagcdn.com/gm.svg" },
  { name: "Ghana", tag: "ghana", flag: "https://flagcdn.com/gh.svg" },
  { name: "Guinea", tag: "guinea", flag: "https://flagcdn.com/gn.svg" },
  {
    name: "Guinea-Bissau",
    tag: "guinea-bissau",
    flag: "https://flagcdn.com/gw.svg",
  },
  {
    name: "Ivory Coast",
    tag: "ivory-coast",
    flag: "https://flagcdn.com/ci.svg",
  },
  { name: "Kenya", tag: "kenya", flag: "https://flagcdn.com/ke.svg" },
  { name: "Lesotho", tag: "lesotho", flag: "https://flagcdn.com/ls.svg" },
  { name: "Liberia", tag: "liberia", flag: "https://flagcdn.com/lr.svg" },
  { name: "Libya", tag: "libya", flag: "https://flagcdn.com/ly.svg" },
  { name: "Madagascar", tag: "madagascar", flag: "https://flagcdn.com/mg.svg" },
  { name: "Malawi", tag: "malawi", flag: "https://flagcdn.com/mw.svg" },
  { name: "Mali", tag: "mali", flag: "https://flagcdn.com/ml.svg" },
  { name: "Mauritania", tag: "mauritania", flag: "https://flagcdn.com/mr.svg" },
  { name: "Mauritius", tag: "mauritius", flag: "https://flagcdn.com/mu.svg" },
  { name: "Morocco", tag: "morocco", flag: "https://flagcdn.com/ma.svg" },
  { name: "Mozambique", tag: "mozambique", flag: "https://flagcdn.com/mz.svg" },
  { name: "Namibia", tag: "namibia", flag: "https://flagcdn.com/na.svg" },
  { name: "Niger", tag: "niger", flag: "https://flagcdn.com/ne.svg" },
  { name: "Nigeria", tag: "nigeria", flag: "https://flagcdn.com/ng.svg" },
  { name: "Rwanda", tag: "rwanda", flag: "https://flagcdn.com/rw.svg" },
  {
    name: "Sao Tome and Principe",
    tag: "sao-tome-and-principe",
    flag: "https://flagcdn.com/st.svg",
  },
  { name: "Senegal", tag: "senegal", flag: "https://flagcdn.com/sn.svg" },
  { name: "Seychelles", tag: "seychelles", flag: "https://flagcdn.com/sc.svg" },
  {
    name: "Sierra Leone",
    tag: "sierra-leone",
    flag: "https://flagcdn.com/sl.svg",
  },
  { name: "Somalia", tag: "somalia", flag: "https://flagcdn.com/so.svg" },
  {
    name: "South Africa",
    tag: "south-africa",
    flag: "https://flagcdn.com/za.svg",
  },
  {
    name: "South Sudan",
    tag: "south-sudan",
    flag: "https://flagcdn.com/ss.svg",
  },
  { name: "Sudan", tag: "sudan", flag: "https://flagcdn.com/sd.svg" },
  { name: "Tanzania", tag: "tanzania", flag: "https://flagcdn.com/tz.svg" },
  { name: "Togo", tag: "togo", flag: "https://flagcdn.com/tg.svg" },
  { name: "Tunisia", tag: "tunisia", flag: "https://flagcdn.com/tn.svg" },
  { name: "Uganda", tag: "uganda", flag: "https://flagcdn.com/ug.svg" },
  { name: "Zambia", tag: "zambia", flag: "https://flagcdn.com/zm.svg" },
  { name: "Zimbabwe", tag: "zimbabwe", flag: "https://flagcdn.com/zw.svg" },
];

export default function AfricaPage() {
  const [selectedTag, setSelectedTag] = useState(null);

  return (
    <section className="px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center mt-40">Africa</h1>
      <h2 className="text-xs text-center mb-10">Search the country of your choice:</h2>

      {/* Country flags */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-center">
        {africaCountries.map((country, i) => (
          <motion.div
            key={country.tag}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center cursor-pointer"
          >
            {/* Use Link to navigate to search page with query */}
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
    </section>
  );
}
