"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// All European countries
const europeCountries = [
  { name: "Albania", tag: "albania", flag: "https://flagcdn.com/al.svg" },
  { name: "Andorra", tag: "andorra", flag: "https://flagcdn.com/ad.svg" },
  { name: "Austria", tag: "austria", flag: "https://flagcdn.com/at.svg" },
  { name: "Belarus", tag: "belarus", flag: "https://flagcdn.com/by.svg" },
  { name: "Belgium", tag: "belgium", flag: "https://flagcdn.com/be.svg" },
  {
    name: "Bosnia and Herzegovina",
    tag: "bosnia-and-herzegovina",
    flag: "https://flagcdn.com/ba.svg",
  },
  { name: "Bulgaria", tag: "bulgaria", flag: "https://flagcdn.com/bg.svg" },
  { name: "Croatia", tag: "croatia", flag: "https://flagcdn.com/hr.svg" },
  { name: "Cyprus", tag: "cyprus", flag: "https://flagcdn.com/cy.svg" },
  {
    name: "Czech Republic",
    tag: "czech-republic",
    flag: "https://flagcdn.com/cz.svg",
  },
  { name: "Denmark", tag: "denmark", flag: "https://flagcdn.com/dk.svg" },
  { name: "Estonia", tag: "estonia", flag: "https://flagcdn.com/ee.svg" },
  { name: "Finland", tag: "finland", flag: "https://flagcdn.com/fi.svg" },
  { name: "France", tag: "france", flag: "https://flagcdn.com/fr.svg" },
  { name: "Germany", tag: "germany", flag: "https://flagcdn.com/de.svg" },
  { name: "Greece", tag: "greece", flag: "https://flagcdn.com/gr.svg" },
  { name: "Hungary", tag: "hungary", flag: "https://flagcdn.com/hu.svg" },
  { name: "Iceland", tag: "iceland", flag: "https://flagcdn.com/is.svg" },
  { name: "Ireland", tag: "ireland", flag: "https://flagcdn.com/ie.svg" },
  { name: "Italy", tag: "italy", flag: "https://flagcdn.com/it.svg" },
  { name: "Kosovo", tag: "kosovo", flag: "https://flagcdn.com/xk.svg" },
  { name: "Latvia", tag: "latvia", flag: "https://flagcdn.com/lv.svg" },
  {
    name: "Liechtenstein",
    tag: "liechtenstein",
    flag: "https://flagcdn.com/li.svg",
  },
  { name: "Lithuania", tag: "lithuania", flag: "https://flagcdn.com/lt.svg" },
  { name: "Luxembourg", tag: "luxembourg", flag: "https://flagcdn.com/lu.svg" },
  { name: "Malta", tag: "malta", flag: "https://flagcdn.com/mt.svg" },
  { name: "Moldova", tag: "moldova", flag: "https://flagcdn.com/md.svg" },
  { name: "Monaco", tag: "monaco", flag: "https://flagcdn.com/mc.svg" },
  { name: "Montenegro", tag: "montenegro", flag: "https://flagcdn.com/me.svg" },
  {
    name: "Netherlands",
    tag: "netherlands",
    flag: "https://flagcdn.com/nl.svg",
  },
  {
    name: "North Macedonia",
    tag: "north-macedonia",
    flag: "https://flagcdn.com/mk.svg",
  },
  { name: "Norway", tag: "norway", flag: "https://flagcdn.com/no.svg" },
  { name: "Poland", tag: "poland", flag: "https://flagcdn.com/pl.svg" },
  { name: "Portugal", tag: "portugal", flag: "https://flagcdn.com/pt.svg" },
  { name: "Romania", tag: "romania", flag: "https://flagcdn.com/ro.svg" },
  { name: "Russia", tag: "russia", flag: "https://flagcdn.com/ru.svg" },
  { name: "San Marino", tag: "san-marino", flag: "https://flagcdn.com/sm.svg" },
  { name: "Serbia", tag: "serbia", flag: "https://flagcdn.com/rs.svg" },
  { name: "Slovakia", tag: "slovakia", flag: "https://flagcdn.com/sk.svg" },
  { name: "Slovenia", tag: "slovenia", flag: "https://flagcdn.com/si.svg" },
  { name: "Spain", tag: "spain", flag: "https://flagcdn.com/es.svg" },
  { name: "Sweden", tag: "sweden", flag: "https://flagcdn.com/se.svg" },
  {
    name: "Switzerland",
    tag: "switzerland",
    flag: "https://flagcdn.com/ch.svg",
  },
  { name: "Turkey", tag: "turkey", flag: "https://flagcdn.com/tr.svg" },
  { name: "Ukraine", tag: "ukraine", flag: "https://flagcdn.com/ua.svg" },
  { name: "United Kingdom", tag: "uk", flag: "https://flagcdn.com/gb.svg" },
  {
    name: "Vatican City",
    tag: "vatican-city",
    flag: "https://flagcdn.com/va.svg",
  },
];

export default function EuropePage() {
  const [selectedTag, setSelectedTag] = useState(null);

  return (
    <section className="px-6 py-10 max-w-5xl mx-auto mt-20 lg:mt-40">
      <h1 className="text-3xl font-bold mb-2 text-center">Europe</h1>
      <hr />
      <h2 className="text-xs text-center mb-10">
        Search the country of your choice:
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-center">
        {europeCountries.map((country, i) => (
          <motion.div
            key={country.tag}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center cursor-pointer"
          >
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
