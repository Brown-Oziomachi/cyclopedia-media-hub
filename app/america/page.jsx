"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// All American countries
const americaCountries = [
  { name: "United States", tag: "usa", flag: "https://flagcdn.com/us.svg" },
  { name: "Canada", tag: "canada", flag: "https://flagcdn.com/ca.svg" },
  { name: "Mexico", tag: "mexico", flag: "https://flagcdn.com/mx.svg" },
  { name: "Brazil", tag: "brazil", flag: "https://flagcdn.com/br.svg" },
  { name: "Argentina", tag: "argentina", flag: "https://flagcdn.com/ar.svg" },
  { name: "Colombia", tag: "colombia", flag: "https://flagcdn.com/co.svg" },
  { name: "Chile", tag: "chile", flag: "https://flagcdn.com/cl.svg" },
  { name: "Peru", tag: "peru", flag: "https://flagcdn.com/pe.svg" },
  { name: "Venezuela", tag: "venezuela", flag: "https://flagcdn.com/ve.svg" },
  { name: "Ecuador", tag: "ecuador", flag: "https://flagcdn.com/ec.svg" },
  { name: "Guatemala", tag: "guatemala", flag: "https://flagcdn.com/gt.svg" },
  { name: "Cuba", tag: "cuba", flag: "https://flagcdn.com/cu.svg" },
  { name: "Haiti", tag: "haiti", flag: "https://flagcdn.com/ht.svg" },
  {
    name: "Dominican Republic",
    tag: "dominican-republic",
    flag: "https://flagcdn.com/do.svg",
  },
  { name: "Honduras", tag: "honduras", flag: "https://flagcdn.com/hn.svg" },
  { name: "Paraguay", tag: "paraguay", flag: "https://flagcdn.com/py.svg" },
  { name: "Bolivia", tag: "bolivia", flag: "https://flagcdn.com/bo.svg" },
  {
    name: "El Salvador",
    tag: "el-salvador",
    flag: "https://flagcdn.com/sv.svg",
  },
  { name: "Nicaragua", tag: "nicaragua", flag: "https://flagcdn.com/ni.svg" },
  { name: "Costa Rica", tag: "costa-rica", flag: "https://flagcdn.com/cr.svg" },
  { name: "Panama", tag: "panama", flag: "https://flagcdn.com/pa.svg" },
  { name: "Jamaica", tag: "jamaica", flag: "https://flagcdn.com/jm.svg" },
  {
    name: "Trinidad and Tobago",
    tag: "trinidad-and-tobago",
    flag: "https://flagcdn.com/tt.svg",
  },
  { name: "Uruguay", tag: "uruguay", flag: "https://flagcdn.com/uy.svg" },
  { name: "Guyana", tag: "guyana", flag: "https://flagcdn.com/gy.svg" },
  { name: "Suriname", tag: "suriname", flag: "https://flagcdn.com/sr.svg" },
  { name: "Belize", tag: "belize", flag: "https://flagcdn.com/bz.svg" },
];

export default function AmericaPage() {
  const [selectedTag, setSelectedTag] = useState(null);

  return (
    <section className="px-6 py-10 max-w-5xl mx-auto mt-20 lg:mt-40">
      <h1 className="text-3xl font-bold mb-2 text-center">America</h1>
      <hr />
      <h2 className="text-xs text-center mb-10">
        Search the country of your choice:
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-center">
        {americaCountries.map((country, i) => (
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
